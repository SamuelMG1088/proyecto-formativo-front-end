import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { validateEmail, validatePhone, validateAddress, validatePassword, validateName, validateDocument } from "../../utils/validation.js";
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

  // Funciones de validación de documentos
  const validateCedula = (cedula) => {
    if (cedula.length < 6 || cedula.length > 10) return false;
    
    // Algoritmo de validación de cédula colombiana
    const digits = cedula.split('').map(Number);
    let sum = 0;
    let checkDigit = digits[digits.length - 1];
    
    for (let i = 0; i < digits.length - 1; i++) {
      let digit = digits[i];
      if (i % 2 === 0) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }
    
    const calculatedCheck = (10 - (sum % 10)) % 10;
    return calculatedCheck === checkDigit;
  };

  const validateNIT = (nit) => {
    if (nit.length < 9 || nit.length > 15) return false;
    
    // Algoritmo de validación de NIT colombiano
    const digits = nit.split('').map(Number);
    const checkDigit = digits[digits.length - 1];
    const multipliers = [71, 67, 59, 53, 47, 43, 41, 37, 29, 23, 19, 17, 13, 7, 3];
    
    let sum = 0;
    for (let i = 0; i < digits.length - 1; i++) {
      sum += digits[i] * multipliers[i];
    }
    
    const remainder = sum % 11;
    const calculatedCheck = remainder < 2 ? remainder : 11 - remainder;
    return calculatedCheck === checkDigit;
  };

  // Función para validar formato de teléfono colombiano
  const validatePhoneFormat = (phone) => {
    // Patrones válidos para Colombia
    const patterns = [
      /^3[0-9]{9}$/, // Celular (300-399)
      /^6[0-9]{9}$/, // Celular (600-699)
      /^[1-9][0-9]{6,9}$/, // Fijo
    ];
    
    return patterns.some(pattern => pattern.test(phone));
  };

  // Función para validar dominio de email
  const validateEmailDomain = (email) => {
    const validDomains = [
      'gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'live.com',
      'empresa.com', 'empresa.co', 'empresa.org', 'empresa.net',
      'gmail.co', 'hotmail.co', 'yahoo.co', 'outlook.co'
    ];
    
    const domain = email.split('@')[1];
    return validDomains.includes(domain?.toLowerCase());
  };

  // Función para validar dirección
  const validateAddress = (address) => {
    // Debe contener al menos una palabra con números (calle, carrera, etc.)
    const hasStreet = /\b(calle|carrera|avenida|av|diagonal|diag|transversal|trans|manzana|mz|barrio|br|sector|set|urbanizacion|urb|conjunto|cjto|edificio|edif|torre|torr|apartamento|apto|oficina|of|local|loc|piso|planta|pl)\b/i.test(address);
    const hasNumbers = /\d/.test(address);
    const hasValidChars = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s#\-.,]+$/.test(address);
    
    return hasStreet && hasNumbers && hasValidChars;
  };

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
            } else if (!validateCedula(value)) {
              newErrors.documentNumber = t("form.invalidCedula");
            } else {
              delete newErrors.documentNumber;
            }
          } else if (docType === 'NIT') {
            if (value.length < 9 || value.length > 15) {
              newErrors.documentNumber = t("form.nitLength");
            } else if (!validateNIT(value)) {
              newErrors.documentNumber = t("form.invalidNIT");
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
        } else if (value.trim().split(/\s+/).length > 3) {
          newErrors.firstName = t("form.nameTooManyWords");
        } else if (/(.)\1{2,}/.test(value)) {
          newErrors.firstName = t("form.nameNoRepeated");
        } else if (value.trim().length !== value.length) {
          newErrors.firstName = t("form.nameNoSpaces");
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
        } else if (value.trim().split(/\s+/).length > 3) {
          newErrors.lastName = t("form.nameTooManyWords");
        } else if (/(.)\1{2,}/.test(value)) {
          newErrors.lastName = t("form.nameNoRepeated");
        } else if (value.trim().length !== value.length) {
          newErrors.lastName = t("form.nameNoSpaces");
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
        } else if (!validatePhoneFormat(value)) {
          newErrors.phone = t("form.phoneFormat");
        } else if (value.startsWith('0')) {
          newErrors.phone = t("form.phoneNoZeroStart");
        } else if (/(\d)\1{4,}/.test(value)) {
          newErrors.phone = t("form.phoneNoRepeated");
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
        } else if (!validateEmailDomain(value)) {
          newErrors.email = t("form.invalidEmailDomain");
        } else if (value.includes('+') && !value.includes('+@')) {
          newErrors.email = t("form.invalidEmailPlus");
        } else if (/(.)\1{3,}/.test(value.split('@')[0])) {
          newErrors.email = t("form.emailNoRepeated");
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
        } else if (!validateAddress(value)) {
          newErrors.address = t("form.invalidAddressFormat");
        } else if (/(.)\1{4,}/.test(value)) {
          newErrors.address = t("form.addressNoRepeated");
        } else if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s#\-.,]+$/.test(value)) {
          newErrors.address = t("form.addressInvalidChars");
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
        } else if (value.includes('123') || value.includes('abc') || value.includes('qwe')) {
          newErrors.password = t("form.passwordSequential");
        } else if (/(.)\1{3,}/.test(value)) {
          newErrors.password = t("form.passwordNoRepeatedChars");
        } else if (value.length < 12 && !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/.test(value)) {
          newErrors.password = t("form.passwordWeak");
        } else {
          // Verificar contraseñas comunes
          const commonPasswords = ['password', '123456', '123456789', 'qwerty', 'abc123', 'password123', 'admin', 'letmein', 'welcome', 'login', 'master', 'hello'];
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
      // Limitar a 3 palabras máximo
      const words = processedValue.trim().split(/\s+/);
      if (words.length > 3) {
        processedValue = words.slice(0, 3).join(' ');
      }
    } else if (name === 'documentNumber' || name === 'phone') {
      // Solo números
      processedValue = value.replace(/\D/g, '');
      // Limitar longitud según el tipo
      if (name === 'documentNumber') {
        const maxLength = userData.documentType === 'NIT' ? 15 : 10;
        processedValue = processedValue.slice(0, maxLength);
      } else if (name === 'phone') {
        processedValue = processedValue.slice(0, 15);
      }
    } else if (name === 'email') {
      // Convertir a minúsculas y eliminar espacios
      processedValue = value.toLowerCase().trim();
      // Eliminar caracteres no válidos
      processedValue = processedValue.replace(/[^a-zA-Z0-9._%+-@]/g, '');
    } else if (name === 'address') {
      // Permitir letras, números, espacios y algunos caracteres especiales
      processedValue = value.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s#\-.,]/g, '');
      // Limitar longitud
      processedValue = processedValue.slice(0, 200);
    } else if (name === 'password') {
      // No procesar la contraseña para mantener caracteres especiales
      processedValue = value;
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

      // Validaciones adicionales del paso 1
      if (userData.firstName && userData.lastName && 
          userData.firstName.toLowerCase() === userData.lastName.toLowerCase()) {
        setErrors(prev => ({ ...prev, lastName: t("form.nameSameAsFirst") }));
        isValid = false;
      }
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

      // Validaciones adicionales del paso 2
      if (userData.email && userData.password && 
          userData.password.toLowerCase().includes(userData.email.split('@')[0].toLowerCase())) {
        setErrors(prev => ({ ...prev, password: t("form.passwordContainsEmail") }));
        isValid = false;
      }
    }

    if (step === 3) {
      // Validación final completa
      const allFields = ['rol', 'documentType', 'documentNumber', 'firstName', 'lastName', 'phone', 'actividad_economica', 'email', 'status', 'address', 'password'];
      
      allFields.forEach(field => {
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
    // Validación completa antes del envío
    if (!validateStep(3)) {
      Swal.fire({
        title: t("alerts.error"),
        text: t("alerts.validationErrors"),
        icon: "error",
        confirmButtonColor: "#d33",
      });
      return;
    }

    // Validaciones adicionales específicas
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

    // Verificar que no haya espacios en blanco al inicio o final
    const hasLeadingTrailingSpaces = Object.values(userData).some(value => 
      typeof value === 'string' && (value !== value.trim())
    );
    
    if (hasLeadingTrailingSpaces) {
      Swal.fire({
        title: t("alerts.error"),
        text: t("alerts.noLeadingTrailingSpaces"),
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
