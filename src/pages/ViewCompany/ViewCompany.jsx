import React, { useState, useEffect } from 'react';
import { useParams, Link, NavLink } from 'react-router-dom';
import axios from 'axios';

import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import BannerHome3 from '../../assets/images/BannerHome3.png';
import BannerHome4 from '../../assets/images/BannerHome4.png';
import BannerHome5 from '../../assets/images/BannerHome5.png';

import { FaGraduationCap } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";

import ButtonEdit from '../../components/Buttons/ButtonEdit/ButtonEdit.jsx';

import './css/ViewCompany.css';

const ViewCompany = () => {
  const { id } = useParams();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [user, setUser] = useState(null);

  const images = [BannerHome3, BannerHome4, BannerHome5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/usuarios/${id}`);
        setUser(response.data); // Asegúrate que el backend devuelve el usuario directamente
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    };
    fetchUser();
  }, [id]);

  return (
    <div id="ViewCompany">
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

        <div className="program-container">
          <NavLink to="/listcompany" className="NavLink">
            <FaArrowLeftLong className='icon-arrow' /> Volver atrás
          </NavLink>

          <div className="program-header">
            <FaGraduationCap className="icon-Training" />
          </div>

          {user ? (
            <>
              <h1 className="program-title">
                {user.nombre} {user.apellido}
              </h1>

              <div className="info-boxes">
                <div className="info-box">
                  <p className="info-main">{user.estado}</p>
                  <p className="info-label">Estado</p>
                </div>
                <div className="info-box">
                  <p className="info-main">{user.rol || 'Empresa'}</p>
                  <p className="info-label">Rol</p>
                </div>
              </div>

              <div className="requirements">
                <div className="requirement">
                  <h3>Número telefónico</h3>
                  <p>{user.telefono || 'No registrado'}</p>
                </div>
                <div className="requirement">
                  <h3>Correo electrónico</h3>
                  <p>{user.correo || 'No disponible'}</p>
                </div>
                <div className="requirement">
                  <h3>Razón social</h3>
                  <p>{user.razon_social || 'No disponible'}</p>
                </div>
                <div className="requirement">
                  <h3>Actividad económica</h3>
                  <p>{user.actividad_economica || 'No registrada'}</p>
                </div>
                <div className='Box-Button'>
                  <Link to={`/EditCompany/${user.id}`}>
                    <ButtonEdit />
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <p className="loading">Cargando datos del usuario...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewCompany;
