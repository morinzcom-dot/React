// Central place for the backend base URL.
// Override it by setting REACT_APP_API_URL in a .env file
// (e.g. REACT_APP_API_URL=https://api.myhousing.com) for production builds.
export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";
