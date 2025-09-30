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
import { validateEmail, validatePhone, validateAddress, validatePassword } from '../../utils/validation.js';
import '../../styles/validation.css';

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
    direccion: '',
    password: ''
  });
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({
    telefono: false,
    email: false,
    direccion: false,
    password: false
  });

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

  // Funciones de validación usando utilidades centralizadas
  const validateEmailField = (email) => {
    const validation = validateEmail(email);
    return { isValid: validation.isValid, error: validation.error };
  };

  const validatePhoneField = (phone) => {
    const validation = validatePhone(phone);
    return { isValid: validation.isValid, error: validation.error };
  };

  const validateAddressField = (address) => {
    const validation = validateAddress(address);
    return { isValid: validation.isValid, error: validation.error };
  };

  const validatePasswordField = (password) => {
    if (!password || password.trim() === '') return { isValid: true, error: '' }; // Password es opcional
    const validation = validatePassword(password);
    return { isValid: validation.isValid, error: validation.error };
  };

  const validateField = (field, value) => {
    let error = '';
    
    switch (field) {
      case 'email':
        const emailValidation = validateEmailField(value);
        if (!emailValidation.isValid) {
          error = emailValidation.error;
        }
        break;
      case 'telefono':
        const phoneValidation = validatePhoneField(value);
        if (!phoneValidation.isValid) {
          error = phoneValidation.error;
        }
        break;
      case 'direccion':
        const addressValidation = validateAddressField(value);
        if (!addressValidation.isValid) {
          error = addressValidation.error;
        }
        break;
      case 'password':
        const passwordValidation = validatePasswordField(value);
        if (!passwordValidation.isValid) {
          error = passwordValidation.error;
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
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }

    // Marcar el campo como tocado
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));

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
    const allRequiredFieldsFilled = email.trim() !== '' && telefono.trim() !== '' && direccion.trim() !== '';
    setIsValid(!hasErrors && allRequiredFieldsFilled);
  };

  const handleFieldBlur = (field, value) => {
    // Marcar el campo como tocado cuando pierde el foco
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));

    // Validar el campo
    const error = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  const guardarCambios = async () => {
    // Prevenir múltiples envíos
    if (isSubmitting) return;
    
    setIsSubmitting(true);

    // Marcar todos los campos como tocados
    setTouched({
      telefono: true,
      email: true,
      direccion: true,
      password: true
    });

    // Validar todos los campos antes de enviar
    const emailError = validateField('email', email);
    const phoneError = validateField('telefono', telefono);
    const addressError = validateField('direccion', direccion);
    const passwordError = validateField('password', password);

    const newErrors = {
      email: emailError,
      telefono: phoneError,
      direccion: addressError,
      password: passwordError
    };

    setErrors(newErrors);

    // Verificar si hay errores
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    
    if (hasErrors) {
      setIsSubmitting(false);
      Swal.fire({
        icon: 'warning',
        title: t('validation.formErrorsTitle') || 'Errores en el formulario',
        text: t('validation.formErrorsText') || 'Por favor corrige los errores antes de continuar',
        confirmButtonColor: '#39a900'
      });
      return;
    }

    // Verificar que todos los campos requeridos estén llenos
    if (!email.trim() || !telefono.trim() || !direccion.trim()) {
      setIsSubmitting(false);
      Swal.fire({
        icon: 'warning',
        title: t('validation.requiredFieldsTitle') || 'Campos requeridos',
        text: t('validation.requiredFieldsText') || 'Todos los campos son obligatorios',
        confirmButtonColor: '#39a900'
      });
      return;
    }

    try {
      const updateData = {
        telefono,
        email,
        estado: estado || t('labels.active'),
        direccion
      };

      // Solo incluir password si se proporcionó
      if (password && password.trim() !== '') {
        updateData.password = password;
      }

      await axios.put(`http://localhost:3000/api/usuarios/${id}`, updateData);

      const isDarkMode = document.body.classList.contains("dark");
      Swal.fire({
        title: t("alerts.dataUpdatedTitle") || "Datos actualizados",
        text: t("alerts.dataUpdatedText") || "Los datos se han actualizado correctamente",
        icon: "success",
        confirmButtonText: t("general.accept") || "Aceptar",
        confirmButtonColor: "#39a900",
        background: isDarkMode ? "#1e1e1e" : "#fff",
        color: isDarkMode ? "#fff" : "#000"
      }).then(() => {
        navigate('/listcompany');
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: t('alerts.errorTitle') || 'Error',
        text: t('errors.couldNotUpdate') || 'No se pudo actualizar la información',
        confirmButtonColor: '#39a900'
      });
    } finally {
      setIsSubmitting(false);
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
                onBlur={(e) => handleFieldBlur('telefono', e.target.value)}
                placeholder={t('placeholders.phoneNumber')}
                className={errors.telefono && touched.telefono ? 'error-input' : ''}
                disabled={isSubmitting}
              />
              {errors.telefono && touched.telefono && <span className="error-message">{errors.telefono}</span>}
            </div>
            <div className="requirement">
              <h3>{t('labels.email')}</h3>
              <input
                type="email"
                value={email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                onBlur={(e) => handleFieldBlur('email', e.target.value)}
                placeholder={t('placeholders.email')}
                className={errors.email && touched.email ? 'error-input' : ''}
                disabled={isSubmitting}
              />
              {errors.email && touched.email && <span className="error-message">{errors.email}</span>}
            </div>
            <div className="requirement">
              <h3>{t('labels.address')}</h3>
              <input
                type="text"
                value={direccion}
                onChange={(e) => handleFieldChange('direccion', e.target.value)}
                onBlur={(e) => handleFieldBlur('direccion', e.target.value)}
                placeholder={t('placeholders.address')}
                className={errors.direccion && touched.direccion ? 'error-input' : ''}
                disabled={isSubmitting}
              />
              {errors.direccion && touched.direccion && <span className="error-message">{errors.direccion}</span>}
            </div>
            <div className="requirement">
              <h3>{t('labels.password')} <span className="optional-text">({t('labels.optional')})</span></h3>
              <input
                type="password"
                value={password}
                onChange={(e) => handleFieldChange('password', e.target.value)}
                onBlur={(e) => handleFieldBlur('password', e.target.value)}
                placeholder={t('placeholders.password')}
                className={errors.password && touched.password ? 'error-input' : ''}
                disabled={isSubmitting}
              />
              {errors.password && touched.password && <span className="error-message">{errors.password}</span>}
              <small className="help-text">
                {t('validation.passwordHelp') || 'Mínimo 8 caracteres, al menos una letra y un número'}
              </small>
            </div>

            <div className="Box-Button" onClick={isSubmitting ? null : guardarCambios}>
              <ButtonConfirm disabled={isSubmitting || !isValid} />
              {isSubmitting && <span className="loading-text">{t('general.saving') || 'Guardando...'}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCompany;
