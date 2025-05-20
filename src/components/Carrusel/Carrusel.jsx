import React from 'react';
import juanjo from '../../assets/images/juanjo.jpg';
import ladin from '../../assets/images/ladin.jpg';
import tatan from '../../assets/images/tatan.jpg';
import '../../styles/variables.css'
import './css/carrusel.css'; // Archivo para los estilos

const Carrusel = () => {
  return (
    <>
    <div id="Carrusel">
        <div className="carrusel-container">
            <img src={juanjo} alt="" />
            <img src={ladin} alt="" />
            <img src={tatan} alt="" />
        </div>
    </div>
    </>
  );
};

export default Carrusel;