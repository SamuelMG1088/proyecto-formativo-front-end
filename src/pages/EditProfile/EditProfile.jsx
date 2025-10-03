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
import { useTranslation } from "react-i18next"; // 🔹 Importar i18n
import "../../styles/validation.css";
import "./css/editProfile.css";

const EditProfile = () => {
  const { t } = useTranslation(); // 🔹 Hook de traducción
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

    if ((fieldName === "telefono" || fieldName === "email") && (!value || value.trim() === "")) {
      return t("form.requiredField");
    }

    switch (fieldName) {
      case "telefono":
        if (value && value.trim() !== "") {
          const phoneValidation = validatePhone(value);
          if (!phoneValidation.isValid) error = t(phoneValidation.error);
        }
        break;
      case "email":
        if (value && value.trim() !== "") {
          const emailValidation = validateEmail(value);
          if (!emailValidation.isValid) error = t(emailValidation.error);
        }
        break;
      case "direccion":
        if (value && value.trim() !== "") {
          const addressValidation = validateAddress(value);
          if (!addressValidation.isValid) error = t(addressValidation.error);
        }
        break;
      case "password":
        if (value && value.trim() !== "") {
          const passwordValidation = validatePassword(value, user);
          if (!passwordValidation.isValid) error = t(passwordValidation.error);
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

    if (!formData.telefono || formData.telefono.trim() === "") {
      newErrors.telefono = t("form.requiredPhone");
      isValid = false;
    } else {
      const phoneError = validateField("telefono", formData.telefono);
      if (phoneError) {
        newErrors.telefono = phoneError;
        isValid = false;
      }
    }

    if (!formData.email || formData.email.trim() === "") {
      newErrors.email = t("form.requiredEmail");
      isValid = false;
    } else {
      const emailError = validateField("email", formData.email);
      if (emailError) {
        newErrors.email = emailError;
        isValid = false;
      }
    }

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
    );
  };

  const handleSave = async () => {
    if (isSubmitting) return;

    if (!hasChanges()) {
      Swal.fire({
        title: t("swal.noChangesTitle"),
        text: t("swal.noChangesText"),
        icon: "info",
        confirmButtonText: t("swal.ok"),
        confirmButtonColor: "#3085d6",
        background: document.body.classList.contains("dark") ? "#1e1e1e" : "#fff",
        color: document.body.classList.contains("dark") ? "#fff" : "#000",
      });
      return;
    }

    setIsSubmitting(true);

    if (!validateForm()) {
      Swal.fire({
        title: t("swal.validationErrorTitle"),
        text: t("swal.validationErrorText"),
        icon: "error",
        confirmButtonText: t("swal.ok"),
        confirmButtonColor: "#d33",
        background: document.body.classList.contains("dark") ? "#1e1e1e" : "#fff",
        color: document.body.classList.contains("dark") ? "#fff" : "#000",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const dataToSend = { 
        telefono: formData.telefono.trim(),
        email: formData.email.trim(),
        direccion: formData.direccion.trim(),
      };
      if (formData.password && formData.password.trim() !== "") {
        dataToSend.password = formData.password.trim();
      }

      const result = await updateUser(dataToSend);

      if (result.success) {
        await Swal.fire({
          title: t("swal.successTitle"),
          text: result.message || t("swal.successText"),
          icon: "success",
          confirmButtonText: t("swal.ok"),
          confirmButtonColor: "#39a900",
          background: document.body.classList.contains("dark") ? "#1e1e1e" : "#fff",
          color: document.body.classList.contains("dark") ? "#fff" : "#000",
        });
        navigate("/viewprofile");
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      Swal.fire({
        title: t("swal.errorTitle"),
        text: error.message || t("swal.errorText"),
        icon: "error",
        confirmButtonText: t("swal.ok"),
        confirmButtonColor: "#d33",
        background: document.body.classList.contains("dark") ? "#1e1e1e" : "#fff",
        color: document.body.classList.contains("dark") ? "#fff" : "#000",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasErrors = () => Object.values(errors).some(error => error !== "");

  return (
    <div id="EditProfilePage">
      <div className="PageEditProfile">
        <Gov />
        <HeaderIcons />
        <NavBar />

        {/* Carrusel */}
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

        {/* Perfil */}
        <div className="profile-container">
          <div className="profile-header">
            <FaGraduationCap className="icon-Training" />
          </div>
          <h1 className="profile-title">{user?.nombre || t("profile.user")}</h1>

          <div className="info-boxes">
            <div className="info-box">
              <p className="info-main">{t("profile.status")}</p>
              <p className="info-label">{user?.estado || t("profile.active")}</p>
            </div>
          </div>

          {hasErrors() && (
            <div className="global-error-alert">
              ⚠️ {t("form.correctErrors")}
            </div>
          )}

          <div className="requirements">
            <div className="requirement">
              <h3>{t("form.documentType")}</h3>
              <select 
                name="tipoDocumento"
                value={formData.tipoDocumento}
                onChange={handleChange}
                disabled={true}
                title={t("form.documentTypeDisabled")}
              >
                <option value="CC">{t("form.cc")}</option>
                <option value="NIT">{t("form.nit")}</option>
                <option value="CE">{t("form.ce")}</option>
              </select>
              <p className="field-disabled-note"> {t("form.documentTypeDisabled")}</p>
            </div>

            <div className="requirement">
              <h3>{t("form.phone")} *</h3>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={t("form.phonePlaceholder")}
                className={errors.telefono ? "error-input" : ""}
                disabled={isSubmitting}
              />
              {errors.telefono && <span className="error-message"> {errors.telefono}</span>}
            </div>

            <div className="requirement">
              <h3>{t("form.email")} *</h3>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={t("form.emailPlaceholder")}
                className={errors.email ? "error-input" : ""}
                disabled={isSubmitting}
              />
              {errors.email && <span className="error-message"> {errors.email}</span>}
            </div>

            <div className="requirement">
              <h3>{t("form.address")} *</h3>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={t("form.addressPlaceholder")}
                className={errors.direccion ? "error-input" : ""}
                disabled={isSubmitting}
              />
              {errors.direccion && <span className="error-message"> {errors.direccion}</span>}
            </div>

            <div className="requirement">
              <h3>{t("form.password")} <span className="optional-text">({t("form.optional")})</span></h3>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={t("form.passwordPlaceholder")}
                className={errors.password ? "error-input" : ""}
                disabled={isSubmitting}
              />
              {errors.password && <span className="error-message">❌ {errors.password}</span>}
              <p className="field-info-note"> {t("form.passwordInfo")}</p>
            </div>
          </div>

          <div className="Box-Button">
            <div className="Button" onClick={isSubmitting ? null : handleSave}>
              <ButtonConfirm disabled={isSubmitting || hasErrors()} />
              {isSubmitting && <span className="loading-text">{t("form.saving")}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
