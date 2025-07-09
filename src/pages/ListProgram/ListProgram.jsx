import React, { useState, useEffect } from 'react';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import BannerHome3 from '../../assets/banners/BannerHome3.png';
import BannerHome4 from '../../assets/banners/BannerHome4.png';
import BannerHome5 from '../../assets/images/factorHumano5.png';
import FilterComponent from '../../components/Filter/Filter.jsx';
import { NavLink, Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosInformationCircle } from "react-icons/io";
import './css/listProgram.css';
import { IoIosCreate } from "react-icons/io";
import ExportPdfExcel from '../../components/ExportPdfExcel/ExportPdfExcel.jsx';
import axios from 'axios';

const ListProgram = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [programs, setPrograms] = useState([]);

  const images = [BannerHome3, BannerHome4, BannerHome5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/programas');
        setPrograms(res.data.programa);  // ajustado a la respuesta del backend
      } catch (err) {
        console.error('Error al cargar programas:', err);
      }
    };
    fetchPrograms();
  }, []);

  const handleProgramTypeChange = (type) => {
    console.log('Filtrar por tipo de programa:', type);
  };

  const handleStatusChange = (status) => {
    console.log('Filtrar por estado:', status);
  };

  const handleResetFilters = () => {
    console.log('Filtros reiniciados');
  };

  return (
    <div id="ListProgramPage">
      <div className="PageListProgram">
        <Gov />
        <HeaderIcons />
        <NavBar />

        {/* Carrusel */}
        <div className="program-carousel">
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

        {/* Main content */}
        <div className="list-program-content">
          <section className="list-program-section">
            <NavLink to="/home" className="NavLink">
              <FaArrowLeftLong className='icon-arrow' /> Volver al Inicio
            </NavLink>
            <NavLink to="/CreateProgram" className="CreateProgram">
              <div>
                <button className='Create-program'>Crear Programa</button>
              </div>
            </NavLink>
            <h2>Directorio de Programas de Formación</h2>
            <p>Explora y gestiona los programas de formación registrados</p>

            <div className='Exports'>
              <ExportPdfExcel />
            </div>

            <FilterComponent
              onDocumentTypeChange={handleProgramTypeChange}
              onStatusChange={handleStatusChange}
              onResetFilters={handleResetFilters}
            />

            {/* Program list table */}
            <div className="program-table-container">
              <div className="border">
                <table className="program-table">
                  <thead>
                    <tr>
                      <th>CÓDIGO</th>
                      <th>NOMBRE</th>
                      <th>NIVEL</th>
                      <th>DURACIÓN (MESES)</th>
                      <th>MODALIDAD</th>
                      <th>ESTADO</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {programs.map((program) => (
                      <tr key={program.id}>
                        <td>{program.id}</td>
                        <td>{program.nombre}</td>
                        <td>{program.nivel}</td>
                        <td>{program.duracion}</td>
                        <td>{program.area_vinculada}</td>
                        <td>
                          <span className={`status-badge ${program.estado === 'Activo' ? 'active' : 'inactive'}`}>
                            {program.estado}
                          </span>
                        </td>
                        <td>
                          <Link to={`/ViewTraining/${program.id}`}>
                            <button className="edit-button">
                              <IoIosInformationCircle />
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                    {programs.length === 0 && (
                      <tr>
                        <td colSpan="7">No hay programas registrados</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ListProgram;
