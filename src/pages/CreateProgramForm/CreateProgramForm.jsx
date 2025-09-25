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

  // Estado para errores de validación
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Funciones de validación
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'programcode':
        if (!value.trim()) {
          error = 'El código del programa es obligatorio';
        } else if (!/^\d+$/.test(value)) {
          error = 'El código debe contener solo números';
        } else if (parseInt(value) <= 0) {
          error = 'El código debe ser mayor a 0';
        }else if (value.length < 5) {
          error = 'El código debe contener al menos 5 dígitos';
        }
        break;

      case 'programversion':
        if (!value.trim()) {
          error = 'La versión es obligatoria';
        } else if (!/^\d+$/.test(value)) {
          error = 'La versión debe contener solo números';
        } else if (parseInt(value) <= 0) {
          error = 'La versión debe ser mayor a 0';
        }
        break;

      case 'programname':
        if (!value.trim()) {
          error = 'El nombre del programa es obligatorio';
        } else if (value.trim().length < 3) {
          error = 'El nombre debe tener al menos 3 caracteres';
        } else if (value.trim().length > 100) {
          error = 'El nombre no puede exceder 100 caracteres';
        }
        break;

      case 'programduration':
        if (!value.trim()) {
          error = 'La duración es obligatoria';
        } else if (!/^\d+$/.test(value)) {
          error = 'La duración debe contener solo números';
        } else if (parseInt(value) <= 0) {
          error = 'La duración debe ser mayor a 0';
        } else if (parseInt(value) > 10000) {
          error = 'La duración no puede exceder 10000 horas';
        }
        break;

      case 'traininglevel':
        if (!value) {
          error = 'Debe seleccionar un nivel de formación';
        }
        break;

      case 'programarea':
        if (!value) {
          error = 'Debe seleccionar un área vinculada';
        }
        break;

      case 'occupationalprofile':
        if (!value.trim()) {
          error = 'El perfil ocupacional es obligatorio';
        } else if (value.trim().length < 5) {
          error = 'El perfil debe tener al menos 5 caracteres';
        } else if (value.trim().length > 200) {
          error = 'El perfil no puede exceder 200 caracteres';
        }
        break;

      case 'RAE':
        if (!value.trim()) {
          error = 'El RAE es obligatorio';
        } else if (value.trim().length < 10) {
          error = 'El RAE debe tener al menos 10 caracteres';
        } else if (value.trim().length > 500) {
          error = 'El RAE no puede exceder 500 caracteres';
        }
        break;

      case 'lectiva':
        if (!value.trim()) {
          error = 'La duración lectiva es obligatoria';
        } else if (!/^\d+$/.test(value)) {
          error = 'La duración lectiva debe contener solo números';
        } else if (parseInt(value) < 0) {
          error = 'La duración lectiva no puede ser negativa';
        } else if (parseInt(value) > 5000) {
          error = 'La duración lectiva no puede exceder 5000 horas';
        }
        break;

      case 'productiva':
        if (!value.trim()) {
          error = 'La duración productiva es obligatoria';
        } else if (!/^\d+$/.test(value)) {
          error = 'La duración productiva debe contener solo números';
        } else if (parseInt(value) < 0) {
          error = 'La duración productiva no puede ser negativa';
        } else if (parseInt(value) > 5000) {
          error = 'La duración productiva no puede exceder 5000 horas';
        }
        break;

      case 'competencia':
        if (!value.trim()) {
          error = 'La competencia es obligatoria';
        } else if (value.trim().length < 10) {
          error = 'La competencia debe tener al menos 10 caracteres';
        } else if (value.trim().length > 300) {
          error = 'La competencia no puede exceder 300 caracteres';
        }
        break;

      default:
        break;
    }

    return error;
  };

  const validateStep = (step) => {
    const stepErrors = {};
    
    if (step === 1) {
      ['programcode', 'programversion', 'programname', 'programduration'].forEach(field => {
        const error = validateField(field, userData[field]);
        if (error) stepErrors[field] = error;
      });
    } else if (step === 2) {
      ['traininglevel', 'programarea', 'occupationalprofile', 'RAE', 'lectiva', 'productiva', 'competencia'].forEach(field => {
        const error = validateField(field, userData[field]);
        if (error) stepErrors[field] = error;
      });
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    
    // Validación en tiempo real
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    } else {
      // Marcar todos los campos del paso actual como tocados
      const fieldsToTouch = currentStep === 1 
        ? ['programcode', 'programversion', 'programname', 'programduration']
        : ['traininglevel', 'programarea', 'occupationalprofile', 'RAE', 'lectiva', 'productiva', 'competencia'];
      
      const newTouched = {};
      fieldsToTouch.forEach(field => {
        newTouched[field] = true;
      });
      setTouched(prev => ({ ...prev, ...newTouched }));
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const navegar = useNavigate();

  const handleSubmit = async () => {
    // Validar todos los campos antes de enviar
    const allFields = ['programcode', 'programversion', 'programname', 'programduration', 
                      'traininglevel', 'programarea', 'occupationalprofile', 'RAE', 
                      'lectiva', 'productiva', 'competencia'];
    
    const finalErrors = {};
    allFields.forEach(field => {
      const error = validateField(field, userData[field]);
      if (error) finalErrors[field] = error;
    });

    if (Object.keys(finalErrors).length > 0) {
      setErrors(finalErrors);
      setTouched(prev => {
        const newTouched = { ...prev };
        allFields.forEach(field => {
          newTouched[field] = true;
        });
        return newTouched;
      });
      
      Swal.fire({
        title: 'Error de validación',
        text: 'Por favor, corrija los errores en el formulario antes de continuar.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d33'
      });
      return;
    }

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

      Swal.fire({
        title: t('createProgram.success.title'),
        text: response.data.message || t('createProgram.success.message'),
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#39a900'
      }).then((result) => {
        if (result.isConfirmed) {
          navegar('/listProgram');
        }
      });
    } catch (error) {
      console.error('Error al crear el programa:', error.response?.data || error);
      Swal.fire({
        title: t('createProgram.error.title'),
        text: error.response?.data?.message || t('createProgram.error.message'),
        icon: 'error',
        confirmButtonText: t('createProgram.error.button'),
        confirmButtonColor: '#d33'
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
                  onBlur={handleBlur}
                  placeholder={t('createProgram.placeholders.programCode')}
                  className={errors.programcode && touched.programcode ? 'error' : ''}
                />
                {errors.programcode && touched.programcode && (
                  <span className="error-message">{errors.programcode}</span>
                )}
              </div>
              <div className="form-group">
                <label>{t('createProgram.fields.version')}</label>
                <input 
                  type="text" 
                  name="programversion" 
                  value={userData.programversion} 
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder={t('createProgram.placeholders.version')}
                  className={errors.programversion && touched.programversion ? 'error' : ''}
                />
                {errors.programversion && touched.programversion && (
                  <span className="error-message">{errors.programversion}</span>
                )}
              </div>
              <div className="form-group">
                <label>{t('createProgram.fields.programName')}</label>
                <input 
                  type="text" 
                  name="programname" 
                  value={userData.programname} 
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder={t('createProgram.placeholders.programName')}
                  className={errors.programname && touched.programname ? 'error' : ''}
                />
                {errors.programname && touched.programname && (
                  <span className="error-message">{errors.programname}</span>
                )}
              </div>
              <div className="form-group">
                <label>{t('createProgram.fields.duration')}</label>
                <input 
                  type="text" 
                  name="programduration" 
                  value={userData.programduration} 
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder={t('createProgram.placeholders.duration')}
                  className={errors.programduration && touched.programduration ? 'error' : ''}
                />
                {errors.programduration && touched.programduration && (
                  <span className="error-message">{errors.programduration}</span>
                )}
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
                  onBlur={handleBlur}
                  className={errors.traininglevel && touched.traininglevel ? 'error' : ''}
                >
                  <option value="">{t('createProgram.selectDefault')}</option>
                  <option value="Tecnico">{t('createProgram.options.technical')}</option>
                  <option value="Tecnologo">{t('createProgram.options.technologist')}</option>
                  <option value="Auxiliar">{t('createProgram.options.auxiliary')}</option>
                  <option value="Operario">{t('createProgram.options.operator')}</option>
                </select>
                {errors.traininglevel && touched.traininglevel && (
                  <span className="error-message">{errors.traininglevel}</span>
                )}
              </div>
              <div className="form-group">
                <label>{t('createProgram.fields.linkedArea')}</label>
                <select 
                  name="programarea" 
                  value={userData.programarea} 
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={errors.programarea && touched.programarea ? 'error' : ''}
                >
                  <option value="">{t('createProgram.selectArea')}</option>
                  <option value="Teleinformática">{t('createProgram.options.teleinformatics')}</option>
                  <option value="Soldadura">{t('createProgram.options.welding')}</option>
                  <option value="Mecánica">{t('createProgram.options.mechanics')}</option>
                  <option value="Electricidad">{t('createProgram.options.electricity')}</option>
                  <option value="Construcción">{t('createProgram.options.construction')}</option>
                  <option value="Confecciones">{t('createProgram.options.clothing')}</option>
                </select>
                {errors.programarea && touched.programarea && (
                  <span className="error-message">{errors.programarea}</span>
                )}
              </div>
              <div className="form-group">
                <label>{t('createProgram.fields.occupationalProfile')}</label>
                <input 
                  type="text" 
                  name="occupationalprofile" 
                  value={userData.occupationalprofile} 
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder={t('createProgram.placeholders.profile')}
                  className={errors.occupationalprofile && touched.occupationalprofile ? 'error' : ''}
                />
                {errors.occupationalprofile && touched.occupationalprofile && (
                  <span className="error-message">{errors.occupationalprofile}</span>
                )}
              </div>
              <div className="form-group">
                <label>{t('createProgram.fields.RAE')}</label>
                <input 
                  type="text" 
                  name="RAE" 
                  value={userData.RAE} 
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder={t('createProgram.placeholders.RAE')}
                  className={errors.RAE && touched.RAE ? 'error' : ''}
                />
                {errors.RAE && touched.RAE && (
                  <span className="error-message">{errors.RAE}</span>
                )}
              </div>
              <div className="form-group">
                <label>{t('createProgram.fields.lectivaDuration')}</label>
                <input 
                  type="text" 
                  name="lectiva" 
                  value={userData.lectiva} 
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder={t('createProgram.placeholders.lectiva')}
                  className={errors.lectiva && touched.lectiva ? 'error' : ''}
                />
                {errors.lectiva && touched.lectiva && (
                  <span className="error-message">{errors.lectiva}</span>
                )}
              </div>
              <div className="form-group">
                <label>{t('createProgram.fields.productivaDuration')}</label>
                <input 
                  type="text" 
                  name="productiva" 
                  value={userData.productiva} 
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder={t('createProgram.placeholders.productiva')}
                  className={errors.productiva && touched.productiva ? 'error' : ''}
                />
                {errors.productiva && touched.productiva && (
                  <span className="error-message">{errors.productiva}</span>
                )}
              </div>
              <div className="form-group">
                <label>{t('createProgram.fields.competence')}</label>
                <input 
                  type="text" 
                  name="competencia" 
                  value={userData.competencia} 
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder={t('createProgram.placeholders.competence')}
                  className={errors.competencia && touched.competencia ? 'error' : ''}
                />
                {errors.competencia && touched.competencia && (
                  <span className="error-message">{errors.competencia}</span>
                )}
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