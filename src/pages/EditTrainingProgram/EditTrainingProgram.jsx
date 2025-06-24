import React, { useState, useEffect } from 'react';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import BannerHome3 from '../../assets/images/BannerHome3.png';
import BannerHome4 from '../../assets/images/BannerHome4.png';
import BannerHome5 from '../../assets/images/BannerHome5.png';
import { FaGraduationCap } from "react-icons/fa";
import './css/editTrainingProgram.css';
import { Link } from 'react-router-dom';
import ButtonConfirm from '../../components/Buttons/ButtonConfirm/ButtonConfirm.jsx';


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
            <div className="program-header">
                    <FaGraduationCap className="icon-Training" />
                </div>
                    <h1 className="program-title">
                    Tecnólogo en Análisis y Desarrollo de Software
                    </h1>

                <div className="info-boxes">
                    <div className="info-box">
                    <input type="text" className="info-main"/>
                    <p className="info-label">Nivel</p>
                    </div>
                    <div className="info-box">
                    <input type="text" className="info-main"/>
                    <p className="info-label">Modalidad</p>
                    </div>
                    <div className="info-box">
                    <input type="text" className="info-main"/>
                    <p className="info-label">Jornada</p>
                    </div>
                </div>

                <div className="requirements">
                    <div className="requirement">
                    <h3>Nivel Académico</h3>
                    <input type="text" placeholder='Ingrese el nivel academico' />
                    </div>
                    <div className="requirement">
                    <h3>Documentación</h3>
                    <input type="text" placeholder='Ingrese la documentacion' />
                    </div>
                    <div className="requirement">
                    <h3>Proceso de Selección</h3>
                    <input type="text" placeholder='Ingrese el proceso ' />
                    </div>
                    <div className='Box-Button'>
                      <Link className='Button' to="/ViewTraining">
                        <ButtonConfirm />
                      </Link>
                  </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ViewTraining;
