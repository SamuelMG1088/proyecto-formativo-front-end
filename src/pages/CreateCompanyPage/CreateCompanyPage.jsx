import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import './css/createCompany.css';
import Gov from "../../layout/Gov/Gov";
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons';
import NavBar from '../../layout/NavBar/NavBar';
import BannerHome6 from '../../assets/banners/BannerHome6.png';
import BannerHome11 from '../../assets/banners/BannerHome11.png';
import BannerHome13 from '../../assets/banners/BannerHome13.png';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

const CreateCompanyPage = () => {
  const { t } = useTranslation();

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
    actividad_economica: 'Sector primario' // 🔹 Valor inicial válido
  });

  const images = [BannerHome6, BannerHome11, BannerHome13];
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
    // 🔹 Validación extra para actividad económica
    const validValues = ["Sector primario", "Sector secundario", "Sector terciario"];
    if (!validValues.includes(userData.actividad_economica)) {
      Swal.fire({
        title: t('alerts.error'),
        text: t('alerts.invalidEconomicActivity'),
        icon: 'error',
        confirmButtonColor: '#d33'
      });
      return;
    }

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
        actividad_economica: userData.actividad_economica
      };

      const response = await axios.post('http://localhost:3000/api/usuarios', payload);

      Swal.fire({
        title: t('alerts.userCreated'),
        text: response.data.message || t('alerts.accountRegistered'),
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
        title: t('alerts.error'),
        text: error.response?.data?.message || t('alerts.userNotRegistered'),
        icon: 'error',
        confirmButtonText: t('alerts.retry'),
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

        <div className="create-company-form">
          <h1>{t('createUser.title')}</h1>
          <p className="form-subtitle">{t('createUser.subtitle')}</p>

          {/* Stepper */}
          <div className="step-indicator">
            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>1</div>
            <div className={`step-line ${currentStep >= 2 ? 'active' : ''}`}></div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>2</div>
            <div className={`step-line ${currentStep >= 3 ? 'active' : ''}`}></div>
            <div className={`step ${currentStep === 3 ? 'active' : ''}`}>3</div>
          </div>

          <div className="step-labels">
            <span className={currentStep === 1 ? 'active' : ''}>{t('createUser.step1')}</span>
            <span className={currentStep === 2 ? 'active' : ''}>{t('createUser.step2')}</span>
            <span className={currentStep === 3 ? 'active' : ''}>{t('createUser.step3')}</span>
          </div>

          {/* Paso 1 */}
          {currentStep === 1 && (
            <div className="form-step">
              <h2>{t('createUser.step1')}</h2>
              <p className="step-description">{t('createUser.step1Description')}</p>

              <div className="form-group">
                <label>{t('form.documentType')} <span>*</span></label>
                <select name="documentType" value={userData.documentType} onChange={handleInputChange}>
                  <option value="C.C">{t('form.cc')}</option>
                  <option value="NIT">NIT</option>
                  <option value="C.E">{t('form.ce')}</option>
                </select>
              </div>

              <div className="form-group">
                <label>{t('form.userId')}</label>
                <input
                  type="number"
                  name="documentNumber"
                  value={userData.documentNumber}
                  onChange={handleInputChange}
                  placeholder={t('form.enterDocumentNumber')}
                />
              </div>

              <div className="form-group">
                <label>{t('form.firstName')}</label>
                <input
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleInputChange}
                  placeholder={t('form.enterFirstName')}
                />
              </div>

              <div className="form-group">
                <label>{t('form.lastName')}</label>
                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleInputChange}
                  placeholder={t('form.enterLastName')}
                />
              </div>

              <div className="form-group">
                <label>{t('form.phone')}</label>
                <input
                  type="number"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  placeholder={t('form.enterPhone')}
                />
              </div>

              <div className="form-group">
                <label>{t('form.economicActivity')}</label>
                <select
                  name="actividad_economica"
                  value={userData.actividad_economica}
                  onChange={handleInputChange}
                >
                  <option value="Sector primario">{t('form.sectorPrimary')}</option>
                  <option value="Sector secundario">{t('form.sectorSecondary')}</option>
                  <option value="Sector terciario">{t('form.sectorTertiary')}</option>
                </select>
              </div>

              <div className="form-navigation">
                <Link to='/listcompany'>
                  <button type="button" className="secondary-button">{t('buttons.previous')}</button>
                </Link>
                <button type="button" className="primary-button" onClick={nextStep}>
                  {t('buttons.next')}
                </button>
              </div>
            </div>
          )}

          {/* Paso 2 */}
          {currentStep === 2 && (
            <div className="form-step">
              <h2>{t('createUser.step2')}</h2>
              <p className="step-description">{t('createUser.step2Description')}</p>

              <div className="form-group">
                <label>{t('form.email')}</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  placeholder={t('form.enterEmail')}
                />
              </div>

              <div className="form-group">
                <label>{t('form.status')}</label>
                <select name="status" value={userData.status} onChange={handleInputChange}>
                  <option value="active">{t('form.active')}</option>
                  <option value="inactive">{t('form.inactive')}</option>
                </select>
              </div>

              <div className="form-group">
                <label>{t('form.address')}</label>
                <input
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleInputChange}
                  placeholder={t('form.enterAddress')}
                />
              </div>

              <div className="form-group">
                <label>{t('form.password')}</label>
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleInputChange}
                  placeholder={t('form.enterPassword')}
                />
              </div>

              <div className="form-navigation">
                <button type="button" className="secondary-button" onClick={prevStep}>
                  {t('buttons.previous')}
                </button>
                <button type="button" className="primary-button" onClick={nextStep}>
                  {t('buttons.next')}
                </button>
              </div>
            </div>
          )}

          {/* Paso 3 */}
          {currentStep === 3 && (
            <div className="form-step">
              <h2>{t('createUser.step3')}</h2>
              <p className="step-description">{t('createUser.step3Description')}</p>

              <div className="confirmation-details">
                {Object.entries({
                  [t('form.documentType')]: userData.documentType,
                  [t('form.userId')]: userData.documentNumber,
                  [t('form.firstName')]: userData.firstName,
                  [t('form.lastName')]: userData.lastName,
                  [t('form.phone')]: userData.phone,
                  [t('form.email')]: userData.email,
                  [t('form.status')]: userData.status === 'active' ? t('form.active') : t('form.inactive'),
                  [t('form.address')]: userData.address,
                  [t('form.economicActivity')]: userData.actividad_economica
                }).map(([label, value]) => (
                  <div className="detail-row" key={label}>
                    <p className="detail-label">{label}:</p>
                    <p className="detail-value">{value}</p>
                  </div>
                ))}
              </div>

              <div className="form-navigation">
                <button type="button" className="secondary-button" onClick={prevStep}>
                  {t('buttons.previous')}
                </button>
                <button type="button" className="primary-button" onClick={handleSubmit}>
                  {t('buttons.confirmCreateUser')}
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
