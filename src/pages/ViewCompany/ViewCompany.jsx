import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import BannerHome1 from '../../assets/banners/BannerHome1.png';
import BannerUsers from '../../assets/banners/BannerUsers.png';
import BannerHome6 from '../../assets/banners/BannerHome6.png';
import { FaGraduationCap } from "react-icons/fa";
import './css/ViewCompany.css';
import ButtonEdit from '../../components/Buttons/ButtonEdit/ButtonEdit.jsx';
import { Link, useParams, NavLink, useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from 'axios';
import ButtonSuspend from '../../components/Buttons/BurronSuspend/ButtonSuspend.jsx';
import { useTranslation } from 'react-i18next';

const ViewCompany = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const images = [BannerHome1, BannerUsers, BannerHome6];

  // Carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  // Cargar usuario
  useEffect(() => {
    const Viweusuario = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/usuarios/${id}`);
        const data = response.data;
        if (data.usuario) {
          setUsuario(data.usuario);
        } else {
          throw new Error(t("errors.invalidServerData"));
        }
      } catch (err) {
        console.error(err);
        setError(t("errors.couldNotLoadProfile"));
      }
    };
    Viweusuario();
  }, [id, t]);

  const   handleCambiarEstadoUsuario = async (usuarioId, nuevoEstado) => {
    const isDarkMode = document.body.classList.contains("dark");

    const result = await Swal.fire({
      title: nuevoEstado === "Inactivo" ? t("confirmation.sureTitle") : t("confirmation.sureActivateTitle"),
      text: nuevoEstado === "Inactivo" ? t("confirmation.suspendUserText") : t("confirmation.activateUserText"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: nuevoEstado === "Inactivo" ? t("buttons.yesSuspend") : t("buttons.yesActivate"),
      cancelButtonText: t("buttons.cancel"),
      cancelButtonColor: isDarkMode ? "red" : "red",
      background: isDarkMode ? "#1e1e1e" : "#fff",
      color: isDarkMode ? "#fff" : "#000",
      confirmButtonColor: isDarkMode ? "#39a900" : "#39a900",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.put(`http://localhost:3000/api/usuarios/${usuarioId}`, {
        telefono: usuario.telefono,
        email: usuario.email,
        estado: nuevoEstado, // Activo o Inactivo
        password: usuario.password,
        direccion: usuario.direccion
      });

      Swal.fire({
        icon: "success",
        title: nuevoEstado === "Inactivo" ? t("alerts.suspendedTitle") : t("alerts.activatedTitle"),
        text: nuevoEstado === "Inactivo" ? t("alerts.userSuspended") : t("alerts.userActivated"),
        confirmButtonText: t("general.accept"),
        confirmButtonColor: "#39a900",
        background: isDarkMode ? "#1e1e1e" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
      }).then(() => {
        navigate("/listcompany");
      });

    } catch (error) {
      console.error(error);
      Swal.fire(t("alerts.errorTitle"), t("alerts.couldNotSuspendUser"), "error");
    }
  };

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

        {/* Contenido */}
        <div className="program-container">
          <NavLink to="/listcompany" className="NavLink">
            <FaArrowLeftLong className='icon-arrow' /> {t("buttons.goBack")}
          </NavLink>

          <div className="program-header">
            <FaGraduationCap className="icon-Training" />
          </div>

          {!usuario ? (
            error ? <p style={{ color: 'red' }}>{error}</p> : <p>{t("loading.profile")}</p>
          ) : (
            <>
              <h1 className="program-title">
                {usuario.nombre} {usuario.apellido}
              </h1>
              <div className="info-boxes">
                <div className="info-box">
                  <p className="info-main">{usuario.estado}</p>
                  <p className="info-label">{t("labels.status")}</p>
                </div>
                <div className="info-box">
                  <p className="info-main">{t("labels.company")}</p>
                  <p className="info-label">{t("labels.role")}</p>
                </div>
              </div>

              <div className="requirements">
                <div className="requirement">
                  <h3>{t("labels.phoneNumber")}</h3>
                  <p>{usuario.telefono || t("labels.notRegistered")}</p>
                </div>
                <div className="requirement">
                  <h3>{t("labels.email")}</h3>
                  <p>{usuario.email || t("labels.notRegistered")}</p>
                </div>
                <div className="requirement">
                  <h3>{t('labels.economicActivity')}</h3>
                  <p>{usuario.actividad_economica || t("labels.notRegistered")}</p>
                </div>

                <div className='Box-Button'>
                  <Link to={`/EditCompany/${usuario.id}`}>
                    <ButtonEdit />
                  </Link>
                  {usuario.estado === "Activo" ? (
                    <div
                      className='Box-Button-suspend'
                      onClick={() => handleCambiarEstadoUsuario(usuario.id, "Inactivo")}
                    >
                      <ButtonSuspend />
                    </div>
                  ) : (
                    <button
                      className="btn-activate"
                      onClick={() => handleCambiarEstadoUsuario(usuario.id, "Activo")}
                    >
                      {t("buttons.activate")}
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewCompany;
