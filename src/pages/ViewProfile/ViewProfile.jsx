
import React, { useState, useEffect } from 'react';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import BannerHome3 from '../../assets/images/BannerHome3.png';
import BannerHome4 from '../../assets/images/BannerHome4.png';
import BannerHome5 from '../../assets/images/BannerHome5.png';
import FactorHumano5 from '../../assets/images/factorHumano5.png'
import FactorHumano6 from '../../assets/icons/icon-profile.png'
import { FaUserEdit } from "react-icons/fa";
import './css/viewProfile.css';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import ButtonEdit from '../../components/Buttons/ButtonEdit/ButtonEdit.jsx';
import { Link } from 'react-router-dom';



const ViewProfile = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [BannerHome3, BannerHome4, BannerHome5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div id="ViewProfile">
      <div className="PageProfile">
        <Gov />
        <HeaderIcons />
        <NavBar />

          <div className="profile-content">
            {/* Carrusel sobre img-header */}
            <div className="profile-carousel">
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
                
            <section className="info-profile-section">
              <div className="content-profile-section">
                <img src={FactorHumano5} alt=""/>
                <div className="box-text-profile">
                  <h2>Perfil de Usuario</h2>
                  <p>En esta sección podrás ver y editar tu perfil de usuario. Asegúrate de que toda la información 
                  esté actualizada para mejorar tu experiencia en la plataforma.</p>
                </div>
              </div>
            </section>

            <div className="section-form">

              <div className="left-form-box">

                <div className="profile-picture-box">
                  <img src={FactorHumano6} alt="" />
                  <h2>Stephania Duque</h2>
                  <h3>Rol: <span>ADMIN</span></h3>
                  <h3>Estado: <span>Activo</span></h3>
                </div>



              </div>

              <div className="right-form-box">
                <div className="title-form">
                  <h2><FaUserEdit />Infomacion Personal</h2>
                  <p>Detalles de contacto y ubicación del administrador</p> 
                </div>

                <form action="">
                  <div className='Box-inputs'>
                    <div className="box-input-left">
                      <h2>Tipo de documento</h2>
                        <h4 className='type-document'>T.I</h4>
                        <h2>Nombre</h2>
                        <h4 className='name' type="text" >Stephania</h4>

                        <h2>Telefono</h2>
                        <h4 className='phone' type="text" >3147539505</h4>

                    </div>
                    <div className="Box-input-right">
                        <h2>Numero de documento de identidad</h2>
                        <h4 className='Num-document' type="text">1085816708</h4>                                           
                        <h2>Apellido</h2>
                        <h4 className='lastname' type="text">Herrera</h4>
                        <h2>Correo electronico</h2>
                        <h4 className='email' type="text">niaduque78@gmail.com</h4>
                    </div>
                  </div>
                </form>
                <h2 className='Text-h2'>Direccion</h2>
                <h4 className='address'  type="text">Dg. 27a #4-2 a 4-114, Dosquebradas, Risaralda</h4>
                <div className='Box-Buttoon'>
                  <Link className='Buttoon' to="/editProfile">
                    <ButtonEdit />
                  </Link>
                </div>
              </div>
            </div>  
          </div>
      </div>
    </div>
  );
}

export default ViewProfile;