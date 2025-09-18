import React, { useState, useEffect } from 'react';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import BannerHome2 from '../../assets/banners/BannerHome2.png';
import BannerHome8 from '../../assets/banners/BannerHome8.png';
import BannerHome12 from '../../assets/banners/BannerHome12.png';
import FilterComponent from '../../components/Filter/Filter.jsx';
import { NavLink, Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosInformationCircle } from "react-icons/io";
import './css/listProgram.css';
import ExportPdfExcel from '../../components/ExportPdfExcel/ExportPdfExcel.jsx';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useAuth } from "../../contexts/AuthContext/AuthContext.jsx"; // 🔹 importar useAuth

const ListProgram = () => {
  const { t } = useTranslation();
  const { user } = useAuth(); // 🔹 obtener usuario
  const [currentSlide, setCurrentSlide] = useState(0);
  const [programs, setPrograms] = useState([]);

  const images = [BannerHome2, BannerHome8, BannerHome12];

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
              <FaArrowLeftLong className='icon-arrow' /> {t('listProgram.backToHome')}
            </NavLink>

            {/* 🔹 Mostrar botón Crear Programa solo si NO es Empresa */}
            {user?.rol_usuario !== "Empresa" && (
              <NavLink to="/CreateProgram" className="CreateProgram">
                <div>
                  <button className='Create-program'>{t('listProgram.createProgram')}</button>
                </div>
              </NavLink>
            )}

            <h2>{t('listProgram.title')}</h2>
            <p>{t('listProgram.subtitle')}</p>

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
                      <th>{t('listProgram.tableHeaders.code')}</th>
                      <th>{t('listProgram.tableHeaders.name')}</th>
                      <th>{t('listProgram.tableHeaders.level')}</th>
                      <th>{t('listProgram.tableHeaders.duration')}</th>
                      <th>{t('listProgram.tableHeaders.modality')}</th>
                      <th>{t('listProgram.tableHeaders.status')}</th>
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
                            {program.estado === 'Activo' ? t('listProgram.status.active') : t('listProgram.status.inactive')}
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
                        <td colSpan="7">{t('listProgram.noPrograms')}</td>
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
