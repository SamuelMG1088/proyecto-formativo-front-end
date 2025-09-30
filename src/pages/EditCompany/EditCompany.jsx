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

  // Estados para validaciones
  const [errors, setErrors] = useState({
    telefono: '',
    email: '',
    direccion: ''
  });
  const [isValid, setIsValid] = useState(false);

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
          background: isDarkMode ? "#1e1e1e" : "#fff",
          color: isDarkMode ? "#fff" : "#000",
          confirmButtonColor: isDarkMode ? "#39a900" : "#d33",
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

  // Funciones de validación
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,15}$/;
    return phoneRegex.test(phone);
  };

  const validateAddress = (address) => {
    return address.trim().length >= 5;
  };

  const validateField = (field, value) => {
    let error = '';
    
    switch (field) {
      case 'email':
        if (!value.trim()) {
          error = t('validation.emailRequired');
        } else if (!validateEmail(value)) {
          error = t('validation.emailInvalid');
        }
        break;
      case 'telefono':
        if (!value.trim()) {
          error = t('validation.phoneRequired');
        } else if (!validatePhone(value)) {
          error = t('validation.phoneInvalid');
        }
        break;
      case 'direccion':
        if (!value.trim()) {
          error = t('validation.addressRequired');
        } else if (!validateAddress(value)) {
          error = t('validation.addressTooShort');
        }
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleFieldChange = (field, value) => {
    // Actualizar el valor del campo
    switch (field) {
      case 'telefono':
        setTelefono(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'direccion':
        setDireccion(value);
        break;
      default:
        break;
    }

    // Validar el campo
    const error = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));

    // Verificar si todos los campos son válidos
    const allErrors = {
      ...errors,
      [field]: error
    };
    const hasErrors = Object.values(allErrors).some(error => error !== '');
    setIsValid(!hasErrors && email.trim() !== '' && telefono.trim() !== '' && direccion.trim() !== '');
  };

  const guardarCambios = async () => {
    // Validar todos los campos antes de enviar
    const emailError = validateField('email', email);
    const phoneError = validateField('telefono', telefono);
    const addressError = validateField('direccion', direccion);

    const newErrors = {
      email: emailError,
      telefono: phoneError,
      direccion: addressError
    };

    setErrors(newErrors);

    // Verificar si hay errores
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    
    if (hasErrors) {
      Swal.fire({
        icon: 'warning',
        title: t('validation.formErrorsTitle'),
        text: t('validation.formErrorsText'),
        confirmButtonColor: '#39a900'
      });
      return;
    }

    // Verificar que todos los campos requeridos estén llenos
    if (!email.trim() || !telefono.trim() || !direccion.trim()) {
      Swal.fire({
        icon: 'warning',
        title: t('validation.requiredFieldsTitle'),
        text: t('validation.requiredFieldsText'),
        confirmButtonColor: '#39a900'
      });
      return;
    }

    try {
      await axios.put(`http://localhost:3000/api/usuarios/${id}`, {
        telefono,
        email,
        estado: estado || t('labels.active'),
        password: password || 'default',
        direccion
      });

     const isDarkMode = document.body.classList.contains("dark");
    Swal.fire({
      title: t("alerts.dataUpdatedTitle"),      // ✅ i18n
      text: t("alerts.dataUpdatedText"),        // ✅ i18n
      icon: "success",
      confirmButtonText: t("general.accept"),   // ✅ si tienes esta key en tu JSON
      confirmButtonColor: "#39a900",
      background: isDarkMode ? "#1e1e1e" : "#fff", // ✅ Dark / Light
      color: isDarkMode ? "#fff" : "#000"
      }).then(() => {
        navigate('/listcompany');
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: t('alerts.errorTitle'),
        text: t('errors.couldNotUpdate'),
        confirmButtonColor: '#39a900'
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
                onChange={(e) => handleFieldChange('telefono', e.target.value)}
                placeholder={t('placeholders.phoneNumber')}
                className={errors.telefono ? 'error-input' : ''}
              />
              {errors.telefono && <span className="error-message">{errors.telefono}</span>}
            </div>
            <div className="requirement">
              <h3>{t('labels.email')}</h3>
              <input
                type="email"
                value={email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                placeholder={t('placeholders.email')}
                className={errors.email ? 'error-input' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            <div className="requirement">
              <h3>{t('labels.address')}</h3>
              <input
                type="text"
                value={direccion}
                onChange={(e) => handleFieldChange('direccion', e.target.value)}
                placeholder={t('placeholders.address')}
                className={errors.direccion ? 'error-input' : ''}
              />
              {errors.direccion && <span className="error-message">{errors.direccion}</span>}
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
