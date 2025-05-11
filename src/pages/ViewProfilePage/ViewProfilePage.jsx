import React from 'react';
import { FaRegEdit } from 'react-icons/fa';
import profileImage from '../../assets/images/img-view-profile.jpg';
import Navigation, { NavigationProvider, useNavigation } from '../../layout/SideBar/SideBar.jsx';
import { Link } from 'react-router-dom';
import './css/viewProfilePage.css';

const viewProfilePage = () => {
  return (
    <div id='viewProfilePage'>
        <div className="view-info-container">
        <NavigationProvider>
            <Navigation/>
        </NavigationProvider>
            <h2 className='title-page' >Visualizar Perfil</h2>
            <div className="content">
                {/* Columna izquierda */}
                <div className="left-column">
                    <div className="company-card">
                        <div className="logo-container">
                            <img
                            src={profileImage}
                            alt="Foto de perfil"
                            className="profile-image"
                            />
                        </div>

                        <h2>Stephania Duque</h2>

                        <div className="role-info">
                            <span>ROL</span>
                            <span>Admin</span>
                        </div>
                    </div>

                    <div className="description-card">
                        <h3>Descripción</h3>
                        <ul>
                            <li>Soy una mujer Emprendedora</li>
                            <li>Soy una mujer que lo que me propongo lucho hasta conseguirlo</li>
                            <li>Soy una mujer aficionada a las vacas y a lo marranos</li>
                            <li>mi marca de electrodomenticos favorita es Huawei</li>
                        </ul>
                            
                    </div>
                </div>

                    {/* Columna derecha */}
                <div className="right-column">
                    <div className="info-cards">
                        <div className="info-card">
                            <div className="info-title">Tipo de documento</div>
                            <div className="info-value">Tarjeta de identidad</div>
                        </div>

                        <div className="info-card">
                            <div className="info-title">Numero Telefonico</div>
                            <div className="info-value">+57 314-7539505</div>
                        </div>

                        <div className="info-card">
                            <div className="info-title">Correo Electronicol</div>
                            <div className="info-value">niaduq1@gmail.com</div>
                        </div>

                        <div className="info-card">
                            <div className="info-title">Dirección</div>
                            <div className="info-value">Barrio Antioquia - Medellin</div>
                        </div>

                        <div className="info-card">
                            <div className="info-title">Contraseña</div>
                            <div className="info-value">1085816708Niaduq1</div>
                        </div>

                        <div className="action-card">
                            <Link to="/editProfile">
                                <button className="icon-button edit-button">
                                    <FaRegEdit />
                                </button>
                            </Link>
                            {/* <button className="icon-button delete-button">
                                <IoTrashOutline />
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default viewProfilePage;
