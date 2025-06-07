import React, { useState, useEffect } from "react";
import './css/createCompany.css';
import Gov from "../../layout/Gov/Gov";
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons';
import NavBar from '../../layout/NavBar/NavBar';
import BannerHome3 from '../../assets/images/BannerHome3.png';
import BannerHome4 from '../../assets/images/BannerHome4.png';
import BannerHome5 from '../../assets/images/BannerHome5.png';

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
    role: 'Empresa',
    address: '',
    password: ''
  });

  const images = [BannerHome3, BannerHome4, BannerHome5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div id="CreateCompanyPage">
      <div className="PageCreateCompany">
        <Gov />
        <HeaderIcons />
        <NavBar />
        
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
        
        <div className="create-company-form">
          <h1>Creación de Usuario</h1>
          <p className="form-subtitle">Complete los campos para registrar un nuevo usuario</p>
          
          <div className="step-indicator">
            <div className={`step ${currentStep === 1 ? 'active' : ''}`}>1</div>
            <div className="step-line"></div>
            <div className={`step ${currentStep === 2 ? 'active' : ''}`}>2</div>
            <div className="step-line"></div>
            <div className={`step ${currentStep === 3 ? 'active' : ''}`}>3</div>
          </div>
          
          <div className="step-labels">
            <span className={currentStep === 1 ? 'active' : ''}>Información Personal</span>
            <span className={currentStep === 2 ? 'active' : ''}>Datos de Acceso</span>
            <span className={currentStep === 3 ? 'active' : ''}>Confirmación</span>
          </div>
          
          {currentStep === 1 && (
            <div className="form-step">
              <h2>Información Personal</h2>
              <p className="step-description">Ingrese los datos personales del usuario</p>
              
              <div className="form-group">
                <label>Tipo de Documento</label>
                <select 
                  name="documentType" 
                  value={userData.documentType} 
                  onChange={handleInputChange}
                >
                  <option value="C.C">Cédula de Ciudadanía</option>
                  <option value="NIT">NIT</option>
                  <option value="C.E">Cédula de Extranjería</option>
                </select> 
              </div>
              
              <div className="form-group">
                <label>Número de Documento</label>
                <input
                  type="text"
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
              
              <div className="form-navigation">
                <button type="button" className="secondary-button" disabled>
                  Anterior
                </button>
                <button type="button" className="primary-button" onClick={nextStep}>
                  Siguiente
                </button>
              </div>
            </div>
          )}
          
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
                <select 
                  name="status" 
                  value={userData.status} 
                  onChange={handleInputChange}
                >
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Rol del Usuario</label>
                <select 
                  name="role" 
                  value={userData.role} 
                  onChange={handleInputChange}
                >
                  <option value="Administrador">Administrador</option>
                  <option value="Empresa">Empresa</option>
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
          
          {currentStep === 3 && (
            <div className="form-step">
              <h2>Confirmación</h2>
              <p className="step-description">Revise la información antes de enviar</p>
              
              <div className="confirmation-details">
                <div className="detail-row">
                  <span className="detail-label">Tipo de Documento:</span>
                  <span className="detail-value">{userData.documentType}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Número de Documento:</span>
                  <span className="detail-value">{userData.documentNumber}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Nombres:</span>
                  <span className="detail-value">{userData.firstName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Apellidos:</span>
                  <span className="detail-value">{userData.lastName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Teléfono:</span>
                  <span className="detail-value">{userData.phone}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Correo Electrónico:</span>
                  <span className="detail-value">{userData.email}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Estado:</span>
                  <span className="detail-value">{userData.status === 'active' ? 'Activo' : 'Inactivo'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Rol:</span>
                  <span className="detail-value">{userData.role}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Dirección:</span>
                  <span className="detail-value">{userData.address}</span>
                </div>
              </div>
              
              <div className="form-navigation">
                <button type="button" className="secondary-button" onClick={prevStep}>
                  Anterior
                </button>
                <button type="button" className="primary-button">
                  Confirmar y Crear Usuario
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateCompanyPage;