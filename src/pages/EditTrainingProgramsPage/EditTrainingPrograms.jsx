import React from 'react';
import './css/editTrainingProgramsPage.css';
import '../../styles/Variables.css';
import { Link } from 'react-router-dom';
import Navigation, { NavigationProvider } from '../../layout/SideBar/SideBar.jsx';
import ExportPdfExcel from '../../components/ExportPdfExcel/ExportPdfExcel.jsx';
import ButtonEdit from '../../components/Buttons/ButtonEdit/ButtonEdit.jsx';

const EditTraining = () => {
  return (
    <div id='EditTraining'>
        <div id='trainingEdit'>
            
      <NavigationProvider>
        <Navigation />
      </NavigationProvider>
        <div className='Button-Exports'>
            <ExportPdfExcel/>
        </div>
        <div className="title-card">
            <h2>programa de formacion</h2>   
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
                        <label className="perfil-title">Estado</label>
                        <input className="perfil-input" type="text" placeholder="Activo" />
                    </div>
                    </div>

                    <div className="column">
                    <div className="perfil-card">
                        <label className="perfil-title">Código del programa</label>
                        <input className="perfil-input" type="text" placeholder="2896365"/>
                    </div>
                    <div className="perfil-card">
                        <label className="perfil-title">Duración del programa</label>
                        <input className="perfil-input" type="text" placeholder="2896365" />
                    </div>
                    <div className="perfil-card">
                        <label className="perfil-title">Perfil ocupacional</label>
                        <input className="perfil-input" type="text" placeholder="Analizar, diseñar..." />
                    </div>
                </div>
            </div>
            <Link to='/listarProgramaFormacion'>
            <div className='Button-Edit'>
                <ButtonEdit/>
            </div>
            </Link>
        </div>
    </div>
  );
};

export default EditTraining;
