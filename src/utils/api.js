import { API_URL } from "../config";
import { clearSession, getStoredToken } from "./session";

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

async function parseJson(response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function apiRequest(path, options = {}) {
  const token = getStoredToken();
  const headers = new Headers(options.headers || {});

  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await parseJson(response);

  if (!response.ok) {
    if (response.status === 401) {
      clearSession();
    }

    throw new ApiError(
      data?.msg || "Ocurrio un error al procesar la solicitud",
      response.status,
      data
    );
  }

  return data;
}
