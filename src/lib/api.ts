import {
  PredictionRequest,
  PredictionResponse,
  ApiError,
  ModelInfoResponse,
  HealthResponse,
} from "@/types/prediction";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function fetchJson<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData: ApiError = await response.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(errorData.detail || `HTTP ${response.status}`);
  }

  return response.json();
}

export async function predict(request: PredictionRequest): Promise<PredictionResponse> {
  return fetchJson<PredictionResponse>("/api/predict", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

export async function getModelInfo(): Promise<ModelInfoResponse> {
  return fetchJson<ModelInfoResponse>("/api/model-info");
}

export async function getHealth(): Promise<HealthResponse> {
  return fetchJson<HealthResponse>("/health");
}
