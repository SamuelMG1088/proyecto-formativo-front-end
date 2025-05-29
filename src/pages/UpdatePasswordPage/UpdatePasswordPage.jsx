import React, { useState, useEffect } from "react";
import './css/updatePasswordPage.css';
import '../../styles/variables.css';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import Gov from '../../layout/Gov/Gov.jsx';
import { Link } from 'react-router-dom';
import { BsEyeSlashFill } from "react-icons/bs";
import factor1 from '../../assets/images/factorHumano1.jpg'; 
import factor2 from '../../assets/images/factorHumano2.png'; 
import factor3 from '../../assets/images/factorHumano3.png';

export const UpdatePasswordPage = () => {
    // Estado para el carrusel
    const [currentSlide, setCurrentSlide] = useState(0);
    const images = [factor1, factor2, factor3]; // Array de imágenes para el carrusel

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 3500); // Cambia cada 3.5 segundos

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div id="UpdatePasswordPage">
            <Gov/>
            <HeaderIcons/>
            <div className="UpdatePage">
                <div className="frame">
                    <h1>Actualizar Contraseña</h1>
                    <p>Actualiza tu contraseña y esta vez pon una que recuerdes ;)</p>
                    <div className="input-box-email">
                        <label htmlFor="">Crear Contraseña</label>
                        <input type="password"/>
                        <BsEyeSlashFill className='icon'/>
                    </div>
                    <div className="input-box-email">
                        <label htmlFor="">Actualizar contraseña</label>
                        <input type="password"/>
                        <BsEyeSlashFill className='icon'/>
                    </div>

                    <Link to="/">
                        <button className="BottonUpdate" type="submit">ACTUALIZAR CONTRASEÑA</button>
                    </Link>
                </div>

                {/* Carrusel de imágenes */}
                <div className="img-UpdatePage">
                    <div className="carousel-container">
                        {images.map((image, index) => (
                            <div 
                                key={index}
                                className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                                style={{ backgroundImage: `url(${image})` }}
                            />
                        ))}
                        <div className="carousel-dots">
                            {images.map((_, index) => (
                                <span 
                                    key={index}
                                    className={`dot ${index === currentSlide ? 'active' : ''}`}
                                    onClick={() => setCurrentSlide(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default UpdatePasswordPage;