import React, { useState, useEffect } from 'react';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import diagnostic from '../../assets/images/BannerDiagnostico.png';
import banner2 from '../../assets/images/bannerHome2.jpg'; 
import banner3 from '../../assets/images/bannerHome3.png';
import { IoNewspaperOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import './css/businessDiagnosis.css';
import Swal from 'sweetalert2';

const BusinessDiagnosis = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [diagnostic, banner2, banner3]; // Array de imágenes para el carrusel

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500); // Cambia cada 3.5 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  const handleSweetAlert = () => {
    let timerInterval;
    Swal.fire({
    title: "Validando informacion!",
    html: "Estamos verificando y procesando tus datos... <br><b></b> segundos.",
    timer: 1500,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
      timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    }
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
    }
  });
  };

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
        
          <section className="info-diagnosis-section">
            <div className="content-diagnosis-section">
              <div className='box-camp'>
                <div className="container-profile-diagnosis">
                  <IoNewspaperOutline className='icon-diagnosis' />
                </div>
                <h1>Diagnóstico Empresarial</h1>
                <p>Este diagnostico tiene como objetivo evaluar el estado actual de la empresa y asi saber sus necesidades  </p>
                    <h2>Campo1</h2>
                    <input className ='Campo1'type="text" placeholder='Campo1' />

                    <h2>Campo2</h2>
                    <input className ='Campo2'type="text" placeholder='Campo2' />

                    <h2>Campo3</h2>
                    <input className ='Campo3'type="text" placeholder='Campo3' />

                    <h2>Campo4</h2>
                    <input className ='Campo4'type="text" placeholder='Campo4' />

                    <h2>Campo5</h2>
                    <input className ='Campo5'type="text" placeholder='Campo5' />

                    <h2>Campo6</h2>
                    <input className ='Campo6'type="text" placeholder='Campo6' />

                    <h2>Campo7</h2>
                    <input className ='Campo7'type="text" placeholder='Campo7' />
                    <Link to="/DiagnosisResult">
                      <button className='Button-send'  onClick={handleSweetAlert}>Enviar Diagnostico</button>
                    </Link>
              </div>
            </div>
          </section>
        </div>
    </div>
  );
}

export default BusinessDiagnosis;