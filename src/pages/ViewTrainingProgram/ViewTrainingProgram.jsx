import React, { useState, useEffect } from 'react';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import BannerHome3 from '../../assets/images/BannerHome3.png';
import BannerHome4 from '../../assets/images/BannerHome4.png';
import BannerHome5 from '../../assets/images/BannerHome5.png';
import { FaGraduationCap } from "react-icons/fa";
import './css/viewTrainingProgram.css';
import ButtonEdit from '../../components/Buttons/ButtonEdit/ButtonEdit.jsx';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';

const ViewTraining = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [BannerHome3, BannerHome4, BannerHome5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500); // Cambia cada 3.5 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div id="ViewtrainingPage">
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
          <div className="program-container">
            <NavLink to="/ListProgram" className="NavLink"><FaArrowLeftLong className='icon-arrow' />Volver a atrás</NavLink>
            <div className="program-header">
                    <FaGraduationCap className="icon-Training" />
                </div>
                    <h1 className="program-title">
                    Stephania Herrera Duque
                    </h1>

                <div className="info-boxes">
                    <div className="info-box">
                    <p className="info-main">Tecnólogo</p>
                    <p className="info-label">Nivel</p>
                    </div>
                    <div className="info-box">
                    <p className="info-main">Presencial</p>
                    <p className="info-label">Modalidad</p>
                    </div>
                    <div className="info-box">
                    <p className="info-main">Diurna</p>
                    <p className="info-label">Jornada</p>
                    </div>
                </div>

                <div className="requirements">
                    <div className="requirement">
                    <h3>Nivel Académico</h3>
                    <p>Auxiliar</p>
                    </div>
                    <div className="requirement">
                    <h3>Nombre del Programa</h3>
                    <p>Análisis y Desarrollo de Software</p>
                    </div>
                    <div className="requirement">
                    <h3>Areá del programa</h3>
                    <p>Tecnologías de la información</p>
                    </div>
                    <div className='Box-Button'>
                      <Link className='Button' to="/EditTraining">
                        <ButtonEdit />
                      </Link>
                  </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ViewTraining;
