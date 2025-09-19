import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosInformationCircle } from "react-icons/io";
import axios from 'axios';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [users, setUsers] = useState([]);
  const [documentFilter, setDocumentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const images = [BannerActualizar, BannerHome1, BannerModulo];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

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

  const filteredUsers = users.filter(user => {
    const tipoDoc = user.tipo_documento?.toLowerCase() || '';
    const estado = user.estado?.toLowerCase() || '';
    const rol = user.rol_usuario?.toLowerCase() || '';

    const docFilter = documentFilter.toLowerCase();
    const estFilter = statusFilter.toLowerCase();
    const rolFilter = roleFilter.toLowerCase();

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

    let matchesRol = true;
    if (rolFilter) {
      matchesRol = rol === rolFilter;
    }

    return matchesDoc && matchesEstado && matchesRol;
  });

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert(`${t("listCompany.copied")}: ${text}`);
  };

  const resetFilters = () => {
    setDocumentFilter('');
    setStatusFilter('');
    setRoleFilter('');
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
              <FaArrowLeftLong className="icon-arrow" /> {t("listCompany.backHome")}
            </NavLink>

            <NavLink to="/CreateCompanyPage" className="CreateUse">
              <button className="button-create">{t("listCompany.createUser")}</button>
            </NavLink>

            <h2>{t("listCompany.title")}</h2>
            <p>{t("listCompany.subtitle")}</p>

           
            <div className="Export">
              <ExportPdfExcel
                data={filteredUsers}
                fileName="Usuarios"
                columns={["id", "nombre", "apellido", "email", "tipo_documento", "estado", "rol_usuario"]}
                excludeColumns={[]} 
              />
            </div>

            <FilterComponent
              onDocumentTypeChange={(value) => setDocumentFilter(value)}
              onStatusChange={(value) => setStatusFilter(value)}
              onRoleChange={(value) => setRoleFilter(value)}  
              onResetFilters={resetFilters}
            />

            <div className="empresa-table-container">
              <div className="border">
                <table className="empresa-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>{t("listCompany.fullName")}</th>
                      <th>{t("listCompany.email")}</th>
                      <th>{t("listCompany.document")}</th>
                      <th>{t("listCompany.role")}</th> 
                      <th>{t("listCompany.status")}</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan="7">{t("listCompany.noUsers")}</td>
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
                                  title={t("listCompany.copyEmail")}
                                >
                                </button>
                              </>
                            ) : (
                              t("listCompany.noEmail")
                            )}
                          </td>
                          <td>
                            {user.tipo_documento && user.tipo_documento.trim() !== '' ? (
                              <>
                                {user.tipo_documento}
                                <button
                                  className="copy-button"
                                  onClick={() => handleCopy(user.tipo_documento)}
                                  title={t("listCompany.copyDoc")}
                                >
                                </button>
                              </>
                            ) : (
                              t("listCompany.noDoc")
                            )}
                          </td>
                          <td>{user.rol_usuario}</td> 
                          <td>
                            <span
                              className={`status-badge ${user.estado?.toLowerCase() === 'activo' ? 'active' : 'inactive'}`}
                            >
                              {t(
                                `listCompany.status${
                                  user.estado?.toLowerCase() === 'activo' ? 'Active' : 'Inactive'
                                }`
                              )}
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
