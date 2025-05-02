import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export function withRefreshedToken<T>(
  makeRequest: (url: string, config: AxiosRequestConfig) => Promise<AxiosResponse<T>>
) {
  return async (url: string, config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      return await makeRequest(url, config);
    } catch (error: any) {
      if (error.response?.status === 401) {
        try {
          const refreshResponse = await axios.post<{ token: string }>(
            'https://localhost:5173/api/auth/refresh',
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
              },
            }
          );

          const newToken = refreshResponse.data.token;
          localStorage.setItem('token', newToken);

          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${newToken}`,
          };

          return await makeRequest(url, config);
        } catch {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          throw new Error('Session expired. Please log in again.');
        }
      }

      throw error;
    }
  };
}

const requestAndRefreshToken = withRefreshedToken((url, config) => axios(url, config));

export async function request<T>(
  urlSuffix: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  content?: unknown
): Promise<T> {
  const response = await requestAndRefreshToken(`https://localhost:5173/api/${urlSuffix}`, {
    data: content,
    method,
  });

  if (response.status < 200 || response.status >= 300) {
    throw new Error(`Can't use ${method}: ${JSON.stringify(response.data)}`);
  }

  return response.data;
}
