// src/utils/authFetch.js
export const authFetch = async (url, options = {}) => {
  let token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken"); // store refresh token at login

  if (!token) {
    localStorage.removeItem("user");
    window.location.href = "/login";
    throw new Error("User not logged in");
  }

  const makeRequest = async (tokenToUse) => {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenToUse}`,
        ...(options.headers || {}),
      },
    });
    return res;
  };

  let res = await makeRequest(token);

  // If token expired, try refreshing
  if (res.status === 401 && refreshToken) {
    try {
      const refreshRes = await fetch(`${import.meta.env.VITE_BASE_URI}auth/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!refreshRes.ok) throw new Error("Refresh token failed");

      const refreshData = await refreshRes.json();
      token = refreshData.access;
      localStorage.setItem("token", token);

      // Retry original request with new token
      res = await makeRequest(token);
    } catch (err) {
      // Refresh failed, force logout
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("storage"));
      window.location.href = "/login";
      throw new Error("Session expired, please login again");
    }
  }

  if (res.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage"));
    window.location.href = "/login";
    throw new Error("Unauthorized or invalid token");
  }

  try {
    return await res.json();
  } catch (err) {
    throw new Error("Failed to parse JSON");
  }
};
