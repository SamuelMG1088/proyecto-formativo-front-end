import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import './css/businessDiagnosis.css';
import Gov from "../../layout/Gov/Gov";
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons';
import NavBar from '../../layout/NavBar/NavBar';
import BannerHome3 from '../../assets/banners/BannerHome5.png';
import BannerHome4 from '../../assets/banners/BannerHome4.png';
import BannerHome5 from '../../assets/banners/BannerHome14.png';
import axios from "axios";

const BusinessDiagnosis = () => {
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
    if (value === 'Sí' || value === 'Si') {
      processedValue = true;
    } else if (value === 'No') {
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
        title: 'Campos incompletos',
        text: 'Por favor complete todos los campos antes de continuar.',
        confirmButtonText: 'Entendido'
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
        title: 'Sesión requerida',
        text: 'Debe iniciar sesión para enviar el diagnóstico.',
        confirmButtonText: 'Ir a Login'
      }).then(() => {
        navigate('/login');
      });
      return;
    }

    if (!validateCurrentStep()) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor complete todos los campos antes de enviar.',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    setIsLoading(true);

    try {
      Swal.fire({
        title: "Procesando diagnóstico...",
        html: "Estamos analizando sus respuestas y generando recomendaciones.",
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
          title: '¡Diagnóstico completado!',
          text: 'Su diagnóstico ha sido procesado exitosamente.',
          confirmButtonText: 'Ver resultados',
          confirmButtonColor: '#39a900',
        }).then(() => {
          navigate('/DiagnosisResult', { 
            state: { 
              diagnostico: response.data.data.diagnostico 
            }
          });
        });
      } else {
        throw new Error(response.data.message || 'Error en la respuesta del servidor');
      }
    } catch (error) {
      let errorMessage = 'Ocurrió un error al procesar su diagnóstico.';
      
      if (error.response?.status === 401) {
        errorMessage = 'Su sesión ha expirado. Por favor inicie sesión nuevamente.';
        localStorage.removeItem('authToken');
        localStorage.removeItem('token');
        
        Swal.fire({
          icon: 'warning',
          title: 'Sesión expirada',
          text: errorMessage,
          confirmButtonText: 'Ir a Login'
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
        title: 'Error al procesar diagnóstico',
        text: errorMessage,
        confirmButtonText: 'Intentar nuevamente'
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
          <h1>Creación del diagnóstico empresarial</h1>
          <p className="form-subtitle">Complete los campos para registrar el diagnóstico Empresarial</p>
          
          <div className="step-indicator">
            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>1</div>
            <div className={`step-line ${currentStep >= 2 ? 'active' : ''}`}></div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>2</div>
          </div>
          
          <div className="step-labels">
            <span className={currentStep === 1 ? 'active' : ''}>Sección 1</span>
            <span className={currentStep === 2 ? 'active' : ''}>Sección 2</span>
          </div>

          {currentStep === 1 && (
            <div className="form-step">
              <h2>Diagnóstico Empresarial Para Asignación de Aprendices SENA</h2>
              <p className="step-description">Llena el diagnóstico para saber qué aprendices necesita</p>
              
              <div className="form-group">
                <label>1. ¿Cuál es el sector económico principal?</label>
                <select 
                  name="sector_economico" 
                  value={userData.sector_economico}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="">Elija una opción</option>
                  <option value="Industria">Industrial</option>
                  <option value="Comercio">Comercio</option>
                  <option value="Servicios">Servicios</option>
                  <option value="Agropecuario">Agropecuario</option>
                  <option value="Tecnologías de la información">Tecnologías de la información</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className="form-group">
                <label>2. ¿Qué nivel educativo busca en los aprendices?</label>
                <select 
                  name="nivel_educativo"
                  value={userData.nivel_educativo}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="">Elija una opción</option>
                  <option value="Técnico">Técnico</option>
                  <option value="Tecnólogo">Tecnólogo</option>
                  <option value="No tengo preferencia">No tengo preferencia</option>
                </select>
              </div>

              <div className="form-group">
                <label>3. ¿Le interesan temas como ciberseguridad o protección de datos?</label>
                <select 
                  name="interes_ciberseguridad"
                  value={userData.interes_ciberseguridad === null ? '' : userData.interes_ciberseguridad ? 'Sí' : 'No'}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="">Elija una opción</option>
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="form-group">
                <label>4. ¿Usa materiales biodegradables o ecológicos?</label>
                <select 
                  name="materiales_biodegradables"
                  value={userData.materiales_biodegradables === null ? '' : userData.materiales_biodegradables ? 'Sí' : 'No'}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="">Elija una opción</option>
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="form-group">
                <label>5. ¿Utiliza software de diseño y patronaje (Audaces, Optitex, etc.)?</label>
                <select 
                  name="software_diseno"
                  value={userData.software_diseno === null ? '' : userData.software_diseno ? 'Sí' : 'No'}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="">Elija una opción</option>
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="form-group">
                <label>6. ¿Qué insumos utiliza con mayor frecuencia?</label>
                <select 
                  name="insumos_frecuentes"
                  value={userData.insumos_frecuentes}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="">Elija una opción</option>
                  <option value="Algodón">Algodón</option>
                  <option value="Lona">Lona</option>
                  <option value="Lycra">Lycra</option>
                  <option value="Mezclilla">Mezclilla</option>
                  <option value="Otros">Otros</option>
                </select>
              </div>

              <div className="form-group">
                <label>7. ¿Utiliza fresadora o taladro de banco en sus procesos?</label>
                <select 
                  name="herramientas_proceso"
                  value={userData.herramientas_proceso}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="">Elija una opción</option>
                  <option value="Fresadora">Fresadora</option>
                  <option value="Taladro de banco">Taladro de banco</option>
                  <option value="Ambos">Ambos</option>
                  <option value="Ninguno">Ninguno</option>
                </select>
              </div>

              <div className="form-navigation">
                <button 
                  type="button" 
                  className="primary-button" 
                  onClick={nextStep}
                  disabled={isLoading}
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="form-step">
              <h2>Diagnóstico Empresarial - Sección 2</h2>
              <p className="step-description">Complete la información restante</p>

              <div className="form-group">
                <label>8. ¿Le interesa que los aprendices trabajen directamente en operación de maquinaria?</label>
                <select 
                  name="operacion_maquinaria"
                  value={userData.operacion_maquinaria === null ? '' : userData.operacion_maquinaria ? 'Sí' : 'No'}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="">Elija una opción</option>
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="form-group">
                <label>9. ¿Realiza mantenimiento a redes eléctricas?</label>
                <select 
                  name="mantenimiento_redes"
                  value={userData.mantenimiento_redes}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="">Elija una opción</option>
                  <option value="Sí, preventivo">Sí, preventivo</option>
                  <option value="Sí, correctivo">Sí, correctivo</option>
                  <option value="Ambos">Ambos</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="form-group">
                <label>10. ¿Cuenta con herramientas especializadas como multímetros, pinzas amperimétricas o medidores de aislamiento?</label>
                <select 
                  name="herramientas_especializadas"
                  value={userData.herramientas_especializadas === null ? '' : userData.herramientas_especializadas ? 'Sí' : 'No'}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="">Elija una opción</option>
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="form-group">
                <label>11. ¿Aplica normas de seguridad en el trabajo en altura?</label>
                <select 
                  name="normas_seguridad_altura"
                  value={userData.normas_seguridad_altura}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="">Elija una opción</option>
                  <option value="Siempre">Siempre</option>
                  <option value="Algunas veces">Algunas veces</option>
                  <option value="Nunca">Nunca</option>
                </select>
              </div>

              <div className="form-group">
                <label>12. ¿Qué tipo de aprendiz desea recibir?</label>
                <select 
                  name="tipo_aprendiz"
                  value={userData.tipo_aprendiz}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="">Elija una opción</option>
                  <option value="Ayudante de obra">Ayudante de obra</option>
                  <option value="Técnico en construcción">Técnico en construcción</option>
                  <option value="Tecnólogo en obras civiles">Tecnólogo en obras civiles</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className="form-group">
                <label>13. ¿Qué tipo de servicios informáticos ofrece o utiliza?</label>
                <select 
                  name="servicios_informaticos"
                  value={userData.servicios_informaticos}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="">Elija una opción</option>
                  <option value="Instalación de redes">Instalación de redes</option>
                  <option value="Mantenimiento de hardware">Mantenimiento de hardware</option>
                  <option value="Configuración de software">Configuración de software</option>
                  <option value="Servicios en la nube">Servicios en la nube</option>
                  <option value="Todos los anteriores">Todos los anteriores</option>
                  <option value="Ninguno de los anteriores">Ninguno de los anteriores</option>
                </select>
              </div>

              <div className="navigation-form">
                <button 
                  type="button" 
                  className="button-secondary" 
                  onClick={prevStep}
                  disabled={isLoading}
                >
                  Anterior
                </button>
                <button 
                  type="button" 
                  className="button-primary" 
                  onClick={handleSubmitDiagnosis}
                  disabled={isLoading}
                >
                  {isLoading ? 'Enviando...' : 'Enviar diagnóstico'}
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