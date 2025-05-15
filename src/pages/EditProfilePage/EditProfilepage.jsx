import React, { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import Navigation, { NavigationProvider } from '../../layout/SideBar/SideBar.jsx';
import ButtonEdit from '../../components/Buttons/ButtonEdit/ButtonEdit.jsx';
import './css/editProfilePage.css';
import { Link } from 'react-router-dom';

const EditProfilePage = () => {
    const [profileImage, setProfileImage] = useState('../../assets/images/img-view-profile.jpg');
    const [formData, setFormData] = useState({
        fullName: 'Stephania Duque',
        documentType: 'Tarjeta de identidad',
        documentNumber: '',
        phoneNumber: '',
        email: '',
        address: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos guardados:", formData);
    };

    return (
        <div id='editProfilePage'>
            <div className="view-info-container">
                <NavigationProvider>
                    <Navigation />
                </NavigationProvider>
                <h2 className='title-page'>Editar Perfil</h2>
                <form onSubmit={handleSubmit} className="content">
                    {/* Columna izquierda */}
                    <div className="left-column">
                        <div className="company-card">
                            <div className="logo-container">
                                <input type="file" onChange={handleImageChange} className="image-upload" />
                                <img src={profileImage} className="profile-image"/>
                            </div>

                            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="name-input"/>

                            <div className="description-card">
                                <h3>Descripción</h3>
                                <textarea 
                                    name="description" 
                                    value={formData.description} 
                                    onChange={handleChange} 
                                    className="description-textarea"
                                />
                            </div>
                        </div>

                    </div>

                    {/* Columna derecha */}
                    <div className="right-column">
                        <div className="info-cards">
                            <div className="info-card">
                                <label className="info-title">Tipo de documento</label>
                                <select name="documentType" value={formData.documentType} onChange={handleChange} className="info-value">
                                    <option value="Cedula">Cédula</option>
                                    <option value="Tarjeta de identidad">Tarjeta de Identidad</option>
                                </select>
                            </div>
                            <div className="info-card">
                                <label className="info-title">Número Telefónico</label>
                                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="info-value" />
                            </div>
                            <div className="info-card">
                                <label className="info-title">Correo Electrónico</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} className="info-value" required />
                            </div>
                            <div className="info-card">
                                <label className="info-title">Dirección</label>
                                <input type="text" name="address" value={formData.address} onChange={handleChange} className="info-value" />
                            </div>
                            <div className="info-card">
                                <label className="info-title">Contraseña</label>
                                <input type="password" name="password" value={formData.password} onChange={handleChange} className="info-value" required />
                            </div>
                        </div>
                        <div className="box-botton">
                            <Link to="/viewProfile">
                                <ButtonEdit/>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfilePage;
