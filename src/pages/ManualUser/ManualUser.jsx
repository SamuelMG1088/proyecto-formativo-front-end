import React, { useState, useEffect } from 'react';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import BannerHome9 from '../../assets/images/factorHumano7.jpg'
import BannerHome10 from '../../assets/images/factorHumano8.jpg'
import BannerUser from '../../assets/images/factorHumano9.jpg'
import { IoIosCheckbox } from "react-icons/io";
import factor1 from '../../assets/images/factorHumano1.jpg'
import { GiColombia } from "react-icons/gi";
import { Link } from 'react-router-dom';
import './css/Manualuser.css';
import { useTranslation } from 'react-i18next';
import { FaArrowLeftLong } from "react-icons/fa6";

const ManualUser = () => {
  const { t } = useTranslation();

  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [BannerHome9, BannerHome10, BannerUser];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 16000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div id="Homepage">
      <div className="home">
          <Gov />
          <HeaderIcons />

        {/* Carrusel */}
        <div className="home-carousel">
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

        <div className="home-content">
          <div className="home-sections">

            {/* SENA Colombia */}
            <section className="sena-colombia">
              <Link to="/" className='link_sena'>
                 <h3><FaArrowLeftLong /> Salir al login</h3>
              </Link>
              <div className="title-seccion-sena">
                <h1>Manual de usuarios</h1>
              </div>
              <div className="sena-content-section">
                <p>Prueba de manual de usuario</p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ManualUser;
