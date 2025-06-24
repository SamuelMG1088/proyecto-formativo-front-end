import React, { useState, useEffect } from 'react';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import BannerHome2 from '../../assets/images/BanneerHome2.png';
import BannerHome3 from '../../assets/images/BannerHome3.png';
import BannerHome4 from '../../assets/images/BannerHome4.png';
import BannerHome5 from '../../assets/images/BannerHome5.png';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import BannerActualizar from '../../assets/images/BannerActualizar.png';
import Swal from "sweetalert2";
import './css/createProgramForm.css';
import { useNavigate } from 'react-router-dom';

const CreateProgram = () => {
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
  password: ''
});

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setUserData((prev) => ({ ...prev, [name]: value }));
};

const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    const handleSubmit = () => {
    // Lógica para enviar los datos (ejemplo con console.log)
    console.log('Datos enviados:', userData);
    };

  // Estado para el carrusel
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [BannerActualizar, BannerHome2, BannerHome3, BannerHome4, BannerHome5]; // Array de imágenes para el carrusel

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500); // Cambia cada 3.5 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  const navegar = useNavigate ();
  
  const Alerta = () => {   {/*Aca estaria el sweetAlert*/}
      Swal.fire({
        title: 'Programa de formacion creado!',
        text: 'El programa de formacion fue creado exitosamente.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#00304d'
     }).then((result) => {
        if (result.isConfirmed) {
          navegar('/listProgram'); 
        }
      });
    };

  return (
    <div id="CreateProgram">
      <div className="Create">
        <Gov />
        <HeaderIcons />
        <NavBar />

            {/* // Carrusel */}
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
          <h1>Registro de Programa de formación</h1>
          <p className="form-subtitle">Completa el formulario para registrar  el programa de formación</p>

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
              <div className="form-group">
                <label>Código de programa de formación.</label>
                <input type="number" placeholder='Ingrese el codigo del programa de formación' name="programcode" value={userData.programcode} onChange={handleInputChange}/>
              </div>

              <div className="form-group">
                <label>Versión de programa de formación.</label>
                <input
                  type="text"
                  name="programversion"
                  value={userData.programversion}
                  onChange={handleInputChange}
                  placeholder="Ingrese la version del programa"
                />
              </div>

              <div className="form-group">
                <label>Nombre completo de programa de formación.</label>
                <input
                  type="text"
                  name="programname"
                  value={userData.programname}
                  onChange={handleInputChange}
                  placeholder="ingrese el nombre completo del programa"
                />
              </div>

              <div className="form-group">
                <label>Duración del programa de formación</label>
                <input
                  type="text"
                  name="programduration"
                  value={userData.programduration}
                  onChange={handleInputChange}
                  placeholder="Ingrese la duracion del programa"
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

          {/* Paso 2 */}
          {currentStep === 2 && (
            <div className="form-step">
    
              <div className="form-group">
                <label>Nivel de formación (Técnico, Tecnólogo, Aux u operarios)</label>
                <select name="traininglevel" value={userData.traininglevel} onChange={handleInputChange}> 
                    <option  value="tecnico"></option>
                    <option  value="tecnico">Técnico</option>
                    <option  value="Tecnólogo">Tecnólogo</option>
                    <option  value="Aux">Aux</option>
                    <option  value="operarios">operarios</option>
                </select>
              </div>
              <div className="form-group">
                <label>Área al que se vincula el programa de formación</label>
                <input
                  type="text"
                  name="programarea"
                  value={userData.programarea}
                  onChange={handleInputChange}
                  placeholder="Ingrese el área del programa"
                />
              </div>

              <div className="form-group">
                <label>Perfil Ocupacional del programa de formación</label>
                <input type="text" placeholder='Ingrese la ocupacion del programa' name="occupationalprofile" value={userData.occupationalprofile} onChange={handleInputChange} />
              </div>

              <div className="form-group">
                <label>RAE existentes en el mismo.</label>
                <input
                  type="text"
                  name="RAE"
                  value={userData.RAE}
                  onChange={handleInputChange}
                  placeholder="Ingrese la RAE"
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
                  'Codigo de programa': userData.programcode,
                  'version del programa': userData.programversion,
                  'Nombre del programa': userData.programname,
                  'duracion del programa': userData.programduration,
                  'nivel de formacion': userData.traininglevel,
                  'área del programa': userData.programarea,
                  'Perfil Ocupacional': userData.occupationalprofile,
                  'RAE': userData.RAE
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
                <button type="button" className="primary-button" onClick={Alerta}>
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

export default CreateProgram;