// src/contexts/AuthContext/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

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

  // 🔹 UpdateUser: actualizar perfil en la base de datos y contexto
  const updateUser = async (newData) => {
    try {
      // Preparar datos para enviar al backend
      const updateData = {
        telefono: newData.telefono,
        email: newData.email,
        direccion: newData.direccion,
        estado: user.estado || 'Activo', // Mantener estado actual
        password: user.password || 'temp123' // Password temporal para validación
      };

      // Actualizar en la base de datos
      const response = await axios.put(`http://localhost:3000/api/usuarios/${user.id}`, updateData);

      // Si la actualización es exitosa, actualizar el contexto y localStorage
      const updatedUser = { ...user, ...newData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      return { success: true, data: response.data, updatedUser };
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      
      // Mostrar detalles del error
      if (error.response?.data?.errors) {
        console.error("Errores de validación:", error.response.data.errors);
      }
      
      return { 
        success: false, 
        error: error.response?.data?.message || error.response?.data?.errors?.join(', ') || "Error al actualizar el perfil",
        details: error.response?.data?.errors || []
      };
    }
  };

  // 🔹 UpdateUserLocal: actualizar solo en contexto (sin API)
  const updateUserLocal = (newData) => {
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser, // ✅ actualizar con API
        updateUserLocal, // ✅ actualizar solo localmente
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
