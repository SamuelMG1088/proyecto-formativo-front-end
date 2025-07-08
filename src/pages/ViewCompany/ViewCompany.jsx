import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import BannerHome3 from '../../assets/images/BannerHome3.png';
import BannerHome4 from '../../assets/images/BannerHome4.png';
import BannerHome5 from '../../assets/images/BannerHome5.png';
import { FaGraduationCap } from "react-icons/fa";
import './css/ViewCompany.css';
import ButtonEdit from '../../components/Buttons/ButtonEdit/ButtonEdit.jsx';
import { Link, useParams, NavLink, useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from 'axios';
import ButtonSuspend from '../../components/Buttons/BurronSuspend/ButtonSuspend.jsx';

const ViewCompany = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const images = [BannerHome3, BannerHome4, BannerHome5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const Viweusuario = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/usuarios/${id}`);
        const data = response.data;
        if (data.usuario) {
          setUsuario(data.usuario);
        } else {
          throw new Error("Datos no válidos del servidor");
        }
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el perfil.");
      }
    };
    Viweusuario();
  }, [id]);

  const handleSuspenderUsuario = async (usuarioId) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Este usuario será suspendido.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, suspender",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.put(`http://localhost:3000/api/usuarios/${usuarioId}`, {
        telefono: usuario.telefono,
        email: usuario.email,
        estado: "Inactivo", // debe ir con mayúscula
        password: usuario.password, 
        direccion: usuario.direccion
      });

      Swal.fire("¡Suspendido!", "El usuario ha sido suspendido.", "success").then(() => {
        navigate('/listcompany');
      });

    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo suspender el usuario.", "error");
    }
  };

  return (
    <div id="ViewCompany">
      <div className="PageViewtraining">
        <Gov />
        <HeaderIcons />
        <NavBar />

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

          {!usuario ? (
            error ? <p style={{ color: 'red' }}>{error}</p> : <p>Cargando perfil...</p>
          ) : (
            <>
              <h1 className="program-title">
                {usuario.nombre} {usuario.apellido}
              </h1>
              <div className="info-boxes">
                <div className="info-box">
                  <p className="info-main">{usuario.estado}</p>
                  <p className="info-label">Estado</p>
                </div>
                <div className="info-box">
                  <p className="info-main">Empresa</p>
                  <p className="info-label">Rol</p>
                </div>
              </div>

              <div className="requirements">
                <div className="requirement">
                  <h3>Número telefónico</h3>
                  <p>{usuario.telefono || "No registrado"}</p>
                </div>
                <div className="requirement">
                  <h3>Correo electrónico</h3>
                  <p>{usuario.email || "No registrado"}</p>
                </div>
                <div className="requirement">
                  <h3>Actividad económica</h3>
                  <p>{usuario.actividad_economica || "No registrada"}</p>
                </div>

                <div className='Box-Button'>
                  <Link to={`/EditCompany/${usuario.id}`}>
                    <ButtonEdit />
                  </Link>
                  <div className='Box-Button-suspend' onClick={() => handleSuspenderUsuario(usuario.id)}>
                    <ButtonSuspend />
                  </div>
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
