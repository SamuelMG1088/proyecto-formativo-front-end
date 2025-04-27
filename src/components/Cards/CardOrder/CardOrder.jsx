import React from 'react';
import './css/cardOrder.css'; // Archivo para los estilos
import '../../../styles/variables.css'
import Order from '../../../assets/icons/icon-card-order.jpg'

const CardOrder = () => {
  return (
    <div id="card">
      <div className='caja-padre'>
        <div class="header2">Total Order</div>
        <img className='Imagen-user' 
        src={Order} 
        alt="Foto-user" />
          <div class="Num">10293</div>
            <div className='contend'>
              <span className="trend-text">1.3% <b>Up from past week</b></span>
            </div>
      </div>      
    </div>
  );
};

export default CardOrder;