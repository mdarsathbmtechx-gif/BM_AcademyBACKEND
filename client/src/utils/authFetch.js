// src/utils/authFetch.js

export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    // Redirect to login if no token
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
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  return res;
};
