import { createContext, useContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async ({ email, password }) => {
    // FAKE – dodajemy logikę użytkownika
    if (email === "demo@demo.pl" && password === "demo123") {
      const fakeUser = { email, role: "user" };
      setUser(fakeUser);
      localStorage.setItem("user", JSON.stringify(fakeUser));
      return true;
    }
    // FAKE – dodajemy logikę admina
    if (email === "admin@example.com" && password === "admin123") {
      const adminUser = { email, role: "admin" };
      setUser(adminUser);
      localStorage.setItem("user", JSON.stringify(adminUser));
      return true;
    }

    return false;
  };

  

   /*
  try {
    const res = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) return false;

    const userData = await res.json(); // { email, role, token, ... }
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    return true;
  } catch (err) {
    console.error("Błąd logowania:", err);
    return false;
  }
  */

  const register = async ({ email, password, name, surname }) => {
    // FAKE – zmień na prawdziwe
    console.log("Rejestracja użytkownika:", { email, password, name, surname });
    return true;
  };
  /*
  try {
    const res = await fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, surname, email, password }),
    });

    return res.ok;
  } catch (err) {
    console.error("Błąd rejestracji:", err);
    return false;
  }
  */

  const resetPassword = async (email, newPassword) => {
    // FAKE – zmień na prawdziwe
    console.log("Resetowanie hasła dla:", email);
    return true;
  }


  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, register, resetPassword }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook pomocniczy
export const useUser = () => useContext(UserContext);


