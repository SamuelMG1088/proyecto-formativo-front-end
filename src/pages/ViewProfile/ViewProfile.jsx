// src/pages/ViewProfile/ViewProfile.jsx
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";

// Layouts
import Gov from "../../layout/Gov/Gov.jsx";
import HeaderIcons from "../../layout/HeaderIcons/HeaderIcons.jsx";
import NavBar from "../../layout/NavBar/NavBar.jsx";

// Assets
import BannerHome3 from "../../assets/banners/BannerHome2.png";
import BannerHome4 from "../../assets/banners/BannerHome9.png";
import BannerHome5 from "../../assets/banners/BannerHome13.png";

// Components
import ButtonEdit from "../../components/Buttons/ButtonEdit/ButtonEdit.jsx";

// Context & Theme
import { useAuth } from "../../contexts/AuthContext/AuthContext.jsx";
import { useTheme } from "../../theme/useTheme.jsx";

// Styles
import "./css/viewProfile.css";

const ViewProfile = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

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

  // ⏳ Mientras el AuthContext carga
  if (authLoading) {
    return (
      <div id="viewProfile">
        <Gov />
        <HeaderIcons />
        <NavBar />
        <div className="loading-container">
          <p>{t("viewProfile.loading")}</p>
        </div>
      </div>
    );
  }

  // 🚫 Si no está autenticado
  if (!isAuthenticated) {
    return (
      <div id="viewProfile">
        <Gov />
        <HeaderIcons />
        <NavBar />
        <div className="not-authenticated">
          <p>{t("viewProfile.notAuthenticated")}</p>
          <Link to="/login">{t("viewProfile.goToLogin")}</Link>
        </div>
      </div>
    );
  }

  // ✅ Datos del usuario (con fallback si algún dato no existe)
  const nombre =
    user?.nombre || user?.name || t("viewProfile.defaultValues.name");

  const estado =
    user?.estado || user?.status || t("viewProfile.defaultValues.status");

  const tipoDocumento =
    user?.tipoDocumento ||
    user?.documentType ||
    user?.tipo_documento ||
    t("viewProfile.defaultValues.documentType");

  const telefono =
    user?.telefono ||
    user?.phone ||
    user?.telephone ||
    t("viewProfile.defaultValues.phone");

  const direccion =
    user?.direccion || user?.address || t("viewProfile.defaultValues.address");

  const email =
    user?.email ||
    user?.correo ||
    user?.emailAddress ||
    t("viewProfile.defaultValues.email");

  // ===========================
  // 📄 Render
  // ===========================
  return (
    <div id="viewProfile">
      <div className="PageViewtraining">
        <Gov />
        <HeaderIcons />
        <NavBar />

        {/* 🎞 Carrusel */}
        <div className="training-carousel">
          <div className="carousel-container">
            {images.map((image, index) => (
              <div
                key={index}
                className={`carousel-slide ${
                  index === currentSlide ? "active" : ""
                }`}
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

          {/* Nombre */}
          <h1 className={`profile-title ${isDark ? "backend-dark" : ""}`}>
            {nombre}
          </h1>

          {/* Estado */}
          <div className="info-boxes">
            <div className="info-box">
              <p className="info-main">{t("viewProfile.status")}</p>
              <p className={`info-label ${isDark ? "backend-dark" : ""}`}>
                {estado}
              </p>
            </div>
          </div>

          {/* Datos */}
          <div className="requirements">
            <div className="requirement">
              <h3>{t("viewProfile.documentType")}</h3>
              <p className={`${isDark ? "backend-dark" : ""}`}>
                {tipoDocumento}
              </p>
            </div>

            <div className="requirement">
              <h3>{t("viewProfile.email")}</h3>
              <p className={`${isDark ? "backend-dark" : ""}`}>{email}</p>
            </div>

            <div className="requirement">
              <h3>{t("viewProfile.phoneNumber")}</h3>
              <p className={`${isDark ? "backend-dark" : ""}`}>{telefono}</p>
            </div>

            <div className="requirement">
              <h3>{t("viewProfile.address")}</h3>
              <p className={`${isDark ? "backend-dark" : ""}`}>{direccion}</p>
            </div>

            {/* Botón Editar */}
            <div className="Box-Button">
              <Link className="Button" to="/Editprofile">
                <ButtonEdit text={t("viewProfile.editProfile")} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
