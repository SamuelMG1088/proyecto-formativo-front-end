import React, { useState, useEffect } from 'react';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import AccestDirect from '../../components/AccessDirect/AccestDirect.jsx';
import Gov from '../../layout/Gov/Gov.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { FaAngleLeft } from "react-icons/fa6";
import './css/oldPasswordPage.css';
import '../../styles/variables.css';
import factor1 from '../../assets/images/factorHumano1.jpg';
import factor2 from '../../assets/images/factorHumano2.png';
import factor3 from '../../assets/images/factorHumano3.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

export const OldPasswordPage = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const images = [factor1, factor2, factor3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSendCode = async () => {
    if (!email) {
      const isDarkMode = document.body.classList.contains("dark");

      Swal.fire({
        icon: "warning",
        title: t("oldPasswordPage.alerts.emptyEmail.title"),
        text: t("oldPasswordPage.alerts.emptyEmail.text"),
        confirmButtonText: t("general.accept"),
        background: isDarkMode ? "#1e1e1e" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
      });

      return;
    }

    if (!isValidEmail(email)) {
      const isDarkMode = document.body.classList.contains("dark");

      Swal.fire({
        icon: "warning",
        title: t("oldPasswordPage.alerts.invalidEmail.title"),
        text: t("oldPasswordPage.alerts.invalidEmail.text"),
        confirmButtonText: t("general.accept"),
        background: isDarkMode ? "#1e1e1e" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
      });

      return;
    }


    setLoading(true);

    try {
  const response = await axios.post(
    "http://localhost:3000/api/password-reset/forgot-password",
    { email }
  );
  const { code } = response.data;

  const isDarkMode = document.body.classList.contains("dark");

  if (code) {
    Swal.fire({
      title: t("oldPasswordPage.alerts.codeSent.title"),
      html: t("oldPasswordPage.alerts.codeSent.text", { code }),
      icon: "info",
      confirmButtonText: t("general.accept"),
      background: isDarkMode ? "#1e1e1e" : "#fff",
      color: isDarkMode ? "#fff" : "#000",
    }).then(() => {
      navigate("/verify", { state: { email } });
    });
  } else {
    Swal.fire({
      title: t("oldPasswordPage.alerts.success.title"),
      text: t("oldPasswordPage.alerts.success.text"),
      icon: "success",
      confirmButtonText: t("general.accept"),
      background: isDarkMode ? "#1e1e1e" : "#fff",
      color: isDarkMode ? "#fff" : "#000",
    }).then(() => {
      navigate("/verify", { state: { email } });
    });
  }
} catch (error) {
  const isDarkMode = document.body.classList.contains("dark");
  const msg =
    error?.response?.data?.message ||
    t("oldPasswordPage.alerts.error.text");

  Swal.fire({
    icon: "error",
    title: t("oldPasswordPage.alerts.apiError.title"),
    text: t("oldPasswordPage.alerts.apiError.text", { message: msg }),
    confirmButtonText: t("general.accept"),
    background: isDarkMode ? "#1e1e1e" : "#fff",
    color: isDarkMode ? "#fff" : "#000",
  });
}

     finally {
      setLoading(false);
    }
  };

  return (
    <div id="OldPasswrodPage">
      <Gov />
      <HeaderIcons />
      <div className="old-password">
        <div className="frame">
          <Link to="/" className="link-back">
            <FaAngleLeft /> {t('oldPasswordPage.backLink')}
          </Link>

          <h1>{t('oldPasswordPage.title')}</h1>
          <p className='descripcion'>
            {t('oldPasswordPage.description')}
          </p>

          <div className="input-box-email">
            <label htmlFor="email">{t('oldPasswordPage.emailLabel')}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('oldPasswordPage.emailPlaceholder')}
              disabled={loading}
            />
          </div>

          <button 
            className="BottonOld" 
            type="button" 
            onClick={handleSendCode} 
            disabled={loading}
          >
            {loading ? t('oldPasswordPage.sendingButton') : t('oldPasswordPage.sendButton')}
          </button>

          <AccestDirect />
        </div>

        {/* Carrusel */}
        <div className="img-old-password">
          <div className="carousel-container">
            {images.map((image, index) => (
              <div
                key={index}
                className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                style={{ backgroundImage: `url(${image})` }}
              />
            ))}
            <div className="carousel-dots">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OldPasswordPage;