import React from 'react';
import './css/formCreate.css';
import '../../styles/variables.css'
import perfil from '../../assets/icons/icon-form-create.png';
import Crear from '../Buttons/ButtonCreate/ButtonCreate.jsx'

const FormCreate = () => {
  return (
    <div id="FormularioRegistro">
    
        <div className="formulario-container">
        <div className="foto-perfil">
            <img className='icono-foto' 
            src={perfil} 
            alt="foto de perfil" />
        </div>
            <span className="cargar-texto">Cargar Foto de Perfil</span>

        <form className="formulario">
            <div className="columna">
            <label>Tipo de Documento</label>
            <select>
                <option>Tipo de Documento</option>
            </select>

            <div className="input-duo">
                <div className='input-nombre'>
                <label className='nombre'>Nombres</label>
                <input className='input-name' type="text" placeholder="Ingrese sus nombres" />
                </div>
                <div className='input-apellido'>
                <label>Apellidos</label>
                <input className='input-name' type="text" placeholder="Ingrese sus apellidos" />
                </div>
            </div>

            <label>Correo electrónico</label>
            <input type="email" placeholder="Ingrese la dirección de email" />

            <label>Razón social</label>
            <input type="text" placeholder="Ingrese la razón social" />

            <label>Dirección</label>
            <input type="text" placeholder="Ingrese la dirección de residencia" />
            </div>

            <div className="column-right">
            <label>Número de Documento</label>
            <input type="text" placeholder="Ingrese el número de documento" />

            <label>Número Telefónico</label>
            <input type="text" placeholder="Ingrese su número telefónico" />

            <div className="input-Estado">
                <div >
                <label >Estado de Usuario </label>
                
                <select className='input-state'>
                    <option>Estado de Usuario</option>
                </select>
                </div>
                <div className='input-rol'>
                <label >Rol de Usuario</label>
                <select className='rol-User'>
                    <option>Rol de Usuario</option>
                </select>
                </div>
            </div>

            <label>Actividad económica</label>
            <input type="text" placeholder="Ingrese la actividad económica" />

            <label>Contraseña</label>
            <input type="password" placeholder="***************" />
            </div>
            <div className='button'>

            <Crear />       
            </div>
                
        </form>
        </div>
    </div>
  );
};

export default FormCreate;
