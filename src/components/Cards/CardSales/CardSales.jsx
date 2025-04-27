import React from 'react';
import './css/cardSales.css'; // Archivo para los estilos
import Sales from '../../../assets/icons/icon-card-sales.png'

const CardSales = () => {
  return (
    <div id="card">
      <div className='caja-padre'>
        <div class="header3">Total Sales</div>
        <img className='Imagen-user' 
        src={Sales} 
        alt="Foto-user" />
          <div class="Num">$89,000</div>
            <div className='contend'>
              <span className="trend-text">4.3% <b>Down From Yesterday</b></span>
            </div>
      </div>      
    </div>
  );
};

export default CardSales;