import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import './css/businessDiagnosis.css';
import Gov from "../../layout/Gov/Gov";
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons';
import NavBar from '../../layout/NavBar/NavBar';
import BannerHome3 from '../../assets/banners/BannerHome5.png';
import BannerHome4 from '../../assets/banners/BannerHome4.png';
import BannerHome5 from '../../assets/banners/BannerHome14.png';
import { Link, useNavigate } from "react-router-dom";

const BusinessDiagnosis = () => {
  // Estado para el slide actual del carrusel
  const [currentSlide, setCurrentSlide] = useState(0);
  // Estado para el paso actual del formulario (stepper)
  const [currentStep, setCurrentStep] = useState(1);
  // Estado para almacenar los datos ingresados por el usuario en el formulario
  const [userData, setUserData] = useState({
  });

  // Arreglo de imágenes que se mostrarán en el carrusel
  const images = [BannerHome3, BannerHome4, BannerHome5];

  useEffect(() => {
    // Intervalo para cambiar automáticamente la imagen del carrusel cada 3.5 segundos
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, [images.length]);

  // Actualiza el estado userData cuando el usuario escribe en un input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Avanza al siguiente paso del formulario si no es el último
  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  // Retrocede al paso anterior del formulario si no es el primero
  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Hook para navegar entre rutas usando React Router
  const navegar = useNavigate();
  

  // Muestra una alerta de carga usando SweetAlert al enviar el formulario
  const handleSweetAlert = () => {
    let timerInterval;
    Swal.fire({
      title: "Validando informacion!",
      html: "Estamos verificando y procesando tus datos... <br><b></b> segundos.",
      timer: 1500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  };

  return (
    <div id="businessDiagnosis">
      <div className="PageCreateCompany">
        {/* Barra superior de gobierno, iconos y navegación */}
        <Gov />
        <HeaderIcons />
        <NavBar />

        {/* Carrusel de imágenes para ambientar la página */}
        <div className="create-diagnosis-carousel">
          <div className="carousel-container">
            {images.map((image, index) => (
              <div
                key={index}
                className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                style={{ backgroundImage: `url(${image})` }}
              />
            ))}
            {/* Puntos de navegación del carrusel */}
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

        {/* Formulario de diagnóstico empresarial */}
        <div className="create-diagnosis-form">
          <h1>Creación del diagnostico empresarial</h1>
          <p className="form-subtitle">Complete los campos para registrar el diagnostico Empresarial</p>

          {/* Stepper visual para indicar el avance del formulario */}
          <div className="step-indicator">
            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>1</div>
            <div className={`step-line ${currentStep >= 2 ? 'active' : ''}`}></div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>2</div>
          </div>

          {/* Etiquetas de los pasos */}
          <div className="step-labels">
            <span className={currentStep === 1 ? 'active' : ''}> seccion 1</span>
            <span className={currentStep === 2 ? 'active' : ''}> seccion 2</span>
          </div>

          {/* Paso 1: Primer grupo de campos del formulario */}
          {currentStep === 1 && (
            <div className="form-step">
              <h2>Diagnóstico Empresarial Para Asignacion de Aprendices SENA</h2>
              <p className="step-description">Llena el diagnostico para saber que aprendices necesita</p>

              {/* Campos de entrada para el usuario */}
              <div className="form-group">
                <label>1. ¿ Cual es el sector económico principal ?</label>
                <select name="" id="">
                  <option value="">Elijan una opcion</option>
                  <option value="">Industrial</option>
                  <option value="">Comercio</option>
                  <option value="">Servicios</option>
                  <option value="">Agropecuario</option>
                  <option value="">Tecnologías de la informacion</option>
                  <option value="">Otro</option>
                </select>
              </div>


              <div className="form-group">
                <label>2. ¿ Qué nivel educativo busca en los aprendices ?</label>
                <select name="" id="">
                  <option value="">Elijan una opcion</option>
                  <option value="">Técnico</option>
                  <option value="">Tecnólogo</option>
                  <option value="">No tengo preferencia</option>
                </select>
              </div>

              <div className="form-group">
                <label>3. ¿ Le interesan temas como ciberseguridad o protección de datos ?</label>
                <select name="" id="">
                  <option value="">Elijan una opcion</option>
                  <option value="">Sí</option>
                  <option value="">No</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>4. ¿ Usa materiales biodegradables o ecológicos ?</label>
                <select name="" id="">
                  <option value="">Elijan una opcion</option>
                  <option value="">Sí</option>
                  <option value="">No</option>
                </select>
              </div>

              <div className="form-group">
                <label>5. ¿ Utiliza software de diseño y patronaje (Audaces, Optitex, etc.) ?</label>
                <select name="" id="">
                  <option value="">Elijan una opcion</option>
                  <option value="">Sí</option>
                  <option value="">No</option>
                </select>
              </div>

              <div className="form-group">
                <label>6. ¿ Qué insumos utiliza con mayor frecuencia ?</label>
                <select name="" id="">
                  <option value="">Elijan una opcion</option>
                  <option value="">Algodón</option>
                  <option value="">Lona</option>
                  <option value="">Lycra</option>
                  <option value="">Mezclilla</option>
                  <option value="">Otros</option>
                </select>
              </div>
              <div className="form-group">
                <label>7. ¿ Utiliza fresadora o taladro de banco en sus procesos ?</label>
                <select name="" id="">
                  <option value="">Elijan una opcion</option>
                  <option value="">Fresadora</option>
                  <option value="">Taladro de banco</option>
                  <option value="">Ambos</option>
                  <option value="">Otros</option>
                </select>
              </div>

              {/* Botón para avanzar al siguiente paso */}
              <div className="form-navigation">
                <button type="button" className="primary-button" onClick={nextStep}>
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {/* Paso 2: Segundo grupo de campos y envío del formulario */}
          {currentStep === 2 && (
            <div className="form-step">
              <h2>Campo</h2>
              <p className="step-description">Campo</p>

              {/* Campos adicionales del formulario */}
              <div className="form-group">
                <label>8. ¿ Le interesa que los aprendices trabajen directamente en operación de maquinaria ?</label>
                <select name="" id="">
                  <option value="">Elijan una opcion</option>
                  <option value="">Si</option>
                  <option value="">No</option>
                </select>
              </div>

              <div className="form-group">
                <label>9. ¿ Realiza mantenimiento a redes eléctricas ?</label>
                <select name="" id="">
                  <option value="">Elijan una opcion</option>
                  <option value="">Sí, preventivo</option>
                  <option value="">Sí, correctivo</option>
                  <option value="">Ambos</option>
                  <option value="">No</option>
                </select>
              </div>
  
              <div className="form-group">
                <label>10. ¿ Cuenta con herramientas especializadas como multímetros, pinzas amperimétricas o medidores de aislamiento ?</label>
                <select name="" id="">
                  <option value="">Elijan una opcion</option>
                  <option value="">Sí</option>
                  <option value="">No</option>
                </select>
              </div>

              <div className="form-group">
                <label>11. ¿ Aplica normas de seguridad en el trabajo en altura ?</label>
                <select name="" id="">
                  <option value="">Elijan una opcion</option>
                  <option value="">Siempre</option>
                  <option value="">Algunas veces</option>
                  <option value="">Nunca</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>12. ¿ Qué tipo de aprendiz desea recibir ?</label>
                <select name="" id="">
                  <option value="">Elijan una opcion</option>
                  <option value="">Ayudante de obra</option>
                  <option value="">Técnico en construcción</option>
                  <option value="">Tecnólogo en obras civiles</option>
                  <option value="">Otro</option>
                </select>
              </div>

              <div className="form-group">
                <label>13. ¿ Qué tipo de servicios informáticos ofrece o utiliza ?</label>
                <select name="" id="">
                  <option value="">Elijan una opcion</option>
                  <option value="">Instalación de redes</option>
                  <option value="">Mantenimiento de hardware</option>
                  <option value="">Configuración de software</option>
                  <option value="">Servicios en la nube</option>
                  <option value="">Todos los anteriores</option>
                  <option value="">Ninguno de los anteriores</option>
                </select>
              </div>

              {/* Botón para enviar el diagnóstico, muestra alerta y navega a resultados */}
              <div className="form-navigation">
                <Link to="/DiagnosisResult">
                <button type="button" className="primary-button" onClick={handleSweetAlert}>
                  enviar diagnostico
                </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Exporta el componente principal para su uso en otras partes de la app
export default BusinessDiagnosis;