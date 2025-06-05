import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function ProtectedRoute({ children }) {
  const { user } = useUser();
  //const token = localStorage.getItem("token");


  if (!user) {
    // Nie zalogowany -> przekieruj na login
    return <Navigate to="/login" replace />;
  }

  return children;
}
