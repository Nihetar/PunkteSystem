import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const requestAndRefreshToken = withRefreshedToken((url: string, config: AxiosRequestConfig) => 
  axios(url, config)
)

export async function request<T>(
  
    urlSuffix: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    content?: unknown
  ): Promise<T> {
    const response = await requestAndRefreshToken(`https://localhost:5173/api/${urlSuffix}`, {
      data: content,
      method: method,
    })

    function isStatusCodeOk(statusCode: number): boolean {
      return statusCode >= 200 && statusCode < 300
    }
    if (!isStatusCodeOk(response.status)) {
      const errorText = JSON.stringify(response.data);
      throw new Error(`Can't use ${method}: ${errorText}`);
    }
    return response.data;
  }

export function withRefreshedToken<T>(
  makeRequest: (url: string, config: AxiosRequestConfig) => Promise<AxiosResponse<T>>
) {
  return async (url: string, config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    // Get current token
    const token = localStorage.getItem("token");

    // Add Authorization header if token exists
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      // Try the original request
      return await makeRequest(url, config);
    } catch (error: any) {
      // If unauthorized, try to refresh token
      if (error.response?.status === 401) {
        try {
          const refreshResponse = await axios.post<{ token: string }>(
            "https://localhost:5173/api/auth/refresh", // adjust as needed
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
              },
            }
          );

          const newToken = refreshResponse.data.token;
          localStorage.setItem("token", newToken);

          // Retry original request with new token
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${newToken}`,
          };

          return await makeRequest(url, config);
        } catch (refreshError) {
          // Refresh failed → clear tokens, optionally redirect to login
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          throw new Error("Session expired. Please log in again.");
        }
      }

      // Rethrow if not a 401 error
      throw error;
    }
  };
}
