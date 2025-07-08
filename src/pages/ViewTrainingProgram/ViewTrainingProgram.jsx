import React, { useState, useEffect } from 'react';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import BannerHome3 from '../../assets/images/BannerHome3.png';
import BannerHome4 from '../../assets/images/BannerHome4.png';
import BannerHome5 from '../../assets/images/BannerHome5.png';
import { FaGraduationCap } from "react-icons/fa";
import './css/viewTrainingProgram.css';
import ButtonEdit from '../../components/Buttons/ButtonEdit/ButtonEdit.jsx';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import ButtonSuspend from '../../components/Buttons/BurronSuspend/ButtonSuspend.jsx';

const ViewTraining = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [program, setProgram] = useState(null);
  const { id } = useParams();

  const images = [BannerHome3, BannerHome4, BannerHome5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const Program = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/programas/${id}`);
        setProgram(res.data.programa);
      } catch (err) {
        console.error('Error al cargar el programa:', err);
      }
    };
    Program();
  }, [id]);

  return (
    <div id="ViewtrainingPage">
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
          <NavLink to="/ListProgram" className="NavLink">
            <FaArrowLeftLong className="icon-arrow" />Volver atrás
          </NavLink>
          <div className="program-header">
            <FaGraduationCap className="icon-Training" />
          </div>

          {program ? (
            <>
              <h1 className="program-title">{program.nombre}</h1>

              <div className="info-boxes">
                <div className="info-box">
                  <p className="info-main">{program.nivel}</p>
                  <p className="info-label">Nivel</p>
                </div>
                <div className="info-box">
                  <p className="info-main">{program.area_vinculada}</p>
                  <p className="info-label">Área vinculada</p>
                </div>
                <div className="info-box">
                  <p className="info-main">{program.estado}</p>
                  <p className="info-label">Estado</p>
                </div>
              </div>

              <div className="requirements">
                <div className="requirement">
                  <h3>Código del Programa</h3>
                  <p>{program.id}</p>
                </div>
                <div className="requirement">
                  <h3>Versión</h3>
                  <p>{program.version}</p>
                </div>
                <div className="requirement">
                  <h3>Duración</h3>
                  <p>{program.duracion}</p>
                </div>
                <div className="requirement">
                  <h3>Modalidad</h3>
                  <p>{program.area_vinculada}</p>
                </div>
                <div className="requirement">
                  <h3>Perfil ocupacional</h3>
                  <p>{program.nombre_perfil}</p>
                </div>
                <div className="requirement">
                  <h3>Competencia</h3>
                  <p>{program.competencia}</p>
                </div>
                
                <div className="requirement">
                  <h3>Lectiva</h3>
                  <p>{program.lectiva}</p>
                </div>
                <div className="requirement">
                  <h3>Productiva</h3>
                  <p>{program.productiva}</p>
                </div>
                <div className="Box-Button">
                  <Link
                    className="Button"
                    to={`/EditTraining/${program.id}`}
                    state={{
                      id: program.id,
                      nombre: program.nombre,
                      version: program.version,
                      estado: program.estado,
                      lectiva: program.lectiva,
                      productiva: program.productiva
                    }}
                  >
                    <ButtonEdit />
                  </Link>
                    <ButtonSuspend />
                </div>
              </div>
            </>
          ) : (
            <p className="loading-message">Cargando programa...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewTraining;
