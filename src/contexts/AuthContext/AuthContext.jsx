// src/contexts/AuthContext/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 🔹 Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // 🔹 Login: guardar sesión
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // 🔹 Logout: limpiar sesión
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  // 🔹 UpdateUser: actualizar perfil sin perder sesión
  const updateUser = (newData) => {
    const updatedUser = { ...user, ...newData }; // combina datos antiguos con nuevos
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser)); // persistir cambios
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser, // ✅ ahora lo exponemos
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
