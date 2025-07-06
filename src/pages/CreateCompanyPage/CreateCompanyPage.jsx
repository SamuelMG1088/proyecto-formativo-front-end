import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import './css/createCompany.css';
import Gov from "../../layout/Gov/Gov";
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons';
import NavBar from '../../layout/NavBar/NavBar';
import BannerHome3 from '../../assets/images/BannerHome3.png';
import BannerHome4 from '../../assets/images/BannerHome4.png';
import BannerHome5 from '../../assets/images/BannerHome5.png';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CreateCompanyPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({
    documentType: 'C.C',
    documentNumber: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    status: 'active',
    address: '',
    password: '',
    actividad_economica: ''  // nuevo campo
  });

  const images = [BannerHome3, BannerHome4, BannerHome5];
  const navegar = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        id: parseInt(userData.documentNumber),
        tipo_documento: userData.documentType === "C.C"
          ? "Cédula de ciudadanía"
          : userData.documentType === "NIT"
          ? "NIT"
          : "Cédula de extranjería",
        nombre: userData.firstName,
        apellido: userData.lastName,
        telefono: userData.phone,
        email: userData.email,
        estado: userData.status === "active" ? "Activo" : "Inactivo",
        password: userData.password,
        direccion: userData.address,
        actividad_economica: userData.actividad_economica // tomarlo del formulario
      };

      const response = await axios.post('http://localhost:3000/api/usuarios', payload);

      Swal.fire({
        title: '¡Usuario creado!',
        text: response.data.message || 'La cuenta fue registrada correctamente.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#00304d'
      }).then((result) => {
        if (result.isConfirmed) {
          navegar('/listcompany');
        }
      });

    } catch (error) {
      console.error('Error al crear el usuario:', error.response?.data || error);
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.message || 'No se pudo registrar el usuario. Verifica los datos.',
        icon: 'error',
        confirmButtonText: 'Intentar de nuevo',
        confirmButtonColor: '#d33'
      });
    }
  };

  return (
    <div id="CreateCompanyPage">
      <div className="PageCreateCompany">
        <Gov />
        <HeaderIcons />
        <NavBar />

        {/* Carrusel */}
        <div className="create-company-carousel">
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

        {/* Formulario */}
        <div className="create-company-form">
          <h1>Creación de Usuario</h1>
          <p className="form-subtitle">Complete los campos para registrar un nuevo usuario</p>

          {/* Stepper */}
          <div className="step-indicator">
            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>1</div>
            <div className={`step-line ${currentStep >= 2 ? 'active' : ''}`}></div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>2</div>
            <div className={`step-line ${currentStep >= 3 ? 'active' : ''}`}></div>
            <div className={`step ${currentStep === 3 ? 'active' : ''}`}>3</div>
          </div>

          <div className="step-labels">
            <span className={currentStep === 1 ? 'active' : ''}> Información Personal</span>
            <span className={currentStep === 2 ? 'active' : ''}> Datos de Acceso</span>
            <span className={currentStep === 3 ? 'active' : ''}>Confirmación</span>
          </div>

          {/* Paso 1 */}
          {currentStep === 1 && (
            <div className="form-step">
              <h2>Información Personal</h2>
              <p className="step-description">Ingrese los datos personales del usuario</p>

              <div className="form-group">
                <label>Tipo de Documento</label>
                <select name="documentType" value={userData.documentType} onChange={handleInputChange}>
                  <option value="C.C">Cédula de Ciudadanía</option>
                  <option value="NIT">NIT</option>
                  <option value="C.E">Cédula de Extranjería</option>
                </select>
              </div>

              <div className="form-group">
                <label>ID del Usuario</label>
                <input
                  type="number"
                  name="documentNumber"
                  value={userData.documentNumber}
                  onChange={handleInputChange}
                  placeholder="Ingrese el número de documento"
                />
              </div>

              <div className="form-group">
                <label>Nombres</label>
                <input
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleInputChange}
                  placeholder="Ingrese los nombres"
                />
              </div>

              <div className="form-group">
                <label>Apellidos</label>
                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleInputChange}
                  placeholder="Ingrese los apellidos"
                />
              </div>

              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="tel"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  placeholder="Ingrese el número telefónico"
                />
              </div>

              <div className="form-group">
                <label>Actividad Económica</label>
                <select
                  name="actividad_economica"
                  value={userData.actividad_economica}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccione una actividad</option>
                  <option value="Sector primario">Sector primario</option>
                  <option value="Sector secundario">Sector secundario</option>
                  <option value="Sector terciario">Sector terciario</option>
                </select>
              </div>

              <div className="form-navigation">
                <Link to='/listcompany'>
                  <button type="button" className="secondary-button">Anterior</button>
                </Link>
                <button type="button" className="primary-button" onClick={nextStep}>
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {/* Paso 2 */}
          {currentStep === 2 && (
            <div className="form-step">
              <h2>Datos de Acceso</h2>
              <p className="step-description">Configure los datos de acceso del usuario</p>

              <div className="form-group">
                <label>Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  placeholder="Ingrese el correo electrónico"
                />
              </div>

              <div className="form-group">
                <label>Estado del Usuario</label>
                <select name="status" value={userData.status} onChange={handleInputChange}>
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                </select>
              </div>

              <div className="form-group">
                <label>Dirección</label>
                <input
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleInputChange}
                  placeholder="Ingrese la dirección"
                />
              </div>

              <div className="form-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleInputChange}
                  placeholder="Ingrese la contraseña"
                />
              </div>

              <div className="form-navigation">
                <button type="button" className="secondary-button" onClick={prevStep}>
                  Anterior
                </button>
                <button type="button" className="primary-button" onClick={nextStep}>
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {/* Paso 3 */}
          {currentStep === 3 && (
            <div className="form-step">
              <h2>Confirmación</h2>
              <p className="step-description">Revise la información antes de enviar</p>

              <div className="confirmation-details">
                {Object.entries({
                  'Tipo de Documento': userData.documentType,
                  'ID del Usuario': userData.documentNumber,
                  'Nombres': userData.firstName,
                  'Apellidos': userData.lastName,
                  'Teléfono': userData.phone,
                  'Correo Electrónico': userData.email,
                  'Estado': userData.status === 'active' ? 'Activo' : 'Inactivo',
                  'Dirección': userData.address,
                  'Actividad Económica': userData.actividad_economica
                }).map(([label, value]) => (
                  <div className="detail-row" key={label}>
                    <span className="detail-label">{label}:</span>
                    <span className="detail-value">{value}</span>
                  </div>
                ))}
              </div>

              <div className="form-navigation">
                <button type="button" className="secondary-button" onClick={prevStep}>
                  Anterior
                </button>
                <button type="button" className="primary-button" onClick={handleSubmit}>
                  Confirmar y Crear Usuario
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCompanyPage;
