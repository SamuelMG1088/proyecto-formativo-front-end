import React from 'react';
import './css/cardPending.css'; // Archivo para los estilos
import pending from '../../../assets/icons/icon.card.pending.png'

const CardPending = () => {
  return (
    <div id="card">
      <div className='caja-padre'>
        <div class="header4">Total pending</div>
        <img className='Imagen-user' 
        src={pending} 
        alt="Foto-user" />
          <div class="Num">$2040</div>
            <div className='contend'>
              <span className="trend-text">1.8% <b>Up from yesterday</b></span>
            </div>
      </div>      
    </div>
  );
};

export default CardPending;