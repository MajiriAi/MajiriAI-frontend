/**
 * Backend API base URL. Keep this server-side so API credentials and the
 * backend origin are not needed in browser code. Set API_URL in the frontend
 * host to override the production default or point local development elsewhere.
 */
export const API_BASE_URL =
  process.env.API_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://majiriai-backend.onrender.com/api"
    : "http://localhost:8002/api");
