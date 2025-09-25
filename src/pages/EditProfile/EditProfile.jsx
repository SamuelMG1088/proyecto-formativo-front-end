  // src/pages/EditProfile/EditProfile.jsx
  import React, { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import { FaGraduationCap } from "react-icons/fa";
  import Gov from "../../layout/Gov/Gov.jsx";
  import HeaderIcons from "../../layout/HeaderIcons/HeaderIcons.jsx";
  import NavBar from "../../layout/NavBar/NavBar.jsx";
  import BannerHome3 from "../../assets/banners/BannerHome3.png";
  import BannerHome4 from "../../assets/banners/BannerHome4.png";
  import BannerHome5 from "../../assets/images/factorHumano5.png";
  import ButtonConfirm from "../../components/Buttons/ButtonConfirm/ButtonConfirm.jsx";
  import Swal from "sweetalert2";
  import { useAuth } from "../../contexts/AuthContext/AuthContext.jsx"; //importar contexto
  import "./css/editProfile.css";

  const EditProfile = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { user, updateUser, updateUserLocal } = useAuth(); // acceder a updateUser y datos
    const navigate = useNavigate();

    // Estados de formulario con valores iniciales desde user
    const [formData, setFormData] = useState({
      tipoDocumento: user?.tipoDocumento || "",
      telefono: user?.telefono || "",
      email: user?.email || "",
      direccion: user?.direccion || "",
    });

    // Estados para validaciones
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

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

  // 🔄 Actualizar formulario cuando cambie el usuario en el contexto
  useEffect(() => {
    if (user) {
      setFormData({
        tipoDocumento: user.tipoDocumento || "",
        telefono: user.telefono || "",
        email: user.email || "",
        direccion: user.direccion || "",
      });
    }
  }, [user]);

    // Funciones de validación específicas
    const validateField = (name, value) => {
      let error = "";
      
      switch (name) {
        case "telefono":
          if (!value.trim()) {
            error = "El teléfono es requerido";
          } else if (!/^\d{10}$/.test(value.replace(/\s/g, ''))) {
            error = "El teléfono debe tener exactamente 10 dígitos";
          }
          break;
          
        case "email":
          if (!value.trim()) {
            error = "El email es requerido";
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = "El email no tiene un formato válido";
          }
          break;
          
        case "direccion":
          if (!value.trim()) {
            error = "La dirección es requerida";
          } else if (value.trim().length < 10) {
            error = "La dirección debe tener al menos 10 caracteres";
          }
          break;
          
        case "tipoDocumento":
          if (!value) {
            error = "El tipo de documento es requerido";
          }
          break;
          
        default:
          break;
      }
      
      return error;
    };

    // Formatear teléfono mientras se escribe
    const formatPhone = (value) => {
      // Remover todos los caracteres que no sean números
      const numbers = value.replace(/\D/g, '');
      // Limitar a 10 dígitos
      return numbers.slice(0, 10);
    };

    // Manejar cambios en los inputs con validación en tiempo real
    const handleChange = (e) => {
      const { name, value } = e.target;
      let processedValue = value;
      
      // Formatear teléfono si es necesario
      if (name === 'telefono') {
        processedValue = formatPhone(value);
      }
      
      // Actualizar datos del formulario
      setFormData((prev) => ({ ...prev, [name]: processedValue }));
      
      // Validar campo específico
      const error = validateField(name, processedValue);
      
      // Actualizar errores
      setErrors((prev) => ({
        ...prev,
        [name]: error
      }));
    };

    // Manejar cuando el usuario sale del campo (blur)
    const handleBlur = (e) => {
      const { name } = e.target;
      
      // Marcar campo como tocado
      setTouched((prev) => ({
        ...prev,
        [name]: true
      }));
    };

  // Verificar si hay errores activos
  const hasActiveErrors = () => {
    const activeErrors = Object.entries(errors).filter(([field, error]) => {
      return error && error.trim() !== '' && touched[field];
    });
    return activeErrors.length > 0;
  };

  // Validar formulario completo
  const validateForm = () => {
    const newErrors = {};
    
    // Validar cada campo
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    
    // Actualizar estado de errores
    setErrors(newErrors);
    
    // Marcar todos los campos como tocados
    const allTouched = {};
    Object.keys(formData).forEach(field => {
      allTouched[field] = true;
    });
    setTouched(allTouched);
    
    return newErrors;
  };

    // Guardar cambios
    const handleSave = async () => {
      // Validar formulario
      const errors = validateForm();
      if (Object.keys(errors).length > 0) {
        const errorMessages = Object.values(errors).join('\n');
        Swal.fire({
          title: "Datos incompletos",
          text: errorMessages,
          icon: "warning",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#ff9800",
        });
        return;
      }

      try {
        // Mostrar loading
        Swal.fire({
          title: "Actualizando...",
          text: "Por favor espera mientras guardamos tus datos",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

      // Actualizar en la base de datos
      const result = await updateUser(formData);
      
      if (result.success) {
        // Éxito - el contexto ya se actualizó automáticamente
        Swal.fire({
          title: "¡Datos actualizados!",
          text: "Tus datos han sido actualizados correctamente en la base de datos y en tu sesión.",
          icon: "success",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#39a900",
        }).then(() => {
          navigate("/viewprofile");
        });
      } else {
        // Error
        
        let errorMessage = result.error || "Ocurrió un error al actualizar tus datos. Inténtalo de nuevo.";
        
        if (result.details && result.details.length > 0) {
          errorMessage += "\n\nDetalles del error:\n" + result.details.join('\n');
        }
        
        Swal.fire({
          title: "Error al actualizar",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#d33",
        });
      }
      } catch (error) {
        console.error("Error inesperado:", error);
        Swal.fire({
          title: "Error inesperado",
          text: "Ocurrió un error inesperado. Inténtalo de nuevo.",
          icon: "error",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#d33",
        });
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
                  onBlur={handleBlur}
                  className={touched.tipoDocumento && errors.tipoDocumento ? 'error-field' : ''}
                >
                  <option value="">Selecciona un tipo de documento</option>
                  <option value="CC">Cédula de Ciudadanía</option>
                  <option value="NIT">NIT</option>
                  <option value="CE">Cédula de Extranjería</option>
                  <option value="PA">Pasaporte</option>
                </select>
                {touched.tipoDocumento && errors.tipoDocumento && (
                  <span className="error-message">{errors.tipoDocumento}</span>
                )}
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
                  className={touched.telefono && errors.telefono ? 'error-field' : ''}
                  maxLength="10"
                />
                {touched.telefono && errors.telefono && (
                  <span className="error-message">{errors.telefono}</span>
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
                  className={touched.email && errors.email ? 'error-field' : ''}
                />
                {touched.email && errors.email && (
                  <span className="error-message">{errors.email}</span>
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
                  className={touched.direccion && errors.direccion ? 'error-field' : ''}
                  minLength="10"
                />
                {touched.direccion && errors.direccion && (
                  <span className="error-message">{errors.direccion}</span>
                )}
              </div>
            </div>

          {/* Botón Guardar */}
          <div className="Box-Button">
            <div 
              className={`Button ${hasActiveErrors() ? 'disabled' : ''}`} 
              onClick={hasActiveErrors() ? undefined : handleSave}
              style={{ 
                opacity: hasActiveErrors() ? 0.6 : 1,
                cursor: hasActiveErrors() ? 'not-allowed' : 'pointer'
              }}
            >
              <ButtonConfirm />
            </div>
          </div>
          
          {/* Indicador de estado del formulario */}
          {Object.keys(touched).length > 0 && (
            <div className="form-status">
              {!hasActiveErrors() ? (
                <div className="status-valid">
                  ✅ Todos los campos son válidos
                </div>
              ) : (
                <div className="status-invalid">
                  ⚠️ Por favor corrige los errores antes de guardar
                </div>
              )}
            </div>
          )}
          </div>
        </div>
      </div>
    );
  };

  export default EditProfile;
