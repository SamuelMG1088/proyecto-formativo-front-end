// LoginPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const images = [factor1, factor2, factor3];

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Mostrar u ocultar contraseña
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Manejo del login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos.",
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      } else {
        Swal.fire({
          icon: "error",
          title: "Credenciales incorrectas",
          text: "Correo o contraseña inválidos.",
        });
      }
    } catch (error) {
      const status = error.response?.status;
      let message = "Error al conectar con el servidor.";

      if (status === 401 || status === 404) {
        message = "Correo o contraseña inválidos.";
      }

      Swal.fire({
        icon: "error",
        title: "Acceso denegado",
        text: message,
      });
    }
  };

  return (
    <div id="LoginPage">
      <Gov />
      <HeaderIcons />
      <div className="LoginPage">
        <div className="frame">
          <h1>Iniciar Sesión</h1>
          <p className="P_Accede">Accede a tu cuenta con tu email y contraseña</p>

          <form onSubmit={handleLogin}>
            <div className="input-box-email">
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                type="email"
                value={email}
                placeholder="Ingrese su correo electrónico"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-box-email">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Ingrese su contraseña"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {showPassword ? (
                <BsEyeFill className="icon" onClick={togglePasswordVisibility} />
              ) : (
                <BsEyeSlashFill className="icon" onClick={togglePasswordVisibility} />
              )}
            </div>

            <div className="remember-forgot">
              <label>
                <input type="checkbox" /> Recordarme
              </label>
              <Link to="/old" className="OldMyPass">
                Olvidé mi contraseña
              </Link>
            </div>

            <button className="Bottonlogin" type="submit">
              LOGIN
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
