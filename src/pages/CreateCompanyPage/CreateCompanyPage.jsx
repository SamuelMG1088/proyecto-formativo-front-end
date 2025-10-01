import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "../../styles/validation.css";

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

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Validaciones por campo
  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "documentNumber": {
        if (!value) {
          newErrors.documentNumber = t("form.requiredField");
        } else if (!/^\d+$/.test(value)) {
          newErrors.documentNumber = t("form.onlyNumbers");
        } else {
          const docType = userData.documentType;
          if (docType === "C.C") {
            if (value.length < 6 || value.length > 10) {
              newErrors.documentNumber = t("form.ccLength");
            } else {
              delete newErrors.documentNumber;
            }
          } else if (docType === "NIT") {
            if (value.length < 9 || value.length > 15) {
              newErrors.documentNumber = t("form.nitLength");
            } else {
              delete newErrors.documentNumber;
            }
          } else if (docType === "C.E") {
            if (value.length < 6 || value.length > 15) {
              newErrors.documentNumber = t("form.ceLength");
            } else {
              delete newErrors.documentNumber;
            }
          }
        }
        break;
      }

      case "firstName":
        if (!value) {
          newErrors.firstName = t("form.requiredField");
        } else if (value.length < 2) {
          newErrors.firstName = t("form.nameMinLength");
        } else {
          delete newErrors.firstName;
        }
        break;

      case "lastName":
        if (!value) {
          newErrors.lastName = t("form.requiredField");
        } else if (value.length < 2) {
          newErrors.lastName = t("form.nameMinLength");
        } else {
          delete newErrors.lastName;
        }
        break;

      case "phone":
        if (!value) {
          newErrors.phone = t("form.requiredField");
        } else if (!/^\d+$/.test(value)) {
          newErrors.phone = t("form.onlyNumbers");
        } else if (value.length < 7) {
          newErrors.phone = t("form.phoneMinLength");
        } else {
          delete newErrors.phone;
        }
        break;

      case "email":
        if (!value) {
          newErrors.email = t("form.requiredField");
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          newErrors.email = t("form.invalidEmail");
        } else {
          delete newErrors.email;
        }
        break;

      case "address":
        if (!value) {
          newErrors.address = t("form.requiredField");
        } else if (value.length < 10) {
          newErrors.address = t("form.addressMinLength");
        } else {
          delete newErrors.address;
        }
        break;

      case "password":
        if (!value) {
          newErrors.password = t("form.requiredField");
        } else if (value.length < 8) {
          newErrors.password = t("form.passwordMinLength");
        } else {
          delete newErrors.password;
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
    setUserData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) validateField(name, value);
  };

  const handleInputBlur = async (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);

    // Verificación duplicados
    if (name === "email" && value && !errors.email) {
      try {
        const emailCheck = await axios.get(
          `http://localhost:3000/api/usuarios/check-email/${value}`
        );
        if (emailCheck.data.exists) {
          setErrors((prev) => ({ ...prev, email: t("form.emailExists") }));
        }
      } catch (error) {
        console.error("Error verificando email:", error);
      }
    }

    if (name === "documentNumber" && value && !errors.documentNumber) {
      try {
        const docCheck = await axios.get(
          `http://localhost:3000/api/usuarios/check-document/${value}`
        );
        if (docCheck.data.exists) {
          setErrors((prev) => ({ ...prev, documentNumber: t("form.documentExists") }));
        }
      } catch (error) {
        console.error("Error verificando documento:", error);
      }
    }
  };

  // Validación paso
  const validateStep = (step) => {
    let isValid = true;
    const fields =
      step === 1
        ? ["rol", "documentType", "documentNumber", "firstName", "lastName", "phone", "actividad_economica"]
        : step === 2
        ? ["email", "status", "address", "password"]
        : ["rol", "documentType", "documentNumber", "firstName", "lastName", "phone", "actividad_economica", "email", "status", "address", "password"];

    fields.forEach((field) => {
      const ok = validateField(field, userData[field]);
      if (!ok) isValid = false;
    });

    return isValid;
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) {
      Swal.fire({
        title: t("alerts.error"),
        text: t("alerts.validationErrors"),
        icon: "error",
      });
      return;
    }

    try {
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
        rol_usuario: userData.rol,
      };

      const response = await axios.post("http://localhost:3000/api/usuarios", payload);

      Swal.fire({
        title: t("alerts.userCreated"),
        text: response.data.message || t("alerts.accountRegistered"),
        icon: "success",
      }).then(() => navigate("/listcompany"));
    } catch (error) {
      Swal.fire({
        title: t("alerts.error"),
        text: error.response?.data?.message || t("alerts.userNotRegistered"),
        icon: "error",
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
                  aria-describedby={errors.rol ? "rol-error" : "rol-help"}
                  aria-invalid={!!errors.rol}
                  required
                >
                  <option value="">{t("form.selectRol")}</option>
                  <option value="Admin">{t("form.admin")}</option>
                  <option value="Empresa">{t("form.empresa")}</option>
                </select>
                {errors.rol && <span id="rol-error" className="error-message" role="alert">{errors.rol}</span>}
              </div>

              <div className="form-group">
                <label>{t("form.documentType")} <span>*</span></label>
                <select 
                  name="documentType" 
                  value={userData.documentType} 
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className={errors.documentType ? "error" : ""}
                  aria-describedby={errors.documentType ? "documentType-error" : "documentType-help"}
                  aria-invalid={!!errors.documentType}
                >
                  <option value="C.C">{t("form.cc")}</option>
                  <option value="NIT">NIT</option>
                  <option value="C.E">{t("form.ce")}</option>
                </select>
                {errors.documentType && <span id="documentType-error" className="error-message" role="alert">{errors.documentType}</span>}
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
                  aria-describedby={errors.documentNumber ? "documentNumber-error" : "documentNumber-help"}
                  aria-invalid={!!errors.documentNumber}
                  autoComplete="off"
                />
                {errors.documentNumber && <span id="documentNumber-error" className="error-message" role="alert">{errors.documentNumber}</span>}
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
                  aria-describedby={errors.firstName ? "firstName-error" : "firstName-help"}
                  aria-invalid={!!errors.firstName}
                  autoComplete="given-name"
                />
                {errors.firstName && <span id="firstName-error" className="error-message" role="alert">{errors.firstName}</span>}
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
                  aria-describedby={errors.lastName ? "lastName-error" : "lastName-help"}
                  aria-invalid={!!errors.lastName}
                  autoComplete="family-name"
                />
                {errors.lastName && <span id="lastName-error" className="error-message" role="alert">{errors.lastName}</span>}
              </div>

              <div className="form-group">
                <label>{t("form.phone")} <span>*</span></label>
                <input
                  type="tel"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder={t("form.enterPhone")}
                  className={errors.phone ? "error" : ""}
                  maxLength="15"
                  aria-describedby={errors.phone ? "phone-error" : "phone-help"}
                  aria-invalid={!!errors.phone}
                  autoComplete="tel"
                />
                {errors.phone && <span id="phone-error" className="error-message" role="alert">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label>{t("form.economicActivity")}</label>
                <select 
                  name="actividad_economica" 
                  value={userData.actividad_economica} 
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className={errors.actividad_economica ? "error" : ""}
                  aria-describedby={errors.actividad_economica ? "actividad_economica-error" : "actividad_economica-help"}
                  aria-invalid={!!errors.actividad_economica}
                >
                  <option value="Sector primario">{t("form.sectorPrimary")}</option>
                  <option value="Sector secundario">{t("form.sectorSecondary")}</option>
                  <option value="Sector terciario">{t("form.sectorTertiary")}</option>
                </select>
                {errors.actividad_economica && <span id="actividad_economica-error" className="error-message" role="alert">{errors.actividad_economica}</span>}
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
                  aria-describedby={errors.email ? "email-error" : "email-help"}
                  aria-invalid={!!errors.email}
                  autoComplete="email"
                />
                {errors.email && <span id="email-error" className="error-message" role="alert">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>{t("form.status")}</label>
                <select 
                  name="status" 
                  value={userData.status} 
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className={errors.status ? "error" : ""}
                  aria-describedby={errors.status ? "status-error" : "status-help"}
                  aria-invalid={!!errors.status}
                >
                  <option value="active">{t("form.active")}</option>
                  <option value="inactive">{t("form.inactive")}</option>
                </select>
                {errors.status && <span id="status-error" className="error-message" role="alert">{errors.status}</span>}
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
                  aria-describedby={errors.address ? "address-error" : "address-help"}
                  aria-invalid={!!errors.address}
                  autoComplete="street-address"
                />
                {errors.address && <span id="address-error" className="error-message" role="alert">{errors.address}</span>}
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
                  aria-describedby={errors.password ? "password-error" : "password-help"}
                  aria-invalid={!!errors.password}
                  autoComplete="new-password"
                />
                {errors.password && <span id="password-error" className="error-message" role="alert">{errors.password}</span>}
                
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
