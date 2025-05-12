
import React from 'react';
import './css/CreateCompanyPage.css';
import perfil from '../../assets/icons/icon-form-create.png';
import Crear from '../../components/Buttons/ButtonCreate/ButtonCreate.jsx'
import Navigation, { NavigationProvider, useNavigation } from '../../layout/SideBar/SideBar.jsx';

const FormCreate = () => {
  return (

    <div id="FormularioRegistro">
        <div className='Container-formulario'>

            <NavigationProvider>
                <Navigation />
            </NavigationProvider>
        <div className="formulario-container">
            <h2 className='palabras'>Crear Empresa</h2>
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
            <input className="input-form" type="email" placeholder="Ingrese la dirección de email" />

            <label>Razón social</label>
            <input className="input-form" type="text" placeholder="Ingrese la razón social" />

            <label>Dirección</label>
            <input className="input-form" type="text" placeholder="Ingrese la dirección de residencia" />
            </div>

            <div className="column-right">
            <label>Número de Documento</label>
            <input className="input-form" type="text" placeholder="Ingrese el número de documento" />
            <div className='duo-input'>

                <div>
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

            <label>Número Telefónico</label>
            <input className="input-form" type="text" placeholder="Ingrese su número telefónico" />

            <div className="input-Estado">
                
            </div>

            <label>Actividad económica</label>
            <input className="input-form"type="text" placeholder="Ingrese la actividad económica" />

            <label>Contraseña</label>
            <input className="input-form" type="password" placeholder="***************" />
            </div>
            <div className='button'>
            <Crear />       
            </div>
                
        </form>
        </div>
    </div>
    </div>
  );
};

export default FormCreate;

