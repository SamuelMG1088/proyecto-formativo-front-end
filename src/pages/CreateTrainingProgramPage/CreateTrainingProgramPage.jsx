import React from "react";
import "./css/createTrainingProgramPage.css";
import "../../styles/Variables.css"
import { Link } from "react-router-dom";
import Navigation, { NavigationProvider, useNavigation } from '../../layout/SideBar/SideBar.jsx';
import ButtonCreate from "../../components/Buttons/ButtonCreate/ButtonCreate.jsx";

const TrainingProgramForm = () => {
  return (
    <div id="CreateTraining">
      <NavigationProvider>
        <Navigation/>
      </NavigationProvider>
      <div id="TrainingCreate">
         <div className="title-Create">
              <h2>Crear programa de formacion</h2>   
         </div>
      <div className="form-container">
        <form className="form-grid">
          <div className="form-group">
            <label>Código de programa de formación</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Versión de programa de formación</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Nombre completo de programa de formación</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Duración del programa de formación</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Perfil Ocupacional</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Área a vincular</label>
            <input type="text" />
          </div>
          <div className="rae">
            <label>RAE existentes en el mismo</label>
            <input type="text" />
          </div>
          <div className="card-duo">
          <div className="form-group">
            <label>Nivel de formación</label>
            <select>
              <option value="Técnico">Técnico</option>
            </select>
          </div>
          <div className="form-group">
            <label>Estado de programa</label>
            <select>
              <option value="Activo">Activo</option>
            </select>
          </div>
          </div>
          <Link to='/listarProgramaFormacion'>
            <div className="ButtonCreate">
                <ButtonCreate/>
            </div>
          </Link>
        </form>
      </div>
      </div>
    </div>
  );
};


export default TrainingProgramForm;