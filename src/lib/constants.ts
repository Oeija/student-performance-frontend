export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "";

export const API_DOCS_URL = API_URL
  ? `${API_URL}/docs`
  : "http://3.87.146.94:8000/docs";
