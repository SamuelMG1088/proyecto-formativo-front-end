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
import { useAuth } from "../../contexts/AuthContext/AuthContext.jsx"; // ✅ importar contexto
import { validateEmail, validatePhone, validateAddress, validateDocument } from "../../utils/validation.js";
import "../../styles/validation.css";
import "./css/editProfile.css";

const EditProfile = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user, updateUser } = useAuth(); // ✅ acceder a updateUser y datos
  const navigate = useNavigate();

  // Estados de formulario con valores iniciales desde user
  const [formData, setFormData] = useState({
    tipoDocumento: user?.tipoDocumento || "",
    telefono: user?.telefono || "",
    email: user?.email || "",
    direccion: user?.direccion || "",
  });

  // Estados para validaciones
  const [errors, setErrors] = useState({
    telefono: "",
    email: "",
    direccion: "",
  });
  const [touched, setTouched] = useState({
    telefono: false,
    email: false,
    direccion: false,
  });
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const images = [BannerHome3, BannerHome4, BannerHome5];

  // 🎞 Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  // Función para validar un campo específico
  const validateField = (fieldName, value) => {
    let error = "";
    
    switch (fieldName) {
      case "telefono":
        const phoneValidation = validatePhone(value);
        if (!phoneValidation.isValid) {
          error = phoneValidation.error;
        }
        break;
      case "email":
        const emailValidation = validateEmail(value);
        if (!emailValidation.isValid) {
          error = emailValidation.error;
        }
        break;
      case "direccion":
        const addressValidation = validateAddress(value);
        if (!addressValidation.isValid) {
          error = addressValidation.error;
        }
        break;
      default:
        break;
    }
    
    return error;
  };

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Validar en tiempo real si el campo ha sido tocado
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  // Manejar cuando un campo pierde el foco
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Validar todo el formulario
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validar teléfono
    const phoneError = validateField("telefono", formData.telefono);
    if (phoneError) {
      newErrors.telefono = phoneError;
      isValid = false;
    }

    // Validar email
    const emailError = validateField("email", formData.email);
    if (emailError) {
      newErrors.email = emailError;
      isValid = false;
    }

    // Validar dirección
    const addressError = validateField("direccion", formData.direccion);
    if (addressError) {
      newErrors.direccion = addressError;
      isValid = false;
    }

    setErrors(newErrors);
    setTouched({
      telefono: true,
      email: true,
      direccion: true,
    });

    return isValid;
  };

  // Guardar cambios
  const handleSave = async () => {
    // Prevenir múltiples envíos
    if (isSubmitting) return;
    
    setIsSubmitting(true);

    // Validar formulario antes de guardar
    if (!validateForm()) {
      setIsSubmitting(false);
      const isDarkMode = document.body.classList.contains("dark");
      
      Swal.fire({
        title: "Error de validación",
        text: "Por favor corrige los errores antes de continuar",
        icon: "error",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#d33",
        background: isDarkMode ? "#1e1e1e" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
      });
      return;
    }

    try {
      updateUser(formData); // ✅ actualiza en contexto y localStorage

      const isDarkMode = document.body.classList.contains("dark");

      Swal.fire({
        title: "¡Datos actualizados!",
        text: "Tus datos han sido actualizados correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#39a900",
        background: isDarkMode ? "#1e1e1e" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
      }).then(() => {
        navigate("/viewprofile"); // ✅ redirige al perfil SIN perder sesión
      });
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      const isDarkMode = document.body.classList.contains("dark");
      
      Swal.fire({
        title: "Error",
        text: "No se pudieron actualizar los datos. Inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#d33",
        background: isDarkMode ? "#1e1e1e" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <h1 className="profile-title">
            {user?.nombre || "Usuario"}
          </h1>

          <div className="info-boxes">
            <div className="info-box">
              <p className="info-main">Estado</p>
              <p className="info-label">{user?.estado || "Activo"}</p>
            </div>
          </div>

          <div className="requirements">
            <div className="requirement">
              <h3>Tipo de documento</h3>
              <select
                name="tipoDocumento"
                value={formData.tipoDocumento}
                onChange={handleChange}
              >
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="NIT">NIT</option>
                <option value="CE">Cédula de Extranjería</option>
                <option value="PA">Pasaporte</option>
              </select>
            </div>

            <div className="requirement">
              <h3>Número Telefónico</h3>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ingresa el nuevo número de teléfono"
                className={touched.telefono && errors.telefono ? "error-input" : ""}
                disabled={isSubmitting}
                aria-invalid={touched.telefono && errors.telefono ? "true" : "false"}
                aria-describedby={touched.telefono && errors.telefono ? "telefono-error" : "telefono-help"}
              />
              {touched.telefono && errors.telefono && (
                <span id="telefono-error" className="error-message" role="alert">
                  {errors.telefono}
                </span>
              )}
              {!touched.telefono && (
                <small id="telefono-help" className="help-text">
                  Ingresa un número de teléfono válido (7-15 dígitos)
                </small>
              )}
            </div>

            <div className="requirement">
              <h3>Correo Electrónico</h3>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ingresa la nueva dirección de correo"
                className={touched.email && errors.email ? "error-input" : ""}
                disabled={isSubmitting}
                aria-invalid={touched.email && errors.email ? "true" : "false"}
                aria-describedby={touched.email && errors.email ? "email-error" : "email-help"}
              />
              {touched.email && errors.email && (
                <span id="email-error" className="error-message" role="alert">
                  {errors.email}
                </span>
              )}
              {!touched.email && (
                <small id="email-help" className="help-text">
                  Ingresa una dirección de correo válida
                </small>
              )}
            </div>

            <div className="requirement">
              <h3>Dirección</h3>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ingresa la dirección actualizada"
                className={touched.direccion && errors.direccion ? "error-input" : ""}
                disabled={isSubmitting}
                aria-invalid={touched.direccion && errors.direccion ? "true" : "false"}
                aria-describedby={touched.direccion && errors.direccion ? "direccion-error" : "direccion-help"}
              />
              {touched.direccion && errors.direccion && (
                <span id="direccion-error" className="error-message" role="alert">
                  {errors.direccion}
                </span>
              )}
              {!touched.direccion && (
                <small id="direccion-help" className="help-text">
                  Incluye calle, carrera, números y referencias (10-200 caracteres)
                </small>
              )}
            </div>
          </div>

          {/* Botón Guardar */}
          <div className="Box-Button">
            <div className="Button" onClick={isSubmitting ? null : handleSave}>
              <ButtonConfirm disabled={isSubmitting} />
              {isSubmitting && <span className="loading-text">Guardando...</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;