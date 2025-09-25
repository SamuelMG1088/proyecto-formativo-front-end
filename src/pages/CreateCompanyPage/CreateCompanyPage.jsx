import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useTranslation } from "react-i18next";

import "./css/createCompany.css";
import Gov from "../../layout/Gov/Gov";
import HeaderIcons from "../../layout/HeaderIcons/HeaderIcons";
import NavBar from "../../layout/NavBar/NavBar";

import BannerHome6 from "../../assets/banners/BannerHome6.png";
import BannerHome11 from "../../assets/banners/BannerHome11.png";
import BannerHome13 from "../../assets/banners/BannerHome13.png";

const CreateCompanyPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({
    documentType: "C.C",
    documentNumber: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    status: "active",
    address: "",
    password: "",
    actividad_economica: "Sector primario",
    rol: "Empresa",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const images = [BannerHome6, BannerHome11, BannerHome13];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Validaciones específicas para cada campo
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'documentNumber':
        if (!value) {
          newErrors.documentNumber = t("form.requiredField");
        } else if (!/^\d+$/.test(value)) {
          newErrors.documentNumber = t("form.onlyNumbers");
        } else {
          // Validación específica según el tipo de documento
          const docType = userData.documentType;
          if (docType === 'C.C') {
            if (value.length < 6 || value.length > 10) {
              newErrors.documentNumber = t("form.ccLength");
            } else {
              delete newErrors.documentNumber;
            }
          } else if (docType === 'NIT') {
            if (value.length < 9 || value.length > 15) {
              newErrors.documentNumber = t("form.nitLength");
            } else {
              delete newErrors.documentNumber;
            }
          } else if (docType === 'C.E') {
            if (value.length < 6 || value.length > 15) {
              newErrors.documentNumber = t("form.ceLength");
            } else {
              delete newErrors.documentNumber;
            }
          } else {
            delete newErrors.documentNumber;
          }
        }
        break;

      case 'firstName':
        if (!value) {
          newErrors.firstName = t("form.requiredField");
        } else if (value.length < 2) {
          newErrors.firstName = t("form.nameMinLength");
        } else if (value.length > 50) {
          newErrors.firstName = t("form.nameMaxLength");
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
          newErrors.firstName = t("form.onlyLetters");
        } else {
          delete newErrors.firstName;
        }
        break;

      case 'lastName':
        if (!value) {
          newErrors.lastName = t("form.requiredField");
        } else if (value.length < 2) {
          newErrors.lastName = t("form.nameMinLength");
        } else if (value.length > 50) {
          newErrors.lastName = t("form.nameMaxLength");
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
          newErrors.lastName = t("form.onlyLetters");
        } else {
          delete newErrors.lastName;
        }
        break;

      case 'phone':
        if (!value) {
          newErrors.phone = t("form.requiredField");
        } else if (!/^\d+$/.test(value)) {
          newErrors.phone = t("form.onlyNumbers");
        } else if (value.length < 7) {
          newErrors.phone = t("form.phoneMinLength");
        } else if (value.length > 15) {
          newErrors.phone = t("form.phoneMaxLength");
        } else if (!/^[3][0-9]{9}$/.test(value) && !/^[6][0-9]{9}$/.test(value) && !/^[1-9][0-9]{6,9}$/.test(value)) {
          newErrors.phone = t("form.phoneFormat");
        } else {
          delete newErrors.phone;
        }
        break;

      case 'email':
        if (!value) {
          newErrors.email = t("form.requiredField");
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          newErrors.email = t("form.invalidEmail");
        } else if (value.length > 100) {
          newErrors.email = t("form.emailMaxLength");
        } else if (value.includes('..') || value.startsWith('.') || value.endsWith('.')) {
          newErrors.email = t("form.invalidEmailFormat");
        } else {
          delete newErrors.email;
        }
        break;

      case 'address':
        if (!value) {
          newErrors.address = t("form.requiredField");
        } else if (value.length < 10) {
          newErrors.address = t("form.addressMinLength");
        } else if (value.length > 200) {
          newErrors.address = t("form.addressMaxLength");
        } else {
          delete newErrors.address;
        }
        break;

      case 'password':
        if (!value) {
          newErrors.password = t("form.requiredField");
        } else if (value.length < 8) {
          newErrors.password = t("form.passwordMinLength");
        } else if (value.length > 50) {
          newErrors.password = t("form.passwordMaxLength");
        } else if (!/(?=.*[a-z])/.test(value)) {
          newErrors.password = t("form.passwordLowercase");
        } else if (!/(?=.*[A-Z])/.test(value)) {
          newErrors.password = t("form.passwordUppercase");
        } else if (!/(?=.*\d)/.test(value)) {
          newErrors.password = t("form.passwordNumber");
        } else if (!/(?=.*[@$!%*?&])/.test(value)) {
          newErrors.password = t("form.passwordSpecial");
        } else if (/(.)\1{2,}/.test(value)) {
          newErrors.password = t("form.passwordNoRepeated");
        } else if (value.toLowerCase().includes(userData.firstName.toLowerCase()) || 
                   value.toLowerCase().includes(userData.lastName.toLowerCase()) ||
                   value.toLowerCase().includes(userData.email.split('@')[0])) {
          newErrors.password = t("form.passwordPersonalInfo");
        } else {
          // Verificar contraseñas comunes
          const commonPasswords = ['password', '123456', '123456789', 'qwerty', 'abc123', 'password123', 'admin', 'letmein'];
          if (commonPasswords.includes(value.toLowerCase())) {
            newErrors.password = t("form.passwordCommon");
          } else {
            delete newErrors.password;
          }
        }
        break;

      case 'rol':
        if (!value) {
          newErrors.rol = t("form.requiredField");
        } else {
          delete newErrors.rol;
        }
        break;

      case 'documentType':
        if (!value) {
          newErrors.documentType = t("form.requiredField");
        } else {
          delete newErrors.documentType;
        }
        break;

      case 'actividad_economica':
        const validActivities = ["Sector primario", "Sector secundario", "Sector terciario"];
        if (!validActivities.includes(value)) {
          newErrors.actividad_economica = t("form.invalidEconomicActivity");
        } else {
          delete newErrors.actividad_economica;
        }
        break;

      case 'status':
        const validStatuses = ["active", "inactive"];
        if (!validStatuses.includes(value)) {
          newErrors.status = t("form.invalidStatus");
        } else {
          delete newErrors.status;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return !newErrors[name];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    // Limpiar y procesar valores según el tipo de campo
    if (name === 'firstName' || name === 'lastName') {
      // Solo letras y espacios, eliminar caracteres especiales
      processedValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    } else if (name === 'documentNumber' || name === 'phone') {
      // Solo números
      processedValue = value.replace(/\D/g, '');
    } else if (name === 'email') {
      // Convertir a minúsculas y eliminar espacios
      processedValue = value.toLowerCase().trim();
    } else if (name === 'address') {
      // Permitir letras, números, espacios y algunos caracteres especiales
      processedValue = value.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s#\-.,]/g, '');
    }
    
    setUserData((prev) => ({ ...prev, [name]: processedValue }));
    
    // Validar en tiempo real si el campo ha sido tocado
    if (touched[name]) {
      validateField(name, processedValue);
    }
  };

  const handleInputBlur = async (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);

    // Verificar duplicados en tiempo real para email y documento
    if (name === 'email' && value && !errors.email) {
      try {
        const emailCheck = await axios.get(`http://localhost:3000/api/usuarios/check-email/${value}`);
        if (emailCheck.data.exists) {
          setErrors(prev => ({ ...prev, email: t("form.emailExists") }));
        }
      } catch (error) {
        console.error("Error verificando email:", error);
      }
    }

    if (name === 'documentNumber' && value && !errors.documentNumber) {
      try {
        const documentCheck = await axios.get(`http://localhost:3000/api/usuarios/check-document/${value}`);
        if (documentCheck.data.exists) {
          setErrors(prev => ({ ...prev, documentNumber: t("form.documentExists") }));
        }
      } catch (error) {
        console.error("Error verificando documento:", error);
      }
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    let isValid = true;

    if (step === 1) {
      // Validar todos los campos del paso 1
      const fieldsToValidate = ['rol', 'documentType', 'documentNumber', 'firstName', 'lastName', 'phone', 'actividad_economica'];
      
      fieldsToValidate.forEach(field => {
        const fieldValid = validateField(field, userData[field]);
        if (!fieldValid) {
          isValid = false;
        }
      });
    }
    
    if (step === 2) {
      // Validar todos los campos del paso 2
      const fieldsToValidate = ['email', 'status', 'address', 'password'];
      
      fieldsToValidate.forEach(field => {
        const fieldValid = validateField(field, userData[field]);
        if (!fieldValid) {
          isValid = false;
        }
      });
    }

    return isValid;
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Función para verificar duplicados
  const checkDuplicates = async () => {
    try {
      // Verificar si el email ya existe
      const emailCheck = await axios.get(`http://localhost:3000/api/usuarios/check-email/${userData.email}`);
      if (emailCheck.data.exists) {
        setErrors(prev => ({ ...prev, email: t("form.emailExists") }));
        return false;
      }

      // Verificar si el documento ya existe
      const documentCheck = await axios.get(`http://localhost:3000/api/usuarios/check-document/${userData.documentNumber}`);
      if (documentCheck.data.exists) {
        setErrors(prev => ({ ...prev, documentNumber: t("form.documentExists") }));
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error verificando duplicados:", error);
      return true; // Continuar si hay error en la verificación
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    const validValues = ["Sector primario", "Sector secundario", "Sector terciario"];
    if (!validValues.includes(userData.actividad_economica)) {
      Swal.fire({
        title: t("alerts.error"),
        text: t("alerts.invalidEconomicActivity"),
        icon: "error",
        confirmButtonColor: "#d33",
      });
      return;
    }

    // Verificar duplicados antes de enviar
    const noDuplicates = await checkDuplicates();
    if (!noDuplicates) {
      Swal.fire({
        title: t("alerts.error"),
        text: t("alerts.duplicateData"),
        icon: "error",
        confirmButtonColor: "#d33",
      });
      return;
    }

    try {
      // Normalizamos rol
      const roleNormalized =
        (userData.rol || "").toString().toLowerCase() === "admin" ? "Admin" : "Empresa";

      // Payload corregido
      const payload = {
        id: parseInt(userData.documentNumber, 10),
        tipo_documento:
          userData.documentType === "C.C"
            ? "Cédula de ciudadanía"
            : userData.documentType === "NIT"
            ? "NIT"
            : "Cédula de extranjería",
        nombre: userData.firstName,
        apellido: userData.lastName,
        telefono: userData.phone,
        email: userData.email,
        estado: userData.status === "active" ? "Activo" : "Inactivo",
        password: userData.password,
        direccion: userData.address,
        actividad_economica: userData.actividad_economica,
        rol_usuario: roleNormalized, 
      };

      console.log("Payload enviado:", payload);

      const response = await axios.post("http://localhost:3000/api/usuarios", payload);

      const usuarioRecibido = response.data.usuario || {};
      const usuarioConRol = { ...usuarioRecibido, rol_usuario: roleNormalized };

      console.log("Usuario creado (frontend):", usuarioConRol);

      Swal.fire({
        title: t("alerts.userCreated"),
        text: response.data.message || t("alerts.accountRegistered"),
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#00304d",
      }).then((result) => {
        if (result.isConfirmed) navigate("/listcompany");
      });
    } catch (error) {
      console.error("Error al crear el usuario:", error.response?.data || error);
      Swal.fire({
        title: t("alerts.error"),
        text: error.response?.data?.message || t("alerts.userNotRegistered"),
        icon: "error",
        confirmButtonText: t("alerts.retry"),
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div id="CreateCompanyPage">
      <div className="PageCreateCompany">
        <Gov />
        <HeaderIcons />
        <NavBar />

        {/* Carrusel */}
        <div className="create-company-carousel">
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

        {/* Formulario */}
        <div className="create-company-form">
          <h1>{t("createUser.title")}</h1>
          <p className="form-subtitle">{t("createUser.subtitle")}</p>

          {/* Stepper */}
          <div className="step-indicator">
            <div className={`step ${currentStep >= 1 ? "active" : ""}`}>1</div>
            <div className={`step-line ${currentStep >= 2 ? "active" : ""}`} />
            <div className={`step ${currentStep >= 2 ? "active" : ""}`}>2</div>
            <div className={`step-line ${currentStep >= 3 ? "active" : ""}`} />
            <div className={`step ${currentStep === 3 ? "active" : ""}`}>3</div>
          </div>

          <div className="step-labels">
            <span className={currentStep === 1 ? "active" : ""}>{t("createUser.step1")}</span>
            <span className={currentStep === 2 ? "active" : ""}>{t("createUser.step2")}</span>
            <span className={currentStep === 3 ? "active" : ""}>{t("createUser.step3")}</span>
          </div>

          {/* Paso 1 */}
          {currentStep === 1 && (
            <div className="form-step">
              <h2>{t("createUser.step1")}</h2>
              <p className="step-description">{t("createUser.step1Description")}</p>

              <div className="form-group">
                <label>
                  {t("form.rol")} <span>*</span>
                </label>
                <select 
                  name="rol" 
                  value={userData.rol} 
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className={errors.rol ? "error" : ""}
                  required
                >
                  <option value="">{t("form.selectRol")}</option>
                  <option value="Admin">{t("form.admin")}</option>
                  <option value="Empresa">{t("form.empresa")}</option>
                </select>
                {errors.rol && <span className="error-message">{errors.rol}</span>}
              </div>

              <div className="form-group">
                <label>{t("form.documentType")} <span>*</span></label>
                <select 
                  name="documentType" 
                  value={userData.documentType} 
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className={errors.documentType ? "error" : ""}
                >
                  <option value="C.C">{t("form.cc")}</option>
                  <option value="NIT">NIT</option>
                  <option value="C.E">{t("form.ce")}</option>
                </select>
                {errors.documentType && <span className="error-message">{errors.documentType}</span>}
              </div>

              <div className="form-group">
                <label>{t("form.userId")} <span>*</span></label>
                <input
                  type="text"
                  name="documentNumber"
                  value={userData.documentNumber}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder={t("form.enterDocumentNumber")}
                  className={errors.documentNumber ? "error" : ""}
                  maxLength="15"
                />
                {errors.documentNumber && <span className="error-message">{errors.documentNumber}</span>}
              </div>

              <div className="form-group">
                <label>{t("form.firstName")} <span>*</span></label>
                <input
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder={t("form.enterFirstName")}
                  className={errors.firstName ? "error" : ""}
                  maxLength="50"
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label>{t("form.lastName")} <span>*</span></label>
                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder={t("form.enterLastName")}
                  className={errors.lastName ? "error" : ""}
                  maxLength="50"
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>

              <div className="form-group">
                <label>{t("form.phone")} <span>*</span></label>
                <input
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder={t("form.enterPhone")}
                  className={errors.phone ? "error" : ""}
                  maxLength="15"
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label>{t("form.economicActivity")}</label>
                <select 
                  name="actividad_economica" 
                  value={userData.actividad_economica} 
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className={errors.actividad_economica ? "error" : ""}
                >
                  <option value="Sector primario">{t("form.sectorPrimary")}</option>
                  <option value="Sector secundario">{t("form.sectorSecondary")}</option>
                  <option value="Sector terciario">{t("form.sectorTertiary")}</option>
                </select>
                {errors.actividad_economica && <span className="error-message">{errors.actividad_economica}</span>}
              </div>

              <div className="form-navigation">
                <Link to="/listcompany">
                  <button type="button" className="secondary-button">
                    {t("buttons.previous")}
                  </button>
                </Link>
                <button
                  type="button"
                  className="primary-button"
                  onClick={nextStep}
                  disabled={!userData.rol || !userData.documentNumber || !userData.firstName || !userData.lastName || !userData.phone}
                >
                  {t("buttons.next")}
                </button>
              </div>
            </div>
          )}

          {/* Paso 2 */}
          {currentStep === 2 && (
            <div className="form-step">
              <h2>{t("createUser.step2")}</h2>
              <p className="step-description">{t("createUser.step2Description")}</p>

              <div className="form-group">
                <label>{t("form.email")} <span>*</span></label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder={t("form.enterEmail")}
                  className={errors.email ? "error" : ""}
                  maxLength="100"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>{t("form.status")}</label>
                <select 
                  name="status" 
                  value={userData.status} 
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className={errors.status ? "error" : ""}
                >
                  <option value="active">{t("form.active")}</option>
                  <option value="inactive">{t("form.inactive")}</option>
                </select>
                {errors.status && <span className="error-message">{errors.status}</span>}
              </div>

              <div className="form-group">
                <label>{t("form.address")} <span>*</span></label>
                <input
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder={t("form.enterAddress")}
                  className={errors.address ? "error" : ""}
                  maxLength="200"
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>

              <div className="form-group">
                <label>{t("form.password")} <span>*</span></label>
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder={t("form.enterPassword")}
                  className={errors.password ? "error" : ""}
                  maxLength="50"
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
                
                {/* Indicador de fortaleza de contraseña */}
                {userData.password && (
                  <div className="password-strength">
                    <div 
                      className={`password-strength-bar ${
                        userData.password.length < 6 ? 'password-strength-weak' :
                        userData.password.length < 8 ? 'password-strength-medium' : 'password-strength-strong'
                      }`}
                      style={{ 
                        width: `${Math.min((userData.password.length / 12) * 100, 100)}%` 
                      }}
                    />
                  </div>
                )}
                
                <div className="password-requirements">
                  <p className="requirements-title">{t("form.passwordRequirements")}:</p>
                  <ul className="requirements-list">
                    <li className={userData.password.length >= 8 ? "valid" : ""}>
                      {t("form.passwordMinLength")}
                    </li>
                    <li className={/(?=.*[a-z])/.test(userData.password) ? "valid" : ""}>
                      {t("form.passwordLowercase")}
                    </li>
                    <li className={/(?=.*[A-Z])/.test(userData.password) ? "valid" : ""}>
                      {t("form.passwordUppercase")}
                    </li>
                    <li className={/(?=.*\d)/.test(userData.password) ? "valid" : ""}>
                      {t("form.passwordNumber")}
                    </li>
                    <li className={/(?=.*[@$!%*?&])/.test(userData.password) ? "valid" : ""}>
                      {t("form.passwordSpecial")}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="form-navigation">
                <button type="button" className="secondary-button" onClick={prevStep}>
                  {t("buttons.previous")}
                </button>
                <button 
                  type="button" 
                  className="primary-button" 
                  onClick={nextStep}
                  disabled={!userData.email || !userData.address || !userData.password}
                >
                  {t("buttons.next")}
                </button>
              </div>
            </div>
          )}

          {/* Paso 3 */}
          {currentStep === 3 && (
            <div className="form-step">
              <h2>{t("createUser.step3")}</h2>
              <p className="step-description">{t("createUser.step3Description")}</p>

              <div className="confirmation-details">
                {Object.entries({
                  [t("form.rol")]: userData.rol,
                  [t("form.documentType")]: userData.documentType,
                  [t("form.userId")]: userData.documentNumber,
                  [t("form.firstName")]: userData.firstName,
                  [t("form.lastName")]: userData.lastName,
                  [t("form.phone")]: userData.phone,
                  [t("form.email")]: userData.email,
                  [t("form.status")]: userData.status === "active" ? t("form.active") : t("form.inactive"),
                  [t("form.address")]: userData.address,
                  [t("form.economicActivity")]: userData.actividad_economica,
                }).map(([label, value]) => (
                  <div className="detail-row" key={label}>
                    <p className="detail-label">{label}:</p>
                    <p className="detail-value">{value}</p>
                  </div>
                ))}
              </div>

              <div className="form-navigation">
                <button type="button" className="secondary-button" onClick={prevStep}>
                  {t("buttons.previous")}
                </button>
                <button type="button" className="primary-button" onClick={handleSubmit}>
                  {t("buttons.confirmCreateUser")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCompanyPage;
