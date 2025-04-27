import React from 'react';
import './css/cardUser.css'; // Archivo para los estilos
import User from '../../../assets/icons/icon-card-user.jpeg'

const CardUser = () => {
  return (
    <div id="card">
      <div className='caja-padre'>
        <div class="header1">Total user</div>
        <img className='Imagen-user' 
        src={User} 
        alt="Foto-user" />
          <div class="Num">40,689</div>
            <div className='contend'>
              <span className="trend-text">8.5% <b>Up from yesterday</b></span>
            </div>
      </div>      
    </div>
  );
};

export default CardUser;