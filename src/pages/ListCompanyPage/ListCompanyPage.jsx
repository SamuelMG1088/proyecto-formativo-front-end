import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosInformationCircle } from "react-icons/io";
import axios from 'axios';

import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import BannerHome3 from '../../assets/images/BannerHome3.png';
import BannerHome4 from '../../assets/images/BannerHome4.png';
import BannerHome5 from '../../assets/images/BannerHome5.png';
import FilterComponent from '../../components/Filter/Filter.jsx';
import ExportPdfExcel from '../../components/ExportPdfExcel/ExportPdfExcel.jsx';

import './css/listCompany.css';

const ListCompany = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [users, setUsers] = useState([]);

  const images = [BannerHome3, BannerHome4, BannerHome5];

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  // Llamada a la API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/usuarios');
        const data = response.data;

        if (Array.isArray(data.usuario)) {
          setUsers(data.usuario);
        } else {
          console.error("La propiedad 'usuario' no es un array:", data);
          setUsers([]);
        }

        console.log('Usuarios desde la API:', data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  // Copiar correo
  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
    alert(`Correo copiado: ${email}`);
  };

  return (
    <div id="ListCompanyPage">
      <div className="PageListCompany">
        <Gov />
        <HeaderIcons />
        <NavBar />

        {/* Carrusel */}
        <div className="company-carousel">
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

        {/* Contenido principal */}
        <div className="list-company-content">
          <section className="list-company-section">
            <NavLink to="/home" className="NavLink">
              <FaArrowLeftLong className="icon-arrow" /> Volver al Inicio
            </NavLink>

            <NavLink to="/CreateCompanyPage" className="CreateUse">
              <button className="button-create">Crear Usuario</button>
            </NavLink>

            <h2>Directorio de Usuarios</h2>
            <p>Explora y descubre usuarios registrados</p>

            <div className="Export">
              <ExportPdfExcel />
            </div>

            <FilterComponent
              onDocumentTypeChange={() => {}}
              onStatusChange={() => {}}
              onResetFilters={() => {}}
            />

            {/* Tabla de usuarios */}
            <div className="empresa-table-container">
              <div className="border">
                <table className="empresa-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre completo</th>
                      <th>Correo</th>
                      <th>Estado</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan="5">No hay usuarios registrados.</td>
                      </tr>
                    ) : (
                      users.map(user => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.nombre} {user.apellido}</td>
                          <td>
                            {user.correo || 'Sin correo'}
                            {user.correo && (
                              <button
                                className="copy-button"
                                onClick={() => handleCopyEmail(user.correo)}
                                title="Copiar correo"
                              >
                                📋
                              </button>
                            )}
                          </td>
                          <td>
                            <span className={`status-badge ${user.estado === 'Activo' ? 'active' : 'inactive'}`}>
                              {user.estado}
                            </span>
                          </td>
                          <td>
                            <Link to={`/viewCompany/${user.id}`}>
                              <button className="edit-button">
                                <IoIosInformationCircle />
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))
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
};

export default ListCompany;
