import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import './css/businessDiagnosis.css';
import Gov from "../../layout/Gov/Gov";
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons';
import NavBar from '../../layout/NavBar/NavBar';
import BannerHome3 from '../../assets/images/BannerHome3.png';
import BannerHome4 from '../../assets/images/BannerHome4.png';
import BannerHome5 from '../../assets/images/BannerHome5.png';
import { Link, useNavigate } from "react-router-dom";

const businessDiagnosis = () => {
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
      timer.textContent = `${Swal.getTimerLeft()}`;
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
            <span className={currentStep === 1 ? 'active' : ''}> Campo</span>
            <span className={currentStep === 2 ? 'active' : ''}> Campo</span>
          </div>

          {/* Paso 1: Primer grupo de campos del formulario */}
          {currentStep === 1 && (
            <div className="form-step">
              <h2>Campo</h2>
              <p className="step-description">Campo</p>

              {/* Campos de entrada para el usuario */}
              <div className="form-group">
                <label>Campo</label>
                <input
                  type="text"
                  name="documentNumber"
                  value={userData.Campo}
                  onChange={handleInputChange}
                  placeholder="Campo"
                />
              </div>
              

              <div className="form-group">
                <label>Campo</label>
                <input
                  type="text"
                  name="firstName"
                  value={userData.Campo}
                  onChange={handleInputChange}
                  placeholder="Campo"
                />
              </div>

              <div className="form-group">
                <label>Campo</label>
                <input
                  type="text"
                  name="lastName"
                  value={userData.Campo}
                  onChange={handleInputChange}
                  placeholder="Campo"
                />
              </div>

              <div className="form-group">
                <label>Campo</label>
                <input
                  type="tel"
                  name="phone"
                  value={userData.Campo}
                  onChange={handleInputChange}
                  placeholder="Campo"
                />
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
                <label>Campo</label>
                <input
                  type="email"
                  name="email"
                  value={userData.Campo}
                  onChange={handleInputChange}
                  placeholder="Campo"
                />
              </div>

  
              <div className="form-group">
                <label>Campo</label>
                <input
                  type="text"
                  name="address"
                  value={userData.Campo}
                  onChange={handleInputChange}
                  placeholder="Campo"
                />
              </div>

              <div className="form-group">
                <label>Campo</label>
                <input
                  type="password"
                  name="password"
                  value={userData.Campo}
                  onChange={handleInputChange}
                  placeholder="Campo"
                />
              </div>
              <div className="form-group">
                <label>Campo</label>
                <input
                  type="password"
                  name="password"
                  value={userData.Campo}
                  onChange={handleInputChange}
                  placeholder="Campo"
                />
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
export default businessDiagnosis;

