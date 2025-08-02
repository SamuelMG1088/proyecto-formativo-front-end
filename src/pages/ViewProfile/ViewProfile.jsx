import React, { useState, useEffect } from 'react';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import BannerHome3 from '../../assets/banners/BannerHome3.png';
import BannerHome4 from '../../assets/banners/BannerHome4.png';
import BannerHome5 from '../../assets/images/factorHumano5.png';
import { FaGraduationCap } from "react-icons/fa";
import ButtonEdit from '../../components/Buttons/ButtonEdit/ButtonEdit.jsx';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './css/viewProfile.css';

const ViewCompany = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const images = [BannerHome3, BannerHome4, BannerHome5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          Swal.fire('Error', 'No hay sesión activa', 'error');
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:3000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(response.data.user);
      } catch (error) {
        console.error('Error al obtener el perfil:', error);
        Swal.fire('Error', 'No se pudo cargar el perfil', 'error');
        navigate('/');
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!user) return <div className="loading-profile">Cargando perfil...</div>;

  return (
    <div id="ViewProfile">
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

        {/* Perfil */}
        <div className="profile-container">
          <div className="profile-header">
            <FaGraduationCap className="icon-Training" />
          </div>

          <h1 className="profile-title">
            {user.nombre} {user.apellido}
          </h1>

          <div className="info-boxes">
            <div className="info-box">
              <p className="info-main">Estado</p>
              <p className="info-label">{user.estado || 'Sin estado'}</p>
            </div>
            <div className="info-box">
              <p className="info-main">Rol</p>
              <p className="info-label">{user.rol || 'Sin rol'}</p>
            </div>
          </div>

          <div className="requirements">
            <div className="requirement">
              <h3>Tipo de documento</h3>
              <p>{user.tipo_documento || 'No especificado'}</p>
            </div>
            <div className="requirement">
              <h3>Número telefónico</h3>
              <p>{user.telefono || 'No registrado'}</p>
            </div>
            <div className="requirement">
              <h3>Correo Electrónico</h3>
              <p>{user.email}</p>
            </div>
            <div className="requirement">
              <h3>Dirección</h3>
              <p>{user.direccion || 'Sin dirección registrada'}</p>
            </div>

            <div className='Box-Button'>
              <Link className='Button' to="/Editprofile">
                <ButtonEdit />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCompany;
