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
import '../Manuales/Manuales.css';
import { useTranslation } from 'react-i18next';
import { FaArrowLeftLong } from "react-icons/fa6";
import miImagen from "../../assets/images/prueba.jpg"

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
    <div id="Homepages">
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
              <Link to="/" className='link_senaa'>
                 <h> Volver al login</h>
              </Link>
              <Link to="/ManualOperaciones" className='link_sena'>
                 <h> Manual de operaciones</h>
              </Link>
              <Link to="/Manualinstalacion" className='link_sena'>
                 <h> Manual de instalacion</h>
              </Link>
            </section>
            <div className='sena-content-section'>
               <img src={miImagen} alt="Acceso denegado"  className='Prueba-imagen'/><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae necessitatibus ab doloribus saepe quisquam ipsum ratione quos officiis. Ducimus similique reprehenderit id maiores temporibus quo expedita asperiores officiis cum quae.</p>
            </div>


            <div className='sena-content-section1'>
              <p className='prueba-p'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae necessitatibus ab doloribus saepe quisquam ipsum ratione quos officiis. Ducimus similique reprehenderit id maiores temporibus quo expedita asperiores officiis cum quae.</p><img src={miImagen} alt="Acceso denegado"  className='Prueba-imagen1'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManualUser;
