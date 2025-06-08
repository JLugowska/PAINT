import { createContext, useContext, useState } from "react";
import { api } from '../services/api.jsx';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

 const login = async ({ username, password }) => {
  try {
    const result = await api.login({ login: username, password });

      if (!result.user || result.errorResponse) {
        console.error("Błąd logowania:", result.errorResponse?.message);
        return false;
      }

    setUser(result.user);
      localStorage.setItem("user", JSON.stringify(result.user));
      return true;
    } catch (error) {
      console.error("Błąd logowania:", error);
      return false;
    }
  };

 const register = async (userData) => {
    try {
      console.log("Rejestruję z danymi:", userData);
      const result = await api.createUser({
      ...userData,
      role: "USER",
    });

    
    console.log("Odpowiedź z createUser:", result); // ← najważniejsze

      if (!result.user || result.errorResponse) {
        console.error("Błąd rejestracji:", result.errorResponse?.message);
        return false;
      }

      setUser(result.user);
      localStorage.setItem("user", JSON.stringify(result.user));
      return true;
    } catch (error) {
      console.error("Błąd rejestracji:", error);
      return false;
    }
  };

   
  const updateUser = async (updatedData) => {
    try {
      const result = await api.updateUser({
        _id: user._id,
        login: user.login,
        password: updatedData.password, // może chcesz tego unikać, zależnie od API
        email: updatedData.email,
        name: updatedData.name,
        surname: updatedData.surname,
        role: user.role,
      });

      if (!result.user || result.errorResponse) {
        console.error("Błąd aktualizacji:", result.errorResponse?.message);
        return false;
      }

    setUser(result.user);
      localStorage.setItem("user", JSON.stringify(result.user));
      return true;
    } catch (error) {
      console.error("Błąd aktualizacji:", error);
      return false;
    }
  };

const deleteUser = async () => {
    try {
      const result = await api.deleteUser(user._id);

      if (!result.user || result.errorResponse) {
        console.error("Błąd usuwania:", result.errorResponse?.message);
        return false;
      }

      setUser(null);
      localStorage.removeItem("user");
      return true;
    } catch (error) {
      console.error("Błąd usuwania:", error);
      return false;
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, register, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook pomocniczy
export const useUser = () => useContext(UserContext);


