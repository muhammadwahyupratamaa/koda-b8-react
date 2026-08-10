const BASE_URL = import.meta.env.VITE_API_URL;

export async function api(path, options = {}) {
  console.log("API CALLED:", path);

  const token = localStorage.getItem("token");

  const headers = {
    ...options.headers,
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token && !path.startsWith("/auth")) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export { BASE_URL };
