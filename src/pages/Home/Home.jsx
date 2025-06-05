import React, { useState, useEffect } from 'react';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import BannerHome2 from '../../assets/images/BanneerHome2.png';
import BannerHome3 from '../../assets/images/BannerHome3.png';
import BannerHome4 from '../../assets/images/BannerHome4.png';
import BannerHome5 from '../../assets/images/BannerHome5.png';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import BannerActualizar from '../../assets/images/BannerActualizar.png';
import { IoIosCheckbox } from "react-icons/io";
import factor1 from '../../assets/images/factorHumano1.jpg'
import { GiColombia } from "react-icons/gi";
import './css/Home.css';

const Home = () => {
  // Estado para el carrusel
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [BannerActualizar, BannerHome2, BannerHome3, BannerHome4, BannerHome5]; // Array de imágenes para el carrusel

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
        <NavBar />

        {/* // Carrusel */}
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

            {/* SEccion de SENA Colombia */}
            <section className="sena-colombia">
              <div className="title-seccion-sena">
                <GiColombia className='icon-map'/>
                <h1>SENA es Colombia</h1>
              </div>
              <div className="sena-content-section">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/k5rZk-qC0JM?si=Iu-h8RfFA4Hynll-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                <p>Este video <span>"SENA es Colombia"</span> es una producción oficial del Servicio Nacional de Aprendizaje 
                <span>(SENA)</span>, una entidad pública colombiana adscrita al Ministerio del Trabajo. Este video tiene como 
                objetivo destacar el papel fundamental del <span>SENA</span> en el desarrollo social y económico del país, resaltando 
                su compromiso con la formación profesional integral y la empleabilidad de los colombianos.vr
                <br /> <br /> En la producción se presentan testimonios de aprendices, instructores y empresarios que han sido beneficiados por los 
                programas del <span>SENA</span>, mostrando cómo la institución contribuye al crecimiento personal y profesional de millones de 
                ciudadanos. Además, se enfatiza la presencia del <span>SENA</span> en todo el territorio nacional, su enfoque en la innovación 
                tecnológica y su papel en la promoción del emprendimiento.</p>
              </div>
            </section>

            {/* Seccion de Sistema de Gestion Empresarial de Encuestas */}
            <section className="section-sistema-gestion" >
              <div className="info-sisgeec">

                <h2>Sistema de Gestion Empresarial de Encuestas</h2>
                <h3>Nuestro aplicativo esta hecho  para subsanar necesidades al momento de contratar  aprendices</h3>

                <h4><IoIosCheckbox className='icon-checkbox' />Proceso Eficiente en contratacion </h4>
                <p>Con el diagnostico empresarial se va a tener encuenta lo que requiera la empresa</p>
                
                <h4><IoIosCheckbox className='icon-checkbox' />Visualizar a los aprendices</h4>
                <p>Se podra visualizar los aprendices antes de contratarlos y ver el programa de formacion</p>

                <h4><IoIosCheckbox className='icon-checkbox' />Resultado de diagnostico </h4>
                <p>Los resultados del diagnostico se verán reflejados en determinado tiempo para la contratacion de aprendiz</p>

              </div>

              <img src={factor1} alt=""/>

            </section>

            <section className="section-completed-diagnosis">
              <div className="content-diagnosis">
                <h3>Quieres saber que necesitas?</h3>
                <p>Completa nuestro diagnostico para asi saber que aprendiz elegir.</p>
                <button className='btn-completar' >COMPLETAR</button>
              </div>
            </section>

          </div>
        </div>

      </div>
      {/* <Navbar /> */}
    </div>
  );
}

export default Home;