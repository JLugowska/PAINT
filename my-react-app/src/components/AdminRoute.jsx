import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";

export default function AdminRoute({ children }) {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Dodatkowe sprawdzenie dla pewności
    if (user !== undefined) {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <div>Ładowanie...</div>; // Możesz dodać ładny loader
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
}