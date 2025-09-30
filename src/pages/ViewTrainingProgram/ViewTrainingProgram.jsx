import React, { useState, useEffect } from 'react';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import BannerHome4 from '../../assets/banners/BannerHome4.png';
import BannerHome6 from '../../assets/banners/BannerHome6.png';
import BannerHome7 from '../../assets/banners/BannerHome7.png';
import { FaGraduationCap } from "react-icons/fa";
import './css/viewTrainingProgram.css';
import '../../styles/variables.css';
import ButtonEdit from '../../components/Buttons/ButtonEdit/ButtonEdit.jsx';
import { Link, useParams, NavLink, useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from 'axios';
import ButtonSuspend from '../../components/Buttons/BurronSuspend/ButtonSuspend.jsx';
import { useAuth } from "../../contexts/AuthContext/AuthContext.jsx";
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

const ViewTraining = () => {
  const { t } = useTranslation();
  const { user } = useAuth(); 
  const [currentSlide, setCurrentSlide] = useState(0);
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const images = [BannerHome4, BannerHome6, BannerHome7];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/programas/${id}`);
        setProgram(res.data.programa);
      } catch (err) {
        console.error(t("errors.loadProgram"), err);
      }
    };
    fetchProgram();
  }, [id, t]);

  const handleCambiarEstadoPrograma = async (programaId, nuevoEstado) => {
    const isDarkMode = document.body.classList.contains("dark");

    const result = await Swal.fire({
      title: nuevoEstado === "Inactivo" ? t("confirmation.sureTitle") : t("confirmation.sureActivateTitle"),
      text: nuevoEstado === "Inactivo" ? t("confirmation.suspendUserText") : t("confirmation.activateUserText"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: nuevoEstado === "Inactivo" ? t("buttons.suspend") : t("buttons.activate"),
      cancelButtonText: t("buttons.cancel"),
      cancelButtonColor: "red",
      background: isDarkMode ? "#000000ff" : "#fff",
      color: isDarkMode ? "#fff" : "#000",
      confirmButtonColor: "#39a900",
    });

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      const payload = {
        version: Number(program.version),
        estado: nuevoEstado,
        lectiva: String(program.lectiva),
        productiva: String(program.productiva)
      };

      const res = await axios.put(`http://localhost:3000/api/programas/${programaId}`, payload);

      setProgram(res.data.programa);
      setLoading(false);

      Swal.fire({
        icon: "success",
        title: nuevoEstado === "Inactivo" ? t("alerts.suspendedTitle") : t("alerts.activatedTitle"),
        text: nuevoEstado === "Inactivo" ? t("alerts.userSuspended") : t("alerts.userActivated"),
        confirmButtonText: t("general.accept"),
        confirmButtonColor: "#39a900",
        background: isDarkMode ? "#1e1e1e" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
      });

    } catch (error) {
      console.error(error);
      setLoading(false);
      Swal.fire("Error", t("errors.changeState"), "error");
    }
  };

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
            <FaArrowLeftLong className="icon-arrow" /> {t("buttons.back")}
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
                  <p className="info-label">{t("program.level")}</p>
                </div>
                <div className="info-box">
                  <p className="info-main">{program.area_vinculada}</p>
                  <p className="info-label">{t("program.area")}</p>
                </div>
                <div className="info-box">
                  <p className="info-main">{program.estado}</p>
                  <p className="info-label">{t("program.state")}</p>
                </div>
              </div>

              <div className="requirements">
                <div className="requirement">
                  <h3>{t("program.code")}</h3>
                  <p>{program.id}</p>
                </div>
                <div className="requirement">
                  <h3>{t("program.version")}</h3>
                  <p>{program.version}</p>
                </div>
                <div className="requirement">
                  <h3>{t("program.duration")}</h3>
                  <p>{program.duracion}</p>
                </div>
                <div className="requirement">
                  <h3>{t("program.area")}</h3>
                  <p>{program.area_vinculada}</p>
                </div>
                <div className="requirement">
                  <h3>{t("program.profile")}</h3>
                  <p>{program.nombre_perfil}</p>
                </div>
                <div className="requirement">
                  <h3>{t("program.skills")}</h3>
                  <p>{program.competencia}</p>
                </div>
                
                <div className="requirement">
                  <h3>{t("program.lectiveTime")}</h3>
                  <p>{program.lectiva}</p>
                </div>
                <div className="requirement">
                  <h3>{t("program.productiveTime")}</h3>
                  <p>{program.productiva}</p>
                </div>

                {user?.rol_usuario !== "Empresa" && (
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

                    {loading ? (
                      <button className="btn-loading" disabled>{t("general.loading")}</button>
                    ) : program.estado === "Activo" ? (
                      <div
                        className='Box-Button-suspend'
                        onClick={() => handleCambiarEstadoPrograma(program.id, "Inactivo")}
                      >
                        <ButtonSuspend />
                      </div>
                    ) : (
                      <button
                        className="btn-activate"
                        onClick={() => handleCambiarEstadoPrograma(program.id, "Activo")}
                      >
                        {t("buttons.activate")}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            <p className="loading-message">{t("general.loadingProgram")}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewTraining;
