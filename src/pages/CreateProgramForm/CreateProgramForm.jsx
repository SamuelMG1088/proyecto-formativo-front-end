import React, { useState, useEffect } from 'react';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import BannerHome4 from '../../assets/banners/BannerHome4.png';
import BannerHome6 from '../../assets/banners/BannerHome6.png';
import BannerHome7 from '../../assets/banners/BannerHome7.png';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import Swal from "sweetalert2";
import './css/createProgramForm.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const CreateProgram = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({
    programcode: '',
    programversion: '',
    programname: '',
    programduration: '',
    traininglevel: '',
    programarea: '',
    occupationalprofile: '',
    RAE: '',
    lectiva: '',
    productiva: '',
    competencia: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const navegar = useNavigate();

  const handleSubmit = async () => {
    try {
      const payload = {
        id: parseInt(userData.programcode),
        nombre: userData.programname,
        version: parseInt(userData.programversion),
        duracion: userData.programduration,
        nivel: userData.traininglevel,
        area_vinculada: userData.programarea,
        id_perfil: Math.floor(Math.random() * 10000),
        nombre_perfil: userData.occupationalprofile,
        estado: "Activo",
        id_rae: Math.floor(Math.random() * 10000),
        rae: userData.RAE,
        lectiva: userData.lectiva,
        productiva: userData.productiva,
        competencia: userData.competencia
      };

      const response = await axios.post('http://localhost:3000/api/programas', payload);

      const isDarkMode = document.body.classList.contains("dark");

      Swal.fire({
        icon: 'success',
        title: t('createProgram.success.title'),
        text: response.data.message || t('createProgram.success.message'),
        confirmButtonText: 'OK',
        confirmButtonColor: "#39a900",
        background: isDarkMode ? "#1e1e1e" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
      }).then((result) => {
        if (result.isConfirmed) {
          navegar('/listProgram');
        }
      });
    } catch (error) {
      console.error('Error al crear el programa:', error.response?.data || error);

      const isDarkMode = document.body.classList.contains("dark");
      
      Swal.fire({
        icon: 'error',
        title: t('createProgram.error.title'),
        text: error.response?.data?.message || t('createProgram.error.message'),
        confirmButtonText: t('createProgram.error.button'),
         background: isDarkMode ? "#1e1e1e" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
        confirmButtonColor: isDarkMode ? "#39a900" : "#d33",
      });
    }
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [BannerHome4, BannerHome6, BannerHome7];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div id="CreateProgram">
      <div className="Create">
        <Gov />
        <HeaderIcons />
        <NavBar />

        <div className="Create-carousel">
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
          <h1>{t('createProgram.form.title')}</h1>
          <p className="form-subtitle">{t('createProgram.form.subtitle')}</p>

          <div className="step-indicator">
            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>1</div>
            <div className={`step-line ${currentStep >= 2 ? 'active' : ''}`}></div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>2</div>
            <div className={`step-line ${currentStep >= 3 ? 'active' : ''}`}></div>
            <div className={`step ${currentStep === 3 ? 'active' : ''}`}>3</div>
          </div>

          <div className="step-labels">
            <span className={currentStep === 1 ? 'active' : ''}>{t('createProgram.steps.step1')}</span>
            <span className={currentStep === 2 ? 'active' : ''}>{t('createProgram.steps.step2')}</span>
            <span className={currentStep === 3 ? 'active' : ''}>{t('createProgram.steps.step3')}</span>
          </div>

          {currentStep === 1 && (
            <div className="form-step">
              <div className="form-group">
                <label>{t('createProgram.fields.programCode')}</label>
                <input 
                  type="number" 
                  name="programcode" 
                  value={userData.programcode} 
                  onChange={handleInputChange} 
                  placeholder={t('createProgram.placeholders.programCode')} 
                />
              </div>
              <div className="form-group">
                <label>{t('createProgram.fields.version')}</label>
                <input 
                  type="text" 
                  name="programversion" 
                  value={userData.programversion} 
                  onChange={handleInputChange} 
                  placeholder={t('createProgram.placeholders.version')} 
                />
              </div>
              <div className="form-group">
                <label>{t('createProgram.fields.programName')}</label>
                <input 
                  type="text" 
                  name="programname" 
                  value={userData.programname} 
                  onChange={handleInputChange} 
                  placeholder={t('createProgram.placeholders.programName')} 
                />
              </div>
              <div className="form-group">
                <label>{t('createProgram.fields.duration')}</label>
                <input 
                  type="text" 
                  name="programduration" 
                  value={userData.programduration} 
                  onChange={handleInputChange} 
                  placeholder={t('createProgram.placeholders.duration')} 
                />
              </div>
              <div className="form-navigation">
                <Link to='/ListProgram'>
                  <button type="button" className="secondary-button">
                    {t('createProgram.buttons.previous')}
                  </button>
                </Link>
                <button 
                  type="button" 
                  className="primary-button" 
                  onClick={nextStep}
                >
                  {t('createProgram.buttons.next')}
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="form-step">
              <div className="form-group">
                <label>{t('createProgram.fields.trainingLevel')}</label>
                <select 
                  name="traininglevel" 
                  value={userData.traininglevel} 
                  onChange={handleInputChange}
                >
                  <option value="">{t('createProgram.selectDefault')}</option>
                  <option value="Tecnico">{t('createProgram.options.technical')}</option>
                  <option value="Tecnologo">{t('createProgram.options.technologist')}</option>
                  <option value="Auxiliar">{t('createProgram.options.auxiliary')}</option>
                  <option value="Operario">{t('createProgram.options.operator')}</option>
                </select>
              </div>
              <div className="form-group">
                <label>{t('createProgram.fields.linkedArea')}</label>
                <select 
                  name="programarea" 
                  value={userData.programarea} 
                  onChange={handleInputChange}
                >
                  <option value="">{t('createProgram.selectArea')}</option>
                  <option value="Teleinformática">{t('createProgram.options.teleinformatics')}</option>
                  <option value="Soldadura">{t('createProgram.options.welding')}</option>
                  <option value="Mecánica">{t('createProgram.options.mechanics')}</option>
                  <option value="Electricidad">{t('createProgram.options.electricity')}</option>
                  <option value="Construcción">{t('createProgram.options.construction')}</option>
                  <option value="Confecciones">{t('createProgram.options.clothing')}</option>
                </select>
              </div>
              <div className="form-group">
                <label>{t('createProgram.fields.occupationalProfile')}</label>
                <input 
                  type="text" 
                  name="occupationalprofile" 
                  value={userData.occupationalprofile} 
                  onChange={handleInputChange} 
                  placeholder={t('createProgram.placeholders.profile')} 
                />
              </div>
              <div className="form-group">
                <label>{t('createProgram.fields.RAE')}</label>
                <input 
                  type="text" 
                  name="RAE" 
                  value={userData.RAE} 
                  onChange={handleInputChange} 
                  placeholder={t('createProgram.placeholders.RAE')} 
                />
              </div>
              <div className="form-group">
                <label>{t('createProgram.fields.lectivaDuration')}</label>
                <input 
                  type="text" 
                  name="lectiva" 
                  value={userData.lectiva} 
                  onChange={handleInputChange} 
                  placeholder={t('createProgram.placeholders.lectiva')} 
                />
              </div>
              <div className="form-group">
                <label>{t('createProgram.fields.productivaDuration')}</label>
                <input 
                  type="text" 
                  name="productiva" 
                  value={userData.productiva} 
                  onChange={handleInputChange} 
                  placeholder={t('createProgram.placeholders.productiva')} 
                />
              </div>
              <div className="form-group">
                <label>{t('createProgram.fields.competence')}</label>
                <input 
                  type="text" 
                  name="competencia" 
                  value={userData.competencia} 
                  onChange={handleInputChange} 
                  placeholder={t('createProgram.placeholders.competence')} 
                />
              </div>
              <div className="form-navigation">
                <button 
                  type="button" 
                  className="secondary-button" 
                  onClick={prevStep}
                >
                  {t('createProgram.buttons.previous')}
                </button>
                <button 
                  type="button" 
                  className="primary-button" 
                  onClick={nextStep}
                >
                  {t('createProgram.buttons.next')}
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="form-step">
              <h2>{t('createProgram.confirmation.title')}</h2>
              <p className="step-description">{t('createProgram.confirmation.description')}</p>
              <div className="confirmation-details">
                {Object.entries({
                  [t('createProgram.fields.programCode')]: userData.programcode,
                  [t('createProgram.fields.version')]: userData.programversion,
                  [t('createProgram.fields.programName')]: userData.programname,
                  [t('createProgram.fields.duration')]: userData.programduration,
                  [t('createProgram.fields.trainingLevel')]: userData.traininglevel,
                  [t('createProgram.fields.linkedArea')]: userData.programarea,
                  [t('createProgram.fields.occupationalProfile')]: userData.occupationalprofile,
                  [t('createProgram.fields.RAE')]: userData.RAE,
                  [t('createProgram.fields.lectivaDuration')]: userData.lectiva,
                  [t('createProgram.fields.productivaDuration')]: userData.productiva,
                  [t('createProgram.fields.competence')]: userData.competencia
                }).map(([label, value]) => (
                  <div className="detail-row" key={label}>
                    <span className="detail-label">{label}:</span>
                    <span className="detail-value">{value}</span>
                  </div>
                ))}
              </div>
              <div className="form-navigation">
                <button 
                  type="button" 
                  className="secondary-button" 
                  onClick={prevStep}
                >
                  {t('createProgram.buttons.previous')}
                </button>
                <button 
                  type="button" 
                  className="primary-button" 
                  onClick={handleSubmit}
                >
                  {t('createProgram.buttons.confirm')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateProgram;