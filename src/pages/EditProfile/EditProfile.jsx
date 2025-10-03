// src/pages/EditProfile/EditProfile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import Gov from "../../layout/Gov/Gov.jsx";
import HeaderIcons from "../../layout/HeaderIcons/HeaderIcons.jsx";
import NavBar from "../../layout/NavBar/NavBar.jsx";
import BannerHome3 from "../../assets/banners/BannerHome3.png";
import BannerHome4 from "../../assets/banners/BannerHome4.png";
import BannerHome5 from "../../assets/banners/BannerHome5.png";
import ButtonConfirm from "../../components/Buttons/ButtonConfirm/ButtonConfirm.jsx";
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/AuthContext/AuthContext.jsx";
import { validateEmail, validatePhone, validateAddress, validatePassword } from "../../utils/validation.js";
import "../../styles/validation.css";
import "./css/editProfile.css";

const EditProfile = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    tipoDocumento: "CC",
    telefono: "",
    email: "",
    direccion: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const images = [BannerHome3, BannerHome4, BannerHome5];

  // 🔹 Inicializar formulario con datos del usuario
  useEffect(() => {
    if (user) {
      setFormData({
        tipoDocumento: user.tipoDocumento || "CC",
        telefono: user.telefono || "",
        email: user.email || "",
        direccion: user.direccion || "",
        password: "",
      });
    }
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  const validateField = (fieldName, value) => {
    let error = "";
    
    // 🔹 Validar campos requeridos
    if ((fieldName === "telefono" || fieldName === "email") && (!value || value.trim() === "")) {
      return "Este campo es requerido";
    }

    switch (fieldName) {
      case "telefono":
        if (value && value.trim() !== "") {
          const phoneValidation = validatePhone(value);
          if (!phoneValidation.isValid) error = phoneValidation.error;
        }
        break;
      case "email":
        if (value && value.trim() !== "") {
          const emailValidation = validateEmail(value);
          if (!emailValidation.isValid) error = emailValidation.error;
        }
        break;
      case "direccion":
        if (value && value.trim() !== "") {
          const addressValidation = validateAddress(value);
          if (!addressValidation.isValid) error = addressValidation.error;
        }
        break;
      case "password":
        if (value && value.trim() !== "") {
          const passwordValidation = validatePassword(value, user);
          if (!passwordValidation.isValid) error = passwordValidation.error;
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // 🔹 Validación en tiempo real solo para campos tocados
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = e => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // 🔹 Validar campos requeridos
    if (!formData.telefono || formData.telefono.trim() === "") {
      newErrors.telefono = "El número telefónico es requerido";
      isValid = false;
    } else {
      const phoneError = validateField("telefono", formData.telefono);
      if (phoneError) {
        newErrors.telefono = phoneError;
        isValid = false;
      }
    }

    if (!formData.email || formData.email.trim() === "") {
      newErrors.email = "El correo electrónico es requerido";
      isValid = false;
    } else {
      const emailError = validateField("email", formData.email);
      if (emailError) {
        newErrors.email = emailError;
        isValid = false;
      }
    }

    // 🔹 Validar campos opcionales solo si tienen contenido
    if (formData.direccion && formData.direccion.trim() !== "") {
      const addressError = validateField("direccion", formData.direccion);
      if (addressError) {
        newErrors.direccion = addressError;
        isValid = false;
      }
    }

    if (formData.password && formData.password.trim() !== "") {
      const passwordError = validateField("password", formData.password);
      if (passwordError) {
        newErrors.password = passwordError;
        isValid = false;
      }
    }

    setErrors(newErrors);
    setTouched({
      telefono: true,
      email: true,
      direccion: true,
      password: true,
    });
    
    return isValid;
  };

  const hasChanges = () => {
    if (!user) return false;
    
    return (
      formData.telefono !== user.telefono ||
      formData.email !== user.email ||
      formData.direccion !== (user.direccion || "") ||
      (formData.password && formData.password.trim() !== "")
      // ❌ NO incluir tipoDocumento en la verificación de cambios - no se puede actualizar
    );
  };

  const handleSave = async () => {
    if (isSubmitting) return;
    
    // 🔹 Verificar si hay cambios
    if (!hasChanges()) {
      Swal.fire({
        title: "Sin cambios",
        text: "No se detectaron cambios para guardar",
        icon: "info",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#3085d6",
        background: document.body.classList.contains("dark") ? "#1e1e1e" : "#fff",
        color: document.body.classList.contains("dark") ? "#fff" : "#000",
      });
      return;
    }

    setIsSubmitting(true);

    if (!validateForm()) {
      Swal.fire({
        title: "Error de validación",
        text: "Por favor corrige los errores en el formulario",
        icon: "error",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#d33",
        background: document.body.classList.contains("dark") ? "#1e1e1e" : "#fff",
        color: document.body.classList.contains("dark") ? "#fff" : "#000",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // 🔹 Preparar datos para enviar - SOLO CAMPOS PERMITIDOS
      const dataToSend = { 
        telefono: formData.telefono.trim(), // Se convertirá a INTEGER en el backend
        email: formData.email.trim(),
        direccion: formData.direccion.trim()
        // ❌ NO enviar tipoDocumento - no está permitido en la actualización
      };

      // 🔹 Solo agregar password si el usuario la está cambiando
      if (formData.password && formData.password.trim() !== "") {
        dataToSend.password = formData.password.trim();
      }

      console.log("📝 Datos a enviar desde EditProfile:", dataToSend);

      const result = await updateUser(dataToSend);
      
      if (result.success) {
        await Swal.fire({
          title: "¡Éxito!",
          text: result.message || "Tus datos han sido actualizados correctamente",
          icon: "success",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#39a900",
          background: document.body.classList.contains("dark") ? "#1e1e1e" : "#fff",
          color: document.body.classList.contains("dark") ? "#fff" : "#000",
        });
        navigate("/viewprofile");
      } else {
        // 🔹 Mostrar errores específicos del backend
        let errorText = result.error;
        
        if (result.details && result.details.length > 0) {
          errorText += "\n\n" + result.details.map(detail => `• ${detail}`).join('\n');
        }
        
        if (result.responseData) {
          console.log("🔍 Datos completos de error:", result.responseData);
        }

        throw new Error(errorText);
      }
    } catch (error) {
      console.error("Error completo al actualizar perfil:", error);
      
      // 🔹 Mensaje de error más específico
      let errorMessage = error.message;
      
      if (errorMessage.includes("validation") || errorMessage.includes("validación")) {
        errorMessage = "Errores de validación en los datos:\n" + errorMessage;
      }

      Swal.fire({
        title: "Error al guardar",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#d33",
        background: document.body.classList.contains("dark") ? "#1e1e1e" : "#fff",
        color: document.body.classList.contains("dark") ? "#fff" : "#000",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🔹 Verificar si el formulario tiene errores
  const hasErrors = () => {
    return Object.values(errors).some(error => error !== "");
  };

  // 🔹 Agregar useEffect temporal para debug
  useEffect(() => {
    console.log("🔍 Datos actuales del usuario:", user);
    console.log("🔍 Datos actuales del formulario:", formData);
  }, [user, formData]);

  return (
    <div id="EditProfilePage">
      <div className="PageEditProfile">
        <Gov />
        <HeaderIcons />
        <NavBar />

        {/* 🎞 Carrusel */}
        <div className="profile-carousel">
          <div className="carousel-container">
            {images.map((image, index) => (
              <div
                key={index}
                className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
                style={{ backgroundImage: `url(${image})` }}
              />
            ))}
            <div className="carousel-dots">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentSlide ? "active" : ""}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 👤 Perfil */}
        <div className="profile-container">
          <div className="profile-header">
            <FaGraduationCap className="icon-Training" />
          </div>
          <h1 className="profile-title">{user?.nombre || "Usuario"}</h1>

          <div className="info-boxes">
            <div className="info-box">
              <p className="info-main">Estado</p>
              <p className="info-label">{user?.estado || "Activo"}</p>
            </div>
          </div>

          {/* 🔹 Mostrar alerta de errores general */}
          {hasErrors() && (
            <div className="global-error-alert">
              ⚠️ Por favor corrige los errores en el formulario antes de guardar
            </div>
          )}

          <div className="requirements">
            <div className="requirement">
              <h3>Tipo de documento</h3>
              <select 
                name="tipoDocumento"
                value={formData.tipoDocumento}
                onChange={handleChange}
                disabled={false} // 👈 DESHABILITADO - no se puede cambiar
                title="El tipo de documento no se puede modificar"
              >
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="NIT">NIT</option>
                <option value="CE">Cédula de Extranjería</option>
              </select>
              <p className="field-disabled-note">⚠️ El tipo de documento no se puede modificar</p>
            </div>

            <div className="requirement">
              <h3>Número Telefónico *</h3>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ej: 3001234567"
                className={errors.telefono ? "error-input" : ""}
                disabled={isSubmitting}
              />
              {errors.telefono && (
                <span className="error-message">❌ {errors.telefono}</span>
              )}
            </div>

            <div className="requirement">
              <h3>Correo Electrónico *</h3>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ej: usuario@correo.com"
                className={errors.email ? "error-input" : ""}
                disabled={isSubmitting}
              />
              {errors.email && (
                <span className="error-message">❌ {errors.email}</span>
              )}
            </div>

            <div className="requirement">
              <h3>Dirección *</h3>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ingresa tu dirección"
                className={errors.direccion ? "error-input" : ""}
                disabled={isSubmitting}
              />
              {errors.direccion && (
                <span className="error-message">❌ {errors.direccion}</span>
              )}
            </div>

            <div className="requirement">
              <h3>Contraseña <span className="optional-text">(Opcional)</span></h3>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Nueva contraseña (déjalo vacío si no deseas cambiarla)"
                className={errors.password ? "error-input" : ""}
                disabled={isSubmitting}
              />
              {errors.password && (
                <span className="error-message">❌ {errors.password}</span>
              )}
            </div>
          </div>

          <div className="Box-Button">
            <div className="Button" onClick={isSubmitting ? null : handleSave}>
              <ButtonConfirm disabled={isSubmitting || hasErrors()} />
              {isSubmitting && <span className="loading-text">Guardando...</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;