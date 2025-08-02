import React, { useState, useEffect } from 'react';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import BannerHome3 from '../../assets/banners/BannerHome2.png';
import BannerHome4 from '../../assets/banners/BannerHome9.png';
import BannerHome5 from '../../assets/banners/BannerHome13.png';
import { FaGraduationCap } from "react-icons/fa";
import ButtonEdit from '../../components/Buttons/ButtonEdit/ButtonEdit.jsx';
import { Link } from 'react-router-dom';
import './css/viewProfile.css';


const ViewCompany = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [BannerHome3, BannerHome4, BannerHome5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500); // Cambia cada 3.5 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div id="ViewProfile">
      <div className="PageViewtraining">
        <Gov />
        <HeaderIcons />
        <NavBar />
        
        {/* Carrusel agregado aquí */}
        <div className="training-carousel">
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
          <div className="profile-container">
            <div className="profile-header">
                    <FaGraduationCap className="icon-Training" />
                </div>
                    <h1 className="profile-title">
                    Stephania Herrera Duque
                    </h1>

                <div className="info-boxes">
                    <div className="info-box">
                    <p className="info-main">Estado</p>
                    <p className="info-label">Activo</p>
                    </div>
                    <div className="info-box">
                    <p className="info-main">Rol</p>
                    <p className="info-label">Admin</p>
                    </div>
                    {/* <div className="info-box">
                    <p className="info-main">Diurna</p>
                    <p className="info-label">Jornada</p>
                    </div> */}
                </div>

                <div className="requirements">
                    <div className="requirement">
                    <h3>Tipo de documento </h3>
                    <p>Cedula</p>
                    </div>
                    <div className="requirement">
                    <h3>Número telefónico</h3>
                    <p>323-5260410</p>
                    </div>
                    <div className="requirement">
                    <h3>Correo Electrónico</h3>
                    <p>Niaduque78@gmail.com</p>
                    </div>
                    <div className="requirement">
                    <h3>Dirección</h3>
                    <p>Diagonal 25 Conjunto Residencial Cipress Casa 92</p>
                    </div>
                    <div className='Box-Button'>
                      <Link className='Button' to="/Editprofile">
                        <ButtonEdit />
                      </Link>
                  </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCompany;
