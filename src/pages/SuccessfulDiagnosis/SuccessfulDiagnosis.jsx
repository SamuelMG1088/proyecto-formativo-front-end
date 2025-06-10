import React, { useState, useEffect } from 'react';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import './css/successfulDiagnosis.css';
import { MdOutlineSecurity } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { Link } from 'react-router-dom';

// Importa tus imágenes para el carrusel
import diagnostic from '../../assets/images/BannerDiagnostico.png';
import banner2 from '../../assets/images/bannerHome2.jpg'; 
import banner3 from '../../assets/images/bannerHome3.png';

const successfulDiagnosis = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [diagnostic, banner2, banner3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div id="BusinessDiagnosisPage">
      <div className="PageBusinessDiagnosis">
        <Gov />
        <HeaderIcons />
        <NavBar />

        {/* Carrusel */}
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
          
            <section className='info-successfull-section'>
                <div className='content-successfull-section'>
                    <Link to="/businessdiagnosis" className='link-back-diagnosis'>
                    <h2 className='back-h2'> <IoArrowBack /> volver al diagnostico</h2>
                    </Link>

                    <div className='box-successfull'>
                        <div className='box-icon-successfull'>
                        <MdOutlineSecurity className='icon-successfull' />
                        </div>
                        <h1>!Diagnostico Exítoso!</h1>
                        <p>Tu diagnostico fue enviado correctamente</p>
                        <Link to="/DiagnosisResult">
                        <button className='Button-view'>Ver resultado</button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    </div>
  );
};

export default successfulDiagnosis;
