import React, { useState, useEffect } from 'react';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import BannerHome3 from '../../assets/images/BannerHome3.png';
import BannerHome4 from '../../assets/images/BannerHome4.png';
import BannerHome5 from '../../assets/images/BannerHome5.png';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import { FaGraduationCap } from "react-icons/fa";
import { Link } from 'react-router-dom';
import ButtonConfirm from '../../components/Buttons/ButtonConfirm/ButtonConfirm.jsx';
import ButtonEdit from '../../components/Buttons/ButtonEdit/ButtonEdit.jsx';
import Swal from 'sweetalert2';
import './css/editTrainingProgram.css';

const EditTraining = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [BannerHome3, BannerHome4, BannerHome5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
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

          <div className="program-container">
            <div className="program-header">
              <FaGraduationCap className="icon-Training" />
            </div>
            <h1 className="program-title">
              Stephania Herrera Duque
            </h1>

            <div className="info-boxes">
              <div className="info-box">
                <p className="info-main">Tecnólogo</p>
                <p className="info-label">Nivel</p>
              </div>
              <div className="info-box">
                <p className="info-main">Presencial</p>
                <p className="info-label">Modalidad</p>
              </div>
              <div className="info-box">
                <p className="info-main">Diurna</p>
                <p className="info-label">Jornada</p>
              </div>
            </div>

            <div className="requirements">
              <div className="requirement">
                <h3>Nivel Académico</h3>
                <select name="" id="">
                  <option value="Bachiller">Auxiliar</option>
                  <option value="Tecnólogo">Tecnólogo</option>
                  <option value="Profesional">Tecnico</option>
                  <option value="Profesional">Operario</option>
                </select>
              </div>
              <div className="requirement">
                <h3>Nombre del Programa</h3>
                <input type="text" placeholder='Nombre del programa de formacion'/>
              </div>
              <div className="requirement">
                <h3>Area del Programa</h3>
                <input type="text" placeholder='Area del programa'/>
              </div>
              <div className="Box-Button">
                <Link className="Button" to="/ViewTraining" onClick={mostrarAlerta}>
                  <ButtonConfirm />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTraining;
