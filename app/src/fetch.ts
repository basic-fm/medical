import * as SecureStore from "expo-secure-store";

export const BASE_URL = "https://medical.basic-fm.info/api";
// export const BASE_URL = "http://localhost:8000/api";
// export const BASE_URL = "http://192.168.113.179/api"
// export const BASE_URL = 'http://192.168.178.88:8000/api';

function isAbsoluteUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

function fullUrl(url: string): string {
  if (isAbsoluteUrl(url)) {
    return url;
  }

  return url.startsWith("/") ? `${BASE_URL}${url}` : `${BASE_URL}/${url}`;
}

export async function http<T>(url: string, init?: RequestInit): Promise<T> {
  const token = await SecureStore.getItemAsync("token");

  const authorization: any = token ? { Authorization: `Token ${token}` } : {};

  const headers = {
    ...init?.headers,
    ...authorization,
  };

  return fetch(fullUrl(url), {
    ...init,
    headers: headers,
  }).then(async (res) => {
    if (res.ok) return res.json();

    const json = await res.json();
    throw new Error(JSON.stringify(json));
  });
}
