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

                        <h2>MCLaren</h2>

                        <div className="role-info">
                            <span>ROL</span>
                            <span>Admin</span>
                        </div>
                    </div>

                    <div className="description-card">
                        <h3>Descripción</h3>
                        <ul>
                            <li>Lorem ipsum, dolor sit amet consectetur adipisicing</li>
                            <li>Adipisicing elit. Perferendis natus non et ut quas carrera</li>
                            <li>Quisque maximus diam lobore et elit, sed</li>
                            <li>Vestibulum hendrerit nibh sed dolor congue</li>
                            <li>Quis tempus neque eleifend</li>
                            <li>Ac nunc!</li>
                        </ul>
                            
                    </div>
                </div>

                    {/* Columna derecha */}
                <div className="right-column">
                    <div className="info-cards">
                        <div className="info-card">
                            <div className="info-title">Tipo de documento</div>
                            <div className="info-value">Cédula</div>
                        </div>

                        <div className="info-card">
                            <div className="info-title">Número de documento</div>
                            <div className="info-value">8001</div>
                        </div>

                        <div className="info-card">
                            <div className="info-title">Representante legal</div>
                            <div className="info-value">2859355</div>
                        </div>

                        <div className="info-card">
                            <div className="info-title">Razón social</div>
                            <div className="info-value">05/12/2028</div>
                        </div>

                        <div className="info-card">
                            <div className="info-title">Dirección</div>
                            <div className="info-value">Dignal 25 Conjunto Residencial Ciprés</div>
                        </div>

                        <div className="action-card">
                            <Link to="/editProfilePage">
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
