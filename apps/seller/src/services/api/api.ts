const BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!BASE_URL) {
  throw new Error('API base URL is not defined. Please set VITE_API_BASE_URL in your .env file.');
}

export default BASE_URL;
