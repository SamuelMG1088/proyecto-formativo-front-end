import React, { useState, useEffect } from 'react';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import './css/Home.css';
import HomeBanner1 from '../../assets/images/bannerHome1.jpg'
// import HomeBanner2 from '../../assets/images/bannerHome2.jpg'

const Home = () => {
  // Estado para el carrusel
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [HomeBanner1]; // Array de imágenes para el carrusel

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500); // Cambia cada 3.5 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div id="Homepage">
      <div className="home">
        <Gov />
        <HeaderIcons />
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
            <h1>Hola</h1>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;