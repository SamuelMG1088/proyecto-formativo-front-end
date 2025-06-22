import React, { useState, useEffect } from 'react';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import AccestDirect from '../../components/AccessDirect/AccestDirect.jsx';
import Gov from '../../layout/Gov/Gov.jsx';
import { Link } from 'react-router-dom';
import { FaAngleLeft } from "react-icons/fa6";
import './css/oldPasswordPage.css';
import '../../styles/variables.css';
import factor1 from '../../assets/images/factorHumano1.jpg'; 
import factor2 from '../../assets/images/factorHumano2.png'; 
import factor3 from '../../assets/images/factorHumano3.png';

export const OldPasswordPage = () => {
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
    <div id="OldPasswrodPage">
      <Gov/>
      <HeaderIcons/>
      <div className="old-password">
        <div className="frame">
          <a href=""> <FaAngleLeft /><Link to="/">Ir a inicio de Sesión</Link></a>
          <h1>Olvidó su contraseña?</h1>
          <p className='descripcion' >No se preocupe, se le enviará un código de verificación a su correo electrónico, escríbalo acá</p>
          <div className="input-box-email">
            <label htmlFor="">Email</label>
            <input type="email"/>
          </div>

          <Link to="/verify">
            <button className="BottonOld" type="submit">ENVIAR</button>
          </Link>
          
          <AccestDirect/>
        </div>

        {/* Carrusel de imágenes */}
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
};

export default OldPasswordPage;