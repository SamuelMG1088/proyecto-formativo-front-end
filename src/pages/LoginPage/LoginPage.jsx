import React, { useState, useEffect } from "react";
import factor1 from '../../assets/images/factorHumano1.jpg'; 
import factor2 from '../../assets/images/factorHumano2.png'; 
import factor3 from '../../assets/images/factorHumano3.png';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import Gov from '../../layout/Gov/Gov.jsx';
import AccestDirect from "../../components/AccessDirect/AccestDirect.jsx";
import { BsEyeSlashFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import './css/loginPage.css';
import '../../styles/variables.css';

export const LoginPage = () => {
  // Estado para el carrusel
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [factor1, factor2, factor3]; // Array de imágenes para el carrusel

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500); // Cambia cada 3.5 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div id="LoginPage">
      <Gov/>
      <HeaderIcons/>
      <div className="LoginPage">
        <div className="frame">
          <h1>Iniciar Sesión</h1>
          <p className="P_Accede">Accede a tu cuenta con tu email y contraseña</p>
          <div className="input-box-email">
            <label htmlFor="">Correo electrónico</label>
            <input type="email"/>
          </div>
          <div className="input-box-email">
            <label htmlFor="">Contraseña</label>
            <input type="password"/>
            <BsEyeSlashFill className='icon'/>
          </div>

          <div className="remember-forgot">
            <label><input type="checkbox"/>Recordarme</label>
            <Link to="/old" className="OldMyPass">
              Olvide mi contraseña
            </Link>
          </div>

          <Link to="/home">
            <button className="Bottonlogin" type="submit">LOGIN</button>
          </Link>

          <AccestDirect/>
        </div>

        <div className="img-LoginPage">
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
};

export default LoginPage;