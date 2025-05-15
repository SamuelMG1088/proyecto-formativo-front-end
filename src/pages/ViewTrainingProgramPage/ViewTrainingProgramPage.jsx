import React from 'react';
import './css/viewTrainingProgramPage.css';
import '../../styles/Variables.css'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navigation, { NavigationProvider } from '../../layout/SideBar/SideBar.jsx';
import ExportPdfExcel from '../../components/ExportPdfExcel/ExportPdfExcel.jsx';

const ViewTraining = () => {
  return (
    <div id='training-container'>
        <div id='Container-training'>
        <NavigationProvider>
            <Navigation />
        </NavigationProvider>
        <div className='Button-Exports'>
            <ExportPdfExcel/>
        </div>
        <div className="title-card">
            <h2>Visualizar programa de formacion</h2>   
        </div>
      <div className="form-grid">
        <div className="column">
          <div className="perfil-card">
            <label className="perfil-title">Nombre del programa</label>
            <input className="perfil-input" type="text" placeholder="Análisis y desarrollo de software" />
          </div>
          <div className="perfil-card">
            <label className="perfil-title">Nivel de formación</label>
            <input className="perfil-input" type="text" placeholder="Tecnólogo" />
          </div>
          <div className="perfil-card">
            <label className="perfil-title">Perfil ocupacional</label>
            <input className="perfil-input" type="text" placeholder="Analizar, diseñar, desarrollar y probar aplicaciones" />
          </div>
        </div>
        <div className="column">
          <div className="perfil-card">
            <label className="perfil-title">Código del programa</label>
            <input className="perfil-input" type="text" placeholder="2896365" />
          </div>
          <div className="perfil-card">
            <label className="perfil-title">Duración del programa</label>
            <input className="perfil-input" type="text" placeholder="05/12/2028" />
          </div>
          <div className="perfil-card">
            <label className="perfil-title">Estado del programa</label>
            <input className="perfil-input" type="text" placeholder="Activo" />
          </div>
        </div>
      </div>

      <div className="action-container">
        <button className="icon-button edit">
          <FaEdit />
        </button>
        <button className="icon-button delete">
          <FaTrash />
        </button>
      </div>
        </div>
    </div>
  );
};

export default ViewTraining;
