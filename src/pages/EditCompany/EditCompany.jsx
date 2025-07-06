import React, { useState, useEffect } from 'react';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import BannerHome3 from '../../assets/images/BannerHome3.png';
import BannerHome4 from '../../assets/images/BannerHome4.png';
import BannerHome5 from '../../assets/images/BannerHome5.png';
import { FaGraduationCap } from "react-icons/fa";
import './css/EditCompany.css';
import ButtonConfirm from '../../components/Buttons/ButtonConfirm/ButtonConfirm.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const EditCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Carrusel
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [BannerHome3, BannerHome4, BannerHome5];

  // Estados del formulario
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [estado, setEstado] = useState('');
  const [password, setPassword] = useState('');
  const [direccion, setDireccion] = useState('');

  // Obtener datos del usuario
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/usuarios/${id}`);
        const data = response.data.usuario;
        setNombre(`${data.nombre} ${data.apellido}` || 'Usuario desconocido');
        setTelefono(data.telefono || '');
        setEmail(data.email || '');
        setEstado(data.estado || '');
        setDireccion(data.direccion || '');
        // No se recomienda cargar password, normalmente no se envía desde el backend
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la información del usuario',
          confirmButtonColor: '#00304d'
        });
      }
    };

    fetchUsuario();
  }, [id]);

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  // Guardar cambios
 const guardarCambios = async () => {
  try {
    await axios.put(`http://localhost:3000/api/usuarios/${id}`, {
      telefono,
      email,
      estado: estado || 'Activo',      // valor por defecto
      password: password || 'default', // valor por defecto (o el actual)
      direccion
    });
    Swal.fire({
      title: '¡Datos actualizados!',
      text: 'La información se actualizó correctamente.',
      icon: 'success',
      confirmButtonColor: '#00304d'
    }).then(() => {
      navigate('/listcompany');
    });
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo actualizar la información',
      confirmButtonColor: '#00304d'
    });
  }
};


  return (
    <div id="ViewCompanyPage">
      <div className="PageViewCompany">
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

        {/* Datos de usuario */}
        <div className="profile-container">
          <div className="profile-header">
            <FaGraduationCap className="icon-Training" />
          </div>
          <h1 className="profile-title">{nombre}</h1>

          {/* Estado y rol */}
          <div className="info-boxes">
            <div className="info-box">
              <p className="info-label">{estado || 'Activo'}</p>
              <p className="info-main">Estado</p>
            </div>
            <div className="info-box">
              <p className="info-label">Empresa</p>
              <p className="info-main">Rol</p>
            </div>
          </div>

          {/* Formulario */}
          <div className="requirements">
            <div className="requirement">
              <h3>Número telefónico</h3>
              <input
                type="text"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Ingrese su número telefónico"
              />
            </div>
            <div className="requirement">
              <h3>Correo electrónico</h3>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingrese su correo electrónico"
              />
            </div>
            <div className="requirement">
              <h3>Dirección</h3>
              <input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Ingrese su dirección"
              />

            </div>
           
          {/* Botón guardar */}
          <div className="Box-Button" onClick={guardarCambios}>
            <ButtonConfirm />
          </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EditCompany;
