import { Navigate } from "react-router-dom";


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