import { Navigate } from "react-router-dom";
import API_URL from "../config/api";

function ProtectedRoute({ children }) {

  const token = localStorage.getItem("token");

  // No JWT → user must login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // JWT exists → allow access
  return children;
}

export default ProtectedRoute;