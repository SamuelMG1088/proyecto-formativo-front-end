import React, { useState, useEffect } from 'react';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import './css/businessDiagnosis.css';
// Importa tus imágenes para el carrusel
import  diagnostic from '../../assets/images/BannerDiagnostico.png';
import banner2 from '../../assets/images/bannerHome2.jpg'; 
import banner3 from '../../assets/images/bannerHome3.png';

const BusinessDiagnosis = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [diagnostic, banner2, banner3]; // Array de imágenes para el carrusel

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500); // Cambia cada 3.5 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div id="BusinessDiagnosisPage">
      <div className="PageBusinessDiagnosis">
        <Gov />
        <HeaderIcons />
        <NavBar />
        
        {/* Carrusel agregado aquí */}
        <div className="diagnosis-carousel">
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
        
        <div className="img-header"></div>
          <section className="info-diagnosis-section">
            <div className="content-diagnosis-section">
              <h1>Diagnóstico Empresarial</h1>
              <p>Este diagnostico tiene como objetivo evaluar el estado actual de la empresa y asi saber sus necesidades  </p>
              <div className='box-camp'>
                <h2>Campo1</h2>
                <input className ='Campo1'type="text" placeholder='Campo1' />

                <h2>Campo2</h2>
                <input className ='Campo2'type="text" placeholder='Campo2' />

                <h2>Campo3</h2>
                <input className ='Campo3'type="text" placeholder='Campo3' />

                <h2>Campo4</h2>
                <input className ='Campo4'type="text" placeholder='Campo4' />
              </div>
            </div>
          </section>
        </div>
    </div>
  );
}

export default BusinessDiagnosis;