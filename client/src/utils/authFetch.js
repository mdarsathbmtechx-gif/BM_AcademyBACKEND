// src/utils/authFetch.js
export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token"); // match Navbar/login storage

  if (!token) {
    localStorage.removeItem("user");
    window.location.href = "/login";
    throw new Error("User not logged in");
  }

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage")); // update Navbar
    window.location.href = "/login";
    throw new Error("Unauthorized or invalid token");
  }

  try {
    return await res.json();
  } catch (err) {
    throw new Error("Failed to parse JSON");
  }
};
