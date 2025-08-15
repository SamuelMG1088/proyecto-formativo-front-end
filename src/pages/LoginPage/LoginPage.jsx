import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext/AuthContext.jsx";
import { useTranslation } from 'react-i18next';
import Swal from "sweetalert2";

import factor1 from "../../assets/images/factorHumano1.jpg";
import factor2 from "../../assets/images/factorHumano2.png";
import factor3 from "../../assets/images/factorHumano3.png";

import HeaderIcons from "../../layout/HeaderIcons/HeaderIcons.jsx";
import Gov from "../../layout/Gov/Gov.jsx";
import AccestDirect from "../../components/AccessDirect/AccestDirect.jsx";

import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";

import "./css/loginPage.css";
import "../../styles/variables.css";

export const LoginPage = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const images = [factor1, factor2, factor3];

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: t('loginPage.alerts.incompleteFields.title'),
        text: t('loginPage.alerts.incompleteFields.text'),
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email: email.trim(),
        password: password.trim(),
      });

      if (response?.status === 200 && response?.data?.token) {
        localStorage.setItem("authToken", response.data.token);
        
        if (response.data.user) {
          login(response.data.user);
          
          Swal.fire({
            icon: "success",
            title: t('loginPage.alerts.welcome.title', { name: response.data.user.nombre || '' }),
            text: t('loginPage.alerts.welcome.text'),
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            navigate("/home");
          });
        }
      } else {
        throw new Error("Unexpected server response");
      }
    } catch (error) {
      console.error("Login error:", error);
      handleLoginError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginError = (error) => {
    const status = error.response?.status;
    let messageKey;

    if (status === 401 || status === 404) {
      messageKey = 'loginPage.alerts.errors.invalidCredentials';
    } else if (status === 403) {
      messageKey = 'loginPage.alerts.errors.disabledAccount';
    } else if (status === 500) {
      messageKey = 'loginPage.alerts.errors.serverError';
    } else if (error.message === "Network Error") {
      messageKey = 'loginPage.alerts.errors.networkError';
    } else {
      messageKey = 'loginPage.alerts.errors.genericError';
    }

    Swal.fire({
      icon: "error",
      title: t('loginPage.alerts.denied.title'),
      text: t('loginPage.alerts.denied.text', { message: t(messageKey) }),
    });
  };

  return (
    <div id="LoginPage">
      <Gov />
      <HeaderIcons />
      <div className="LoginPage">
        <div className="frame">
          <h1>{t('loginPage.title')}</h1>
          <p className="P_Accede">{t('loginPage.subtitle')}</p>

          <form onSubmit={handleLogin}>
            <div className="input-box-email">
              <label htmlFor="email">{t('loginPage.emailLabel')}</label>
              <input
                id="email"
                type="email"
                value={email}
                placeholder={t('loginPage.emailPlaceholder')}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
              />
            </div>

            <div className="input-box-email">
              <label htmlFor="password">{t('loginPage.passwordLabel')}</label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder={t('loginPage.passwordPlaceholder')}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              {showPassword ? (
                <BsEyeFill 
                  className="icon" 
                  onClick={togglePasswordVisibility} 
                  title={t('loginPage.passwordVisibility.hide')}
                />
              ) : (
                <BsEyeSlashFill 
                  className="icon" 
                  onClick={togglePasswordVisibility} 
                  title={t('loginPage.passwordVisibility.show')}
                />
              )}
            </div>

            <div className="remember-forgot">
              <label>
                <input type="checkbox" /> {t('loginPage.rememberMe')}
              </label>
              <Link to="/old" className="OldMyPass">
                {t('loginPage.forgotPassword')}
              </Link>
            </div>

            <button 
              className="Bottonlogin" 
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner"></span>
              ) : (
                t('loginPage.loginButton')
              )}
            </button>
          </form>

          <AccestDirect />
        </div>

        <div className="img-LoginPage">
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
      </div>
    </div>
  );
};

export default LoginPage;