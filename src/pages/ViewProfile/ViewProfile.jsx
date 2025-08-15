import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import BannerHome3 from '../../assets/banners/BannerHome2.png';
import BannerHome4 from '../../assets/banners/BannerHome9.png';
import BannerHome5 from '../../assets/banners/BannerHome13.png';
import { FaGraduationCap, FaIdCard } from "react-icons/fa";
import ButtonEdit from '../../components/Buttons/ButtonEdit/ButtonEdit.jsx';
import { Link } from 'react-router-dom';
import './css/viewProfile.css';
import { useAuth } from '../../contexts/AuthContext/AuthContext.jsx';

const ViewProfile = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [BannerHome3, BannerHome4, BannerHome5];
  const { user } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(interval);
  }, [images.length]);

  // Extracción de datos con posibles nombres alternativos
  const nombre = user?.nombre || user?.name || t('viewProfile.defaultValues.name');
  const estado = user?.estado || user?.status || t('viewProfile.defaultValues.status');
  const tipoDocumento = user?.tipoDocumento || user?.documentType || user?.tipo_documento || t('viewProfile.defaultValues.documentType');
  const telefono = user?.telefono || user?.phone || user?.telephone || t('viewProfile.defaultValues.phone');
  const direccion = user?.direccion || user?.address || t('viewProfile.defaultValues.address');

  return (
    <div id="viewProfile">
      <div className="PageViewtraining">
        <Gov />
        <HeaderIcons />
        <NavBar />
        
        {/* Carrusel */}
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
        
        {/* Contenedor del perfil */}
        <div className="profile-container">
          <div className="profile-header">
            <FaGraduationCap className="icon-Training" />
          </div>
          
          <h1 className="profile-title">
            {nombre}
          </h1>

          <div className="info-boxes">
            <div className="info-box">
              <p className="info-main">{t('viewProfile.status')}</p>
              <p className="info-label">{estado}</p>
            </div>
          </div>

          <div className="requirements">
            <div className="requirement">
              <div>
                <h3>{t('viewProfile.documentType')}</h3>
                <p>{tipoDocumento}</p>
              </div>
            </div>
            <div className="requirement">
              <h3>{t('viewProfile.phoneNumber')}</h3>
              <p>{telefono}</p>
            </div>
            <div className="requirement">
              <h3>{t('viewProfile.address')}</h3>
              <p>{direccion}</p>
            </div>
            <div className='Box-Button'>
              <Link className='Button' to="/Editprofile">
                <ButtonEdit text={t('viewProfile.editProfile')} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;