import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap } from 'react-icons/fa';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import BannerHome3 from '../../assets/images/BannerHome3.png';
import BannerHome4 from '../../assets/images/BannerHome4.png';
import BannerHome5 from '../../assets/images/BannerHome5.png';
import ButtonConfirm from '../../components/Buttons/ButtonConfirm/ButtonConfirm.jsx';
import Swal from 'sweetalert2';
import './css/editProfile.css';


const EditProfile = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [BannerHome3, BannerHome4, BannerHome5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500); // Cambia cada 3.5 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  const mostrarAlerta = () => {
      Swal.fire({
        title: '¡Datos actualizados!',
        text: 'Tus datos han sido actualizados correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#00304d'
      });
    };

  return (
    <div id="EditProfilePage">
      <div className="PageEditProfile">
        <Gov />
        <HeaderIcons />
        <NavBar />
        
        {/* Carrusel agregado aquí */}
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
                    <h3>Tipo de documentode </h3>
                    <p>Cedula</p>
                    </div>
                    <div className="requirement">
                    <h3>Numero Telefonico</h3>
                    <p>323-5260410</p>
                    </div>
                    <div className="requirement">
                    <h3>Correo Electronico</h3>
                    <p>sthepaniherreraduque@gmail.com</p>
                    </div>
                    <div className="requirement">
                    <h3>Direccion</h3>
                    <p>Diagonal 25 Conjunto Residencial Cipress Casa 92</p>
                    </div>
                    <div className='Box-Button'>
                  </div>
            </div>
            <div className='Box-Button'>
              <Link className='Buttoon' to="/viewprofile" onClick={mostrarAlerta} >
                  <ButtonConfirm/>
              </Link>
              </div>
            </div>       
      </div>
    </div>
  );
}

export default EditProfile;