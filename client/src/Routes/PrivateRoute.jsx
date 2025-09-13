import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, role }) {
  const userRole = localStorage.getItem("role");
  const token = localStorage.getItem("access_token");

  // Redirect to login if token missing or role mismatch
  if (!token || userRole !== role) {
    return <Navigate to="/login" />;
  }

  return children;
}
