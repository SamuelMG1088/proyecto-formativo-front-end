import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import './css/businessDiagnosis.css';
import Gov from "../../layout/Gov/Gov";
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons';
import NavBar from '../../layout/NavBar/NavBar';
import BannerHome3 from '../../assets/banners/BannerHome5.png';
import BannerHome4 from '../../assets/banners/BannerHome4.png';
import BannerHome5 from '../../assets/banners/BannerHome14.png';
import axios from "axios";

const BusinessDiagnosis = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [userData, setUserData] = useState({
    sector_economico: '',
    nivel_educativo: '',
    interes_ciberseguridad: null,
    materiales_biodegradables: null,
    software_diseno: null,
    insumos_frecuentes: '',
    herramientas_proceso: '',
    operacion_maquinaria: null,
    mantenimiento_redes: '',
    herramientas_especializadas: null,
    normas_seguridad_altura: '',
    tipo_aprendiz: '',
    servicios_informaticos: ''
  });

  const images = [BannerHome3, BannerHome4, BannerHome5];
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  const getToken = () => {
    return localStorage.getItem('authToken') || localStorage.getItem('token');
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    
    let processedValue = value;
    if (value === t('general.yes') || value === 'Sí' || value === 'Si') {
      processedValue = true;
    } else if (value === t('general.no')) {
      processedValue = false;
    }
    
    setUserData(prevData => ({
      ...prevData,
      [name]: processedValue
    }));
  };

  const validateCurrentStep = () => {
    if (currentStep === 1) {
      const requiredFields = [
        'sector_economico',
        'nivel_educativo', 
        'interes_ciberseguridad',
        'materiales_biodegradables',
        'software_diseno',
        'insumos_frecuentes',
        'herramientas_proceso'
      ];
      
      return requiredFields.every(field => 
        userData[field] !== '' && userData[field] !== null
      );
    } else if (currentStep === 2) {
      const requiredFields = [
        'operacion_maquinaria',
        'mantenimiento_redes',
        'herramientas_especializadas',
        'normas_seguridad_altura',
        'tipo_aprendiz',
        'servicios_informaticos'
      ];
      
      return requiredFields.every(field => 
        userData[field] !== '' && userData[field] !== null
      );
    }
    return false;
  };

  const nextStep = () => {
    if (!validateCurrentStep()) {
      Swal.fire({
        icon: 'warning',
        title: t('diagnosis.incompleteFields'),
        text: t('diagnosis.completeAllFields'),
        confirmButtonText: t('general.understand')
      });
      return;
    }
    
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmitDiagnosis = async () => {
    const token = getToken();
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: t('diagnosis.sessionRequired'),
        text: t('diagnosis.loginRequired'),
        confirmButtonText: t('general.goToLogin')
      }).then(() => {
        navigate('/login');
      });
      return;
    }

    if (!validateCurrentStep()) {
      Swal.fire({
        icon: 'warning',
        title: t('diagnosis.incompleteFields'),
        text: t('diagnosis.completeAllFields'),
        confirmButtonText: t('general.understand')
      });
      return;
    }

    setIsLoading(true);

    try {
      Swal.fire({
        title: t('diagnosis.processing'),
        html: t('diagnosis.analyzingResponses'),
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const response = await axios.post(
        'http://localhost:3000/api/diagnosticos',
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.replace('Bearer ', '')}`
          }
        }
      );

      if (response.data.success) {
        localStorage.setItem('lastDiagnosisId', response.data.data.diagnostico.id);
        
        Swal.fire({
          icon: 'success',
          title: t('diagnosis.completed'),
          text: t('diagnosis.successfullyProcessed'),
          confirmButtonText: t('diagnosis.viewResults'),
          confirmButtonColor: '#39a900',
        }).then(() => {
          navigate('/DiagnosisResult', { 
            state: { 
              diagnostico: response.data.data.diagnostico 
            }
          });
        });
      } else {
        throw new Error(response.data.message || t('diagnosis.serverError'));
      }
    } catch (error) {
      let errorMessage = t('diagnosis.processingError');
      
      if (error.response?.status === 401) {
        errorMessage = t('diagnosis.sessionExpired');
        localStorage.removeItem('authToken');
        localStorage.removeItem('token');
        
        Swal.fire({
          icon: 'warning',
          title: t('diagnosis.sessionExpiredTitle'),
          text: errorMessage,
          confirmButtonText: t('general.goToLogin')
        }).then(() => {
          navigate('/login');
        });
        return;
      }
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.errors) {
        errorMessage = error.response.data.errors.join(', ');
      } else if (error.message) {
        errorMessage = error.message;
      }

      Swal.fire({
        icon: 'error',
        title: t('diagnosis.processingErrorTitle'),
        text: errorMessage,
        confirmButtonText: t('general.tryAgain')
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="businessDiagnosis">
      <div className="PageCreateCompany">
        <Gov />
        <HeaderIcons />
        <NavBar />
        
        <div className="create-diagnosis-carousel">
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

        <div className="create-diagnosis-form">
          <h1>{t('diagnosis.createBusinessDiagnosis')}</h1>
          <p className="form-subtitle">{t('diagnosis.completeFields')}</p>
          
          <div className="step-indicator">
            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>1</div>
            <div className={`step-line ${currentStep >= 2 ? 'active' : ''}`}></div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>2</div>
          </div>
          
          <div className="step-labels">
            <span className={currentStep === 1 ? 'active' : ''}>{t('diagnosis.section')} 1</span>
            <span className={currentStep === 2 ? 'active' : ''}>{t('diagnosis.section')} 2</span>
          </div>

          {currentStep === 1 && (
            <div className="form-step">
              <h2>{t('diagnosis.section1Title')}</h2>
              <p className="step-description">{t('diagnosis.section1Description')}</p>
              
              <div className="form-group">
                <label>1. {t('diagnosis.economicSector')}</label>
                <select 
                  name="sector_economico" 
                  value={userData.sector_economico}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="">{t('general.chooseOption')}</option>
                  <option value="Industria">{t('diagnosis.industrial')}</option>
                  <option value="Comercio">{t('diagnosis.commerce')}</option>
                  <option value="Servicios">{t('diagnosis.services')}</option>
                  <option value="Agropecuario">{t('diagnosis.agricultural')}</option>
                  <option value="Tecnologías de la información">{t('diagnosis.it')}</option>
                  <option value="Otro">{t('general.other')}</option>
                </select>
              </div>

              <div className="form-group">
                <label>2. {t('diagnosis.educationLevel')}</label>
                <select 
                  name="nivel_educativo"
                  value={userData.nivel_educativo}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="">{t('general.chooseOption')}</option>
                  <option value="Técnico">{t('diagnosis.technical')}</option>
                  <option value="Tecnólogo">{t('diagnosis.technologist')}</option>
                  <option value="No tengo preferencia">{t('diagnosis.noPreference')}</option>
                </select>
              </div>

              <div className="form-group">
                <label>3. {t('diagnosis.cybersecurityInterest')}</label>
                <select 
                  name="interes_ciberseguridad"
                  value={userData.interes_ciberseguridad === null ? '' : userData.interes_ciberseguridad ? t('general.yes') : t('general.no')}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="">{t('general.chooseOption')}</option>
                  <option value={t('general.yes')}>{t('general.yes')}</option>
                  <option value={t('general.no')}>{t('general.no')}</option>
                </select>
              </div>

              <div className="form-group">
                <label>4. {t('diagnosis.biodegradableMaterials')}</label>
                <select 
                  name="materiales_biodegradables"
                  value={userData.materiales_biodegradables === null ? '' : userData.materiales_biodegradables ? t('general.yes') : t('general.no')}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="">{t('general.chooseOption')}</option>
                  <option value={t('general.yes')}>{t('general.yes')}</option>
                  <option value={t('general.no')}>{t('general.no')}</option>
                </select>
              </div>

              <div className="form-group">
                <label>5. {t('diagnosis.designSoftware')}</label>
                <select 
                  name="software_diseno"
                  value={userData.software_diseno === null ? '' : userData.software_diseno ? t('general.yes') : t('general.no')}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="">{t('general.chooseOption')}</option>
                  <option value={t('general.yes')}>{t('general.yes')}</option>
                  <option value={t('general.no')}>{t('general.no')}</option>
                </select>
              </div>

              <div className="form-group">
                <label>6. {t('diagnosis.frequentSupplies')}</label>
                <select 
                  name="insumos_frecuentes"
                  value={userData.insumos_frecuentes}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="">{t('general.chooseOption')}</option>
                  <option value="Algodón">{t('diagnosis.cotton')}</option>
                  <option value="Lona">{t('diagnosis.canvas')}</option>
                  <option value="Lycra">{t('diagnosis.lycra')}</option>
                  <option value="Mezclilla">{t('diagnosis.denim')}</option>
                  <option value="Otros">{t('general.others')}</option>
                </select>
              </div>

              <div className="form-group">
                <label>7. {t('diagnosis.processTools')}</label>
                <select 
                  name="herramientas_proceso"
                  value={userData.herramientas_proceso}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="">{t('general.chooseOption')}</option>
                  <option value="Fresadora">{t('diagnosis.millingMachine')}</option>
                  <option value="Taladro de banco">{t('diagnosis.drillPress')}</option>
                  <option value="Ambos">{t('general.both')}</option>
                  <option value="Ninguno">{t('general.none')}</option>
                </select>
              </div>

              <div className="form-navigation">
                <button 
                  type="button" 
                  className="primary-button" 
                  onClick={nextStep}
                  disabled={isLoading}
                >
                  {t('general.next')}
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="form-step">
              <h2>{t('diagnosis.section2Title')}</h2>
              <p className="step-description">{t('diagnosis.completeRemainingInfo')}</p>

              <div className="form-group">
                <label>8. {t('diagnosis.machineryOperation')}</label>
                <select 
                  name="operacion_maquinaria"
                  value={userData.operacion_maquinaria === null ? '' : userData.operacion_maquinaria ? t('general.yes') : t('general.no')}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="">{t('general.chooseOption')}</option>
                  <option value={t('general.yes')}>{t('general.yes')}</option>
                  <option value={t('general.no')}>{t('general.no')}</option>
                </select>
              </div>

              <div className="form-group">
                <label>9. {t('diagnosis.electricalMaintenance')}</label>
                <select 
                  name="mantenimiento_redes"
                  value={userData.mantenimiento_redes}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="">{t('general.chooseOption')}</option>
                  <option value="Sí, preventivo">{t('diagnosis.preventive')}</option>
                  <option value="Sí, correctivo">{t('diagnosis.corrective')}</option>
                  <option value="Ambos">{t('general.both')}</option>
                  <option value="No">{t('general.no')}</option>
                </select>
              </div>

              <div className="form-group">
                <label>10. {t('diagnosis.specializedTools')}</label>
                <select 
                  name="herramientas_especializadas"
                  value={userData.herramientas_especializadas === null ? '' : userData.herramientas_especializadas ? t('general.yes') : t('general.no')}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="">{t('general.chooseOption')}</option>
                  <option value={t('general.yes')}>{t('general.yes')}</option>
                  <option value={t('general.no')}>{t('general.no')}</option>
                </select>
              </div>

              <div className="form-group">
                <label>11. {t('diagnosis.heightSafety')}</label>
                <select 
                  name="normas_seguridad_altura"
                  value={userData.normas_seguridad_altura}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="">{t('general.chooseOption')}</option>
                  <option value="Siempre">{t('general.always')}</option>
                  <option value="Algunas veces">{t('general.sometimes')}</option>
                  <option value="Nunca">{t('general.never')}</option>
                </select>
              </div>

              <div className="form-group">
                <label>12. {t('diagnosis.apprenticeType')}</label>
                <select 
                  name="tipo_aprendiz"
                  value={userData.tipo_aprendiz}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="">{t('general.chooseOption')}</option>
                  <option value="Ayudante de obra">{t('diagnosis.constructionHelper')}</option>
                  <option value="Técnico en construcción">{t('diagnosis.constructionTechnician')}</option>
                  <option value="Tecnólogo en obras civiles">{t('diagnosis.civilWorksTechnologist')}</option>
                  <option value="Otro">{t('general.other')}</option>
                </select>
              </div>

              <div className="form-group">
                <label>13. {t('diagnosis.itServices')}</label>
                <select 
                  name="servicios_informaticos"
                  value={userData.servicios_informaticos}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="">{t('general.chooseOption')}</option>
                  <option value="Instalación de redes">{t('diagnosis.networkInstallation')}</option>
                  <option value="Mantenimiento de hardware">{t('diagnosis.hardwareMaintenance')}</option>
                  <option value="Configuración de software">{t('diagnosis.softwareConfiguration')}</option>
                  <option value="Servicios en la nube">{t('diagnosis.cloudServices')}</option>
                  <option value="Todos los anteriores">{t('diagnosis.allAbove')}</option>
                  <option value="Ninguno de los anteriores">{t('diagnosis.noneAbove')}</option>
                </select>
              </div>

              <div className="navigation-form">
                <button 
                  type="button" 
                  className="button-secondary" 
                  onClick={prevStep}
                  disabled={isLoading}
                >
                  {t('general.previous')}
                </button>
                <button 
                  type="button" 
                  className="button-primary" 
                  onClick={handleSubmitDiagnosis}
                  disabled={isLoading}
                >
                  {isLoading ? t('general.sending') : t('diagnosis.submitDiagnosis')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessDiagnosis;