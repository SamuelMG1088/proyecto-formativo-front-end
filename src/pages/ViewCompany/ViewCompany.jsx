import React, { useState, useEffect } from 'react';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import BannerHome3 from '../../assets/images/BannerHome3.png';
import BannerHome4 from '../../assets/images/BannerHome4.png';
import BannerHome5 from '../../assets/images/BannerHome5.png';
import { LuGraduationCap } from "react-icons/lu";
import './css/viewCompany.css';


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
    <div id="ViewCompanyPage">
      <div className="PageViewCompany">
        <Gov />
        <HeaderIcons />
        <NavBar />
        
        {/* Carrusel agregado aquí */}
        <div className="company-carousel">
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

        <section className="view-company-section">
          <div className="container-profile-company">
            <LuGraduationCap className='icon-company' />
          </div>
          <div className="container-info-company">
            <h2>EcoVerde Ltda.</h2>
            <span>Agricultura</span>
            <p>Productos orgánicos y sustentables para un futuro mas verde.</p>
          </div>

          <div className="box-imputs">
            <div className="box-imputs-left">

              <h3>Tipo de documento</h3>
              <select name="" id="">
                <option value="">C.C</option>
                <option value="">NIT</option>
                <option value="">C.E</option>
              </select>

              <h3>Nombre</h3>
              <input type="text" />

              <h3>Numero Telefonico</h3>
              <input type="text" />


            </div>

            <div className="box-imputs-right">

              <h3>Numero de documento</h3>
              <input type="number"/>

              <h3>Apellido</h3>
              <input type="text"/>

              <h3>Correo Electronico</h3>
              <input type="email"/>

            </div>


          </div>
          
          <div className="input-addres">
            <h3>Direccion</h3>
            <input type="text" name="" id="" />
          </div>

        </section>
        

      </div>
    </div>
  );
}

export default ViewCompany;