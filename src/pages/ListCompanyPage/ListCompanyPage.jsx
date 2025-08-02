import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosInformationCircle } from "react-icons/io";
import axios from 'axios';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import BannerActualizar from '../../assets/banners/BannerActualizar.png'
import BannerHome1 from '../../assets/banners/BannerHome1.png';
import BannerModulo from '../../assets/banners/BannerModulo.png'
import FilterComponent from '../../components/Filter/Filter.jsx';
import ExportPdfExcel from '../../components/ExportPdfExcel/ExportPdfExcel.jsx';

import './css/listCompany.css';

const ListCompany = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [users, setUsers] = useState([]);
  const [documentFilter, setDocumentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const images = [BannerActualizar, BannerHome1, BannerModulo];

  // Car6usel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  // Obtener usuarios de la API
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
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  // Filtrado
  const filteredUsers = users.filter(user => {
    const tipoDoc = user.tipo_documento?.toLowerCase() || '';
    const estado = user.estado?.toLowerCase() || '';
    const docFilter = documentFilter.toLowerCase();
    const estFilter = statusFilter.toLowerCase();

    // FILTRO DOCUMENTO
    let matchesDoc = true;
    if (docFilter) {
      if (docFilter === 'c.c') {
        matchesDoc = tipoDoc.includes('cédula de ciudadanía') || tipoDoc.includes('c.c');
      } else if (docFilter === 'c.e') {
        matchesDoc = tipoDoc.includes('cédula de extranjería') || tipoDoc.includes('c.e');
      } else {
        matchesDoc = tipoDoc.includes(docFilter);
      }
    }

    // FILTRO ESTADO
    let matchesEstado = true;
    if (estFilter) {
      if (estFilter === 'activo') {
        matchesEstado = estado === 'activo';
      } else if (estFilter === 'inactivo') {
        matchesEstado = estado === 'inactivo';
      } else {
        matchesEstado = estado.includes(estFilter);
      }
    }

    return matchesDoc && matchesEstado;
  });

  // Copiar datos
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copiado: ${text}`);
  };

  const resetFilters = () => {
    setDocumentFilter('');
    setStatusFilter('');
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
              onDocumentTypeChange={(value) => setDocumentFilter(value)}
              onStatusChange={(value) => setStatusFilter(value)}
              onResetFilters={resetFilters}
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
                      <th>Tipo de documento</th>
                      <th>Estado</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan="6">No hay usuarios registrados.</td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.nombre} {user.apellido}</td>
                          <td>
                            {user.email && user.email.trim() !== '' ? (
                              <>
                                {user.email}
                                <button
                                  className="copy-button"
                                  onClick={() => handleCopy(user.email)}
                                  title="Copiar correo"
                                >
                                  
                                </button>
                              </>
                            ) : (
                              'Sin correo'
                            )}
                          </td>
                          <td>
                            {user.tipo_documento && user.tipo_documento.trim() !== '' ? (
                              <>
                                {user.tipo_documento}
                                <button
                                  className="copy-button"
                                  onClick={() => handleCopy(user.tipo_documento)}
                                  title="Copiar tipo de documento"
                                >
                                  
                                </button>
                              </>
                            ) : (
                              'Sin tipo'
                            )}
                          </td>
                          <td>
                            <span
                              className={`status-badge ${user.estado === 'Activo' ? 'active' : 'inactive'}`}
                            >
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
