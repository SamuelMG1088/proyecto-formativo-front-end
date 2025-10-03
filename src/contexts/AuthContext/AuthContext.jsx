// src/contexts/AuthContext/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 🔹 Cargar sesión desde localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // 🔹 Login
  const login = async (credentials) => {
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", credentials);
      const loggedUser = response.data.user;

      setUser(loggedUser);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(loggedUser));

      return { success: true, user: loggedUser };
    } catch (error) {
      console.error("❌ Error en login:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Error al iniciar sesión",
      };
    }
  };

  // 🔹 Logout
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  // 🔹 UpdateUser: actualizar perfil en la base de datos y contexto
  const updateUser = async (newData) => {
    try {
      console.log("🔍 Datos recibidos en updateUser:", newData);
      
      // ⚡ SOLO ENVIAR LOS CAMPOS PERMITIDOS por ActualizarUsuarioDto
      const updateData = {
        telefono: newData.telefono || user.telefono,
        email: newData.email || user.email,
        direccion: newData.direccion || user.direccion || "",
        estado: user.estado || "Activo",
      };

      // 🔹 Solo agregar password si no está vacío
      if (newData.password && newData.password.trim() !== "") {
        updateData.password = newData.password;
      }

      console.log("📤 Datos FINALES que se enviarán al backend:", JSON.stringify(updateData, null, 2));

      // PUT al backend
      const response = await axios.put(
        `http://localhost:3000/api/usuarios/${user.id}`,
        updateData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      console.log("✅ Respuesta exitosa del backend:", response.data);

      // Actualizar usuario en frontend
      const updatedUser = {
        ...user,
        telefono: newData.telefono,
        email: newData.email,
        direccion: newData.direccion,
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return { 
        success: true, 
        data: response.data, 
        updatedUser,
        message: "Perfil actualizado correctamente"
      };
    } catch (error) {
      console.error("❌ Error completo al actualizar usuario:", error);
      console.error("❌ Status del error:", error.response?.status);
      console.error("❌ Headers del error:", error.response?.headers);
      console.error("❌ Datos COMPLETOS del error response:", error.response?.data);
      
      // 🔹 MOSTRAR LOS ERRORES ESPECÍFICOS
      let errorMessage = "Error al actualizar el perfil";
      let errorDetails = [];
      
      if (error.response?.data) {
        const errorData = error.response.data;
        console.error("❌ Estructura COMPLETA del error:", errorData);
        
        if (errorData.message) {
          errorMessage = errorData.message;
        }
        
        // 🔹 MOSTRAR LOS ERRORES ESPECÍFICOS DEL ARRAY
        if (errorData.errors && Array.isArray(errorData.errors)) {
          errorDetails = errorData.errors;
          console.error("❌ Errores específicos:", errorDetails);
          errorMessage = errorDetails.join(", ");
        } else if (errorData.error) {
          errorMessage = errorData.error;
        }
      }

      return {
        success: false,
        error: errorMessage,
        details: errorDetails,
        status: error.response?.status,
        responseData: error.response?.data
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, isAuthenticated, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);