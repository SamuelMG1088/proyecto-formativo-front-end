import { FaRegEdit } from 'react-icons/fa'
import React, { useState } from 'react';
import ImageLogo from '../../assets/images/img-logoMonster.svg'
import Navigation, { NavigationProvider } from '../../layout/SideBar/SideBar.jsx';
import ButtonEdit from '../../components/Buttons/ButtonEdit/ButtonEdit.jsx';
import { Link } from 'react-router-dom';
import './css/editCompany.css';

const EditCompany = () => {
  const [formData, setFormData] = useState({
    documentType: '',
    phoneNumber: '',
    email: '',
    address: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div id='viewProfilePage'>
      <div className="view-info-container">
        <NavigationProvider>
          <Navigation />
        </NavigationProvider>
        <h2 className='title-page'>Editar Empresa</h2>
        <div className="content">
          {/* Columna izquierda */}
          <div className="left-column">
            <div className="company-card">
              <div className="logo-container">
                <img
                  src={ImageLogo}
                  alt="Foto de perfil"
                  className="profile-image"
              />
              
              </div>
              

              <h2>Monster</h2>

              <div className="role-info">
                <span>ROL</span>
                <span>Lorem Ipsum</span>
              </div>

              <div className="role-info">
                <span>INFO</span>
                <span>Lorem Ipsum</span>
              </div>
              <div className="role-info">
                <span>INFO</span>
                <span>Lorem Ipsum</span>
              </div>
            </div>

            <div className="description-card">
              <h3>Descripción</h3>
              <ul>
                <li>Lorem Ipsum 01</li>
                <li>Lorem Ipsum 02</li>
                <li>Lorem Ipsum 03</li>
                <li>Lorem Ipsum 04</li>
              </ul>
            </div>
          </div>

          {/* Columna derecha */}
            <div className='cards__right'>
                <div className="info-card">
                    <label className="info-title">Tipo de documento</label>
                        <select name="documentType" value={formData.documentType} onChange={handleChange} className="info-value">
                            <option value="Cedula">Cédula</option>
                             <option value="Tarjeta de identidad">Tarjeta de Identidad</option>
                         </select>
                    <div className='Prueba' >
                        <label className="info-title">Número Telefónico</label>
                        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="info-value" />
                    </div>
                    <div className='Prueba'>
                        <label className="info-title">Correo Electrónico</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="info-value" required />
                    </div>
                    <div className='Prueba'>
                        <label className="info-title">Dirección</label>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} className="info-value" />
                    </div>
                    <div className='Prueba'>
                        <label className="info-title">Contraseña</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} className="info-value" required />
                    </div>
                    <div className='buttonEdit'>
                        <Link to="/listcompany">
                            <ButtonEdit/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EditCompany;
