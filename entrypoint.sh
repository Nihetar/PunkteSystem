#!/bin/sh
set -e

# Starte NGINX (Frontend)
service nginx start

# Warte auf PostgreSQL (falls extern, hier anpassen)
echo "Warte auf PostgreSQL..."
while ! pg_isready -h postgres -p 5432 -U postgres; do
  sleep 1
done

# Führe Migrationen aus
dotnet ef database update

# Starte Backend
dotnet PunkteSystem.dll