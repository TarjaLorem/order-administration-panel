import "server-only";

const API_URL = process.env.API_URL;
const API_TOKEN = process.env.API_TOKEN;

if (!API_URL) {
  throw new Error("Missing API_URL in environment variables");
}

export function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers);

  if (API_TOKEN) {
    headers.set("Authorization", `Bearer ${API_TOKEN}`);
    headers.set("X-API-Token", API_TOKEN);
  }
  if (init.body) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(`${API_URL}${path}`, { ...init, headers });
}

export async function apiGet<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await apiFetch(path, init);

  if (!response.ok) {
    throw new Error(`GET ${path} failed: ${response.status}`);
  }

  return response.json();
}
