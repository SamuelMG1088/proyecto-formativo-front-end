import React, { useState, useEffect } from 'react';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import BannerHome3 from '../../assets/images/BannerHome3.png';
import BannerHome4 from '../../assets/images/BannerHome4.png';
import BannerHome5 from '../../assets/images/BannerHome5.png';
import FactorHumano5 from '../../assets/images/factorHumano5.png'
import FactorHumano6 from '../../assets/images/factorHumano6.jpg'
import { FaUserEdit } from "react-icons/fa";
import './css/ViewProfile.css';

const ViewProfile = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [BannerHome3, BannerHome4, BannerHome5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div id="ViewProfile">
      <div className="PageProfile">
        <Gov />
        <HeaderIcons />

        <div className="img-header"></div>

          <div className="profile-content">

            {/* Carrusel sobre img-header */}
            <div className="profile-carousel">
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
                
            <section className="info-profile-section">
              <div className="content-profile-section">
                <img src={FactorHumano5} alt=""/>
                <div className="box-text-profile">
                  <h2>Perfil de Usuario</h2>
                  <p>En esta sección podrás ver y editar tu perfil de usuario. Asegúrate de que toda la información 
                  esté actualizada para mejorar tu experiencia en la plataforma.</p>
                </div>
              </div>
            </section>

            <div className="section-form">

              <div className="left-form-box">

                <div className="profile-picture-box">
                  <img src={FactorHumano6} alt="" />
                  <h2>Stephania Duque</h2>
                  <h3>Rol: <span>ADMIN</span></h3>
                </div>

                <div className="description-profile">
                  <h3>Descripción</h3>
                  <ul>
                    <li>Soy una persona apasionada por la tecnología y la innovación.</li>
                    <li>Me gusta aprender cosas nuevas y enfrentar desafíos.</li>
                    <li>Disfruto trabajar en equipo y colaborar con otros.</li>
                    <li>Me interesa el desarrollo de software y la inteligencia artificial.</li>
                  </ul>
                </div>

              </div>

              <div className="right-form-box">
                <div className="title-form">
                  <h2><FaUserEdit />Infomacion Personal</h2>
                  <p>Detalles de contacto y ubicación del administrador</p> 
                </div>

                <form action="">
                  
                </form>
              </div>

            </div>

          </div>

      </div>
    </div>
  );
}

export default ViewProfile;