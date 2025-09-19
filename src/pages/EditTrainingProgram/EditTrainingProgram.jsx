import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import BannerHome4 from '../../assets/banners/BannerHome4.png';
import BannerHome6 from '../../assets/banners/BannerHome6.png';
import BannerHome7 from '../../assets/banners/BannerHome7.png';
import { FaGraduationCap } from "react-icons/fa";
import ButtonConfirm from '../../components/Buttons/ButtonConfirm/ButtonConfirm.jsx';
import './css/editTrainingProgram.css';

const EditTraining = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const programData = location.state || {
    nombre: "",
    id: "",
    version: "",
    estado: "",
    lectiva: "",
    productiva: ""
  };

  const [version, setVersion] = useState(programData.version);
  const [estado, setEstado] = useState(programData.estado);
  const [lectiva, setLectiva] = useState(programData.lectiva);
  const [productiva, setProductiva] = useState(programData.productiva);

  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [BannerHome4, BannerHome6, BannerHome7];


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  const actualizarPrograma = async () => {
    if (!programData.id) {
      Swal.fire({
        title: 'Error',
        text: 'ID de programa no válido',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#39a900',
      });
      return;
    }

    try {
      await axios.put(`http://localhost:3000/api/programas/${programData.id}`, {
        version: Number(version),
        estado,
        lectiva: lectiva.toString(),
        productiva: productiva.toString()
      });

      Swal.fire({
        title: '¡Datos actualizados!',
        text: `El programa se actualizó correctamente.`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#39a900',
      }).then(() => {
        navigate('/ListProgram');
      });

    } catch (error) {
      console.error("Error:", error);
      console.error("Respuesta del servidor:", error.response?.data);

      Swal.fire({
        title: 'Error',
        text: error.response?.data?.message || 'No se pudo actualizar el programa.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#00304d',
      });
    }
  };

  return (
    <div id="ViewProfile">
      <div className="PageProfile">
        <Gov />
        <HeaderIcons />
        <NavBar />

        <div className="profile-content">
          {/* Carrusel */}
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

          {/* Contenedor del programa */}
          <div className="program-container">
            <div className="program-header">
              <FaGraduationCap className="icon-Training" />
            </div>

            <h1 className="program-title">
              {programData.nombre || "Nombre del Programa"}
            </h1>

            <div className="requirements">
              <div className="requirement">
                <h3>Versión</h3>
                <input
                  type="number"
                  placeholder="Versión del programa"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                />
              </div>

              <div className="requirement">
                <h3>Estado</h3>
                <input
                  type="text"
                  placeholder="Estado del programa"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                />
              </div>

              <div className="requirement">
                <h3>Lectiva</h3>
                <input
                  type="text"  // cambio a text para no confundir al usuario
                  placeholder="Mes lectiva"
                  value={lectiva}
                  onChange={(e) => setLectiva(e.target.value)}
                />
              </div>

              <div className="requirement">
                <h3>Productiva</h3>
                <input
                  type="text"  // cambio a text también
                  placeholder="Mes productiva"
                  value={productiva}
                  onChange={(e) => setProductiva(e.target.value)}
                />
              </div>

              <div className="Box-Button" onClick={actualizarPrograma}>
                <ButtonConfirm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTraining;
