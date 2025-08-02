import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaGraduationCap } from 'react-icons/fa';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import BannerHome3 from '../../assets/banners/BannerHome3.png';
import BannerHome4 from '../../assets/banners/BannerHome4.png';
import BannerHome5 from '../../assets/images/factorHumano5.png';
import ButtonConfirm from '../../components/Buttons/ButtonConfirm/ButtonConfirm.jsx';
import Swal from 'sweetalert2';
import axios from 'axios';
import './css/editProfile.css';

const EditProfile = () => {
  const { id } = useParams(); // obtenemos el id de la URL
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [BannerHome3, BannerHome4, BannerHome5];

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Cargar datos del usuario
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:4000/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (error) {
        console.error('Error al cargar perfil:', error);
        Swal.fire('Error', 'No se pudo cargar el perfil', 'error');
        navigate('/');
      }
    };
    if (id) {
      fetchUser();
    }
  }, [id, navigate]);

  // Manejador de cambios
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Guardar cambios
  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:4000/api/users/${id}`, user, {
        headers: { Authorization: `Bearer ${token}` }
      });
      Swal.fire({
        title: '¡Datos actualizados!',
        text: 'Tus datos han sido actualizados correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#00304d'
      }).then(() => {
        navigate('/viewprofile');
      });
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      Swal.fire('Error', 'No se pudo actualizar el perfil', 'error');
    }
  };

  if (!user) return <div className="loading-profile">Cargando datos...</div>;

  return (
    <div id="EditProfilePage">
      <div className="PageEditProfile">
        <Gov />
        <HeaderIcons />
        <NavBar />

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

        {/* Formulario de edición */}
        <div className="profile-container">
          <div className="profile-header">
            <FaGraduationCap className="icon-Training" />
          </div>
          <h1 className="profile-title">
            {user.nombre} {user.apellido}
          </h1>

          <div className="info-boxes">
            <div className="info-box">
              <p className="info-main">Estado</p>
              <p className="info-label">{user.estado || 'Activo'}</p>
            </div>
            <div className="info-box">
              <p className="info-main">Rol</p>
              <p className="info-label">{user.rol}</p>
            </div>
          </div>

          <div className="requirements">
            <div className="requirement">
              <h3>Tipo de documento</h3>
              <select name="tipo_documento" value={user.tipo_documento} onChange={handleChange}>
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="TI">Tarjeta de Identidad</option>
                <option value="CE">Cédula de Extranjería</option>
                <option value="PA">Pasaporte</option>
              </select>
            </div>

            <div className="requirement">
              <h3>Número telefónico</h3>
              <input
                type="text"
                name="telefono"
                value={user.telefono || ''}
                onChange={handleChange}
                placeholder="Ingresa el nuevo número de teléfono"
              />
            </div>

            <div className="requirement">
              <h3>Correo electrónico</h3>
              <input
                type="email"
                name="email"
                value={user.email || ''}
                onChange={handleChange}
                placeholder="Ingresa la nueva dirección de correo"
              />
            </div>

            <div className="requirement">
              <h3>Dirección</h3>
              <input
                type="text"
                name="direccion"
                value={user.direccion || ''}
                onChange={handleChange}
                placeholder="Ingresa la dirección actualizada"
              />
            </div>

            <div className="Box-Button" onClick={handleSave}>
              <ButtonConfirm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
