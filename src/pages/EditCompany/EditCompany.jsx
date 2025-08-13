import React, { useState, useEffect } from 'react';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import BannerHome1 from '../../assets/banners/BannerHome1.png';
import BannerUsers from '../../assets/banners/BannerUsers.png';
import BannerHome6 from '../../assets/banners/BannerHome6.png';
import { FaGraduationCap } from "react-icons/fa";
import './css/EditCompany.css';
import ButtonConfirm from '../../components/Buttons/ButtonConfirm/ButtonConfirm.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const EditCompany = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [BannerHome1, BannerUsers, BannerHome6];

  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [estado, setEstado] = useState('');
  const [password, setPassword] = useState('');
  const [direccion, setDireccion] = useState('');

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/usuarios/${id}`);
        const data = response.data.usuario;
        setNombre(`${data.nombre} ${data.apellido}` || t('labels.unknownUser'));
        setTelefono(data.telefono || '');
        setEmail(data.email || '');
        setEstado(data.estado || '');
        setDireccion(data.direccion || '');
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: t('alerts.errorTitle'),
          text: t('errors.couldNotLoadUserInfo'),
          confirmButtonColor: '#00304d'
        });
      }
    };

    fetchUsuario();
  }, [id, t]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  const guardarCambios = async () => {
    try {
      await axios.put(`http://localhost:3000/api/usuarios/${id}`, {
        telefono,
        email,
        estado: estado || t('labels.active'),
        password: password || 'default',
        direccion
      });
      Swal.fire({
        title: t('alerts.dataUpdatedTitle'),
        text: t('alerts.dataUpdatedText'),
        icon: 'success',
        confirmButtonColor: '#00304d'
      }).then(() => {
        navigate('/listcompany');
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: t('alerts.errorTitle'),
        text: t('errors.couldNotUpdate'),
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

        <div className="profile-container">
          <div className="profile-header">
            <FaGraduationCap className="icon-Training" />
          </div>
          <h1 className="profile-title">{nombre}</h1>

          <div className="info-boxes">
            <div className="info-box">
              <p className="info-label">{estado || t('labels.active')}</p>
              <p className="info-main">{t('labels.status')}</p>
            </div>
            <div className="info-box">
              <p className="info-label">{t('labels.company')}</p>
              <p className="info-main">{t('labels.role')}</p>
            </div>
          </div>

          <div className="requirements">
            <div className="requirement">
              <h3>{t('labels.phoneNumber')}</h3>
              <input
                type="text"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder={t('placeholders.phoneNumber')}
              />
            </div>
            <div className="requirement">
              <h3>{t('labels.email')}</h3>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('placeholders.email')}
              />
            </div>
            <div className="requirement">
              <h3>{t('labels.address')}</h3>
              <input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder={t('placeholders.address')}
              />
            </div>

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
