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

  // Estados de validación
  const [errors, setErrors] = useState({
    version: '',
    estado: '',
    lectiva: '',
    productiva: ''
  });

  const [touched, setTouched] = useState({
    version: false,
    estado: false,
    lectiva: false,
    productiva: false
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [BannerHome4, BannerHome6, BannerHome7];


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  // Funciones de validación
  const validateVersion = (value) => {
    if (!value || value.trim() === '') {
      return 'La versión es obligatoria';
    }
    const numValue = Number(value);
    if (isNaN(numValue)) {
      return 'La versión debe ser un número válido';
    }
    if (numValue <= 0) {
      return 'La versión debe ser mayor a 0';
    }
    if (numValue > 999) {
      return 'La versión no puede ser mayor a 999';
    }
    return '';
  };

  const validateEstado = (value) => {
    if (!value || value.trim() === '') {
      return 'El estado es obligatorio';
    }
    if (value.trim().length < 2) {
      return 'El estado debe tener al menos 2 caracteres';
    }
    if (value.trim().length > 50) {
      return 'El estado no puede tener más de 50 caracteres';
    }
    // Validar que solo contenga letras, espacios y algunos caracteres especiales
    const estadoRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-\.]+$/;
    if (!estadoRegex.test(value.trim())) {
      return 'El estado solo puede contener letras, espacios, guiones y puntos';
    }
    return '';
  };

  const validateLectiva = (value) => {
    if (!value || value.trim() === '') {
      return 'La fase lectiva es obligatoria';
    }
    const numValue = Number(value);
    if (isNaN(numValue)) {
      return 'La fase lectiva debe ser un número válido';
    }
    if (numValue < 0) {
      return 'La fase lectiva no puede ser negativa';
    }
    if (numValue > 120) {
      return 'La fase lectiva no puede ser mayor a 120 meses';
    }
    return '';
  };

  const validateProductiva = (value) => {
    if (!value || value.trim() === '') {
      return 'La fase productiva es obligatoria';
    }
    const numValue = Number(value);
    if (isNaN(numValue)) {
      return 'La fase productiva debe ser un número válido';
    }
    if (numValue < 0) {
      return 'La fase productiva no puede ser negativa';
    }
    if (numValue > 120) {
      return 'La fase productiva no puede ser mayor a 120 meses';
    }
    return '';
  };

  // Función para validar un campo específico
  const validateField = (fieldName, value) => {
    let error = '';
    switch (fieldName) {
      case 'version':
        error = validateVersion(value);
        break;
      case 'estado':
        error = validateEstado(value);
        break;
      case 'lectiva':
        error = validateLectiva(value);
        break;
      case 'productiva':
        error = validateProductiva(value);
        break;
      default:
        break;
    }
    return error;
  };

  // Función para validar todo el formulario
  const validateForm = () => {
    const newErrors = {
      version: validateVersion(version),
      estado: validateEstado(estado),
      lectiva: validateLectiva(lectiva),
      productiva: validateProductiva(productiva)
    };
    
    setErrors(newErrors);
    
    // Verificar si hay errores
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    return !hasErrors;
  };

  // Handlers para validación en tiempo real
  const handleFieldChange = (fieldName, value, setter) => {
    setter(value);
    
    // Marcar el campo como tocado
    setTouched(prev => ({
      ...prev,
      [fieldName]: true
    }));
    
    // Validar el campo
    const error = validateField(fieldName, value);
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  };

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

    // Validar el formulario antes de enviar
    if (!validateForm()) {
      Swal.fire({
        title: 'Error de validación',
        text: 'Por favor, corrige los errores en el formulario antes de continuar.',
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
                  onChange={(e) => handleFieldChange('version', e.target.value, setVersion)}
                  className={touched.version && errors.version ? 'error-input' : ''}
                />
                {touched.version && errors.version && (
                  <span className="error-message">{errors.version}</span>
                )}
              </div>

              <div className="requirement">
                <h3>Estado</h3>
                <input
                  type="text"
                  placeholder="Estado del programa"
                  value={estado}
                  onChange={(e) => handleFieldChange('estado', e.target.value, setEstado)}
                  className={touched.estado && errors.estado ? 'error-input' : ''}
                />
                {touched.estado && errors.estado && (
                  <span className="error-message">{errors.estado}</span>
                )}
              </div>

              <div className="requirement">
                <h3>Lectiva</h3>
                <input
                  type="text"  // cambio a text para no confundir al usuario
                  placeholder="Mes lectiva"
                  value={lectiva}
                  onChange={(e) => handleFieldChange('lectiva', e.target.value, setLectiva)}
                  className={touched.lectiva && errors.lectiva ? 'error-input' : ''}
                />
                {touched.lectiva && errors.lectiva && (
                  <span className="error-message">{errors.lectiva}</span>
                )}
              </div>

              <div className="requirement">
                <h3>Productiva</h3>
                <input
                  type="text"  // cambio a text también
                  placeholder="Mes productiva"
                  value={productiva}
                  onChange={(e) => handleFieldChange('productiva', e.target.value, setProductiva)}
                  className={touched.productiva && errors.productiva ? 'error-input' : ''}
                />
                {touched.productiva && errors.productiva && (
                  <span className="error-message">{errors.productiva}</span>
                )}
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
