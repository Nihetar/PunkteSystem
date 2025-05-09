# ========== Backend Build ==========
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build
WORKDIR /src

# 1. Kopiere Projektdateien
COPY *.csproj .
RUN dotnet restore

# 2. Kopiere den Rest des Backends
COPY . .
RUN dotnet publish -c Release -o /app/publish

# ========== Frontend Build ==========
FROM node:18 AS frontend-build
WORKDIR /app

# 1. Kopiere nur die notwendigen Dateien für npm install
COPY Gui/package*.json ./

# 2. Installiere Abhängigkeiten
RUN npm ci --legacy-peer-deps --include=dev && \
    npm install @emotion/react @emotion/styled

# 3. Kopiere den Rest des Frontends
COPY Gui/ .

# 4. Führe den Build durch (ohne unnötige Kopierversuche)
RUN npm run build

# ========== Runtime Container ==========
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Installiere NGINX
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

# Kopiere Backend
COPY --from=backend-build /app/publish .

# Kopiere Frontend-Build direkt
COPY --from=frontend-build /app/dist /var/www/html

# NGINX Config
COPY Gui/nginx.conf /etc/nginx/conf.d/default.conf

# Entrypoint
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

EXPOSE 80
ENTRYPOINT ["./entrypoint.sh"]