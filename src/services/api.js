const BASE_URL = import.meta.env.VITE_API_URL;

export async function api(path, options = {}) {
  console.log("API CALLED:", path);
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}