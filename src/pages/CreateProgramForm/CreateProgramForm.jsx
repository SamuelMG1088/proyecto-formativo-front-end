import React, { useState, useEffect } from 'react';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import BannerHome3 from '../../assets/banners/BannerHome3.png';
import BannerHome4 from '../../assets/banners/BannerHome4.png';
import BannerHome5 from '../../assets/images/factorHumano5.png';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import Swal from "sweetalert2";
import './css/createProgramForm.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

      Swal.fire({
        title: '¡Programa creado!',
        text: response.data.message || 'El programa fue registrado correctamente.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#00304d'
      }).then((result) => {
        if (result.isConfirmed) {
          navegar('/listProgram');
        }
      });
    } catch (error) {
      console.error('Error al crear el programa:', error.response?.data || error);
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.message || 'No se pudo registrar el programa. Verifica los datos.',
        icon: 'error',
        confirmButtonText: 'Intentar de nuevo',
        confirmButtonColor: '#d33'
      });
    }
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [BannerHome5, BannerHome3, BannerHome4];

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
          <h1>Registro de Programa de formación</h1>
          <p className="form-subtitle">Completa el formulario para registrar el programa de formación</p>

          <div className="step-indicator">
            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>1</div>
            <div className={`step-line ${currentStep >= 2 ? 'active' : ''}`}></div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>2</div>
            <div className={`step-line ${currentStep >= 3 ? 'active' : ''}`}></div>
            <div className={`step ${currentStep === 3 ? 'active' : ''}`}>3</div>
          </div>

          <div className="step-labels">
            <span className={currentStep === 1 ? 'active' : ''}>Información Personal</span>
            <span className={currentStep === 2 ? 'active' : ''}>Datos del Programa</span>
            <span className={currentStep === 3 ? 'active' : ''}>Confirmación</span>
          </div>

          {currentStep === 1 && (
            <div className="form-step">
              <div className="form-group">
                <label>Código del programa</label>
                <input type="number" name="programcode" value={userData.programcode} onChange={handleInputChange} placeholder="Ingrese el código del programa" />
              </div>
              <div className="form-group">
                <label>Versión</label>
                <input type="text" name="programversion" value={userData.programversion} onChange={handleInputChange} placeholder="Ingrese la versión" />
              </div>
              <div className="form-group">
                <label>Nombre del programa</label>
                <input type="text" name="programname" value={userData.programname} onChange={handleInputChange} placeholder="Ingrese el nombre del programa" />
              </div>
              <div className="form-group">
                <label>Duración</label>
                <input type="text" name="programduration" value={userData.programduration} onChange={handleInputChange} placeholder="Ingrese la duración" />
              </div>
              <div className="form-navigation">
                <Link to='/ListProgram'><button type="button" className="secondary-button">Anterior</button></Link>
                <button type="button" className="primary-button" onClick={nextStep}>Siguiente</button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="form-step">
              <div className="form-group">
                <label>Nivel de formación</label>
                <select name="traininglevel" value={userData.traininglevel} onChange={handleInputChange}>
                  <option value="">Seleccione</option>
                  <option value="Tecnico">Técnico</option>
                  <option value="Tecnologo">Tecnólogo</option>
                  <option value="Auxiliar">Auxiliar</option>
                  <option value="Operario">Operario</option>
                </select>
              </div>
              <div className="form-group">
                <label>Área vinculada</label>
                <select name="programarea" value={userData.programarea} onChange={handleInputChange}>
                  <option value="">Seleccione un área</option>
                  <option value="Teleinformática">Teleinformática</option>
                  <option value="Soldadura">Soldadura</option>
                  <option value="Mecánica">Mecánica</option>
                  <option value="Electricidad">Electricidad</option>
                  <option value="Construcción">Construcción</option>
                  <option value="Confecciones">Confecciones</option>
                </select>
              </div>
              <div className="form-group">
                <label>Perfil ocupacional</label>
                <input type="text" name="occupationalprofile" value={userData.occupationalprofile} onChange={handleInputChange} placeholder="Ingrese el perfil" />
              </div>
              <div className="form-group">
                <label>RAE</label>
                <input type="text" name="RAE" value={userData.RAE} onChange={handleInputChange} placeholder="Ingrese la RAE" />
              </div>
              <div className="form-group">
                <label>Duración lectiva</label>
                <input type="text" name="lectiva" value={userData.lectiva} onChange={handleInputChange} placeholder="Ingrese duración lectiva" />
              </div>
              <div className="form-group">
                <label>Duración productiva</label>
                <input type="text" name="productiva" value={userData.productiva} onChange={handleInputChange} placeholder="Ingrese duración productiva" />
              </div>
              <div className="form-group">
                <label>Competencia</label>
                <input type="text" name="competencia" value={userData.competencia} onChange={handleInputChange} placeholder="Ingrese la competencia" />
              </div>
              <div className="form-navigation">
                <button type="button" className="secondary-button" onClick={prevStep}>Anterior</button>
                <button type="button" className="primary-button" onClick={nextStep}>Siguiente</button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="form-step">
              <h2>Confirmación</h2>
              <p className="step-description">Revise la información antes de enviar</p>
              <div className="confirmation-details">
                {Object.entries({
                  'Código del programa': userData.programcode,
                  'Versión': userData.programversion,
                  'Nombre': userData.programname,
                  'Duración': userData.programduration,
                  'Nivel': userData.traininglevel,
                  'Área': userData.programarea,
                  'Perfil Ocupacional': userData.occupationalprofile,
                  'RAE': userData.RAE,
                  'Lectiva': userData.lectiva,
                  'Productiva': userData.productiva,
                  'Competencia': userData.competencia
                }).map(([label, value]) => (
                  <div className="detail-row" key={label}>
                    <span className="detail-label">{label}:</span>
                    <span className="detail-value">{value}</span>
                  </div>
                ))}
              </div>
              <div className="form-navigation">
                <button type="button" className="secondary-button" onClick={prevStep}>Anterior</button>
                <button type="button" className="primary-button" onClick={handleSubmit}>Confirmar y Crear programa</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateProgram;
