import React, { useRef, useState, useEffect } from "react";
import HeaderLogin from '../../layout/HeaderLogin/HeaderLogin.jsx';
import Gov from '../../layout/Gov/Gov.jsx';
import { Link } from 'react-router-dom';
import { FaAngleLeft } from "react-icons/fa";
import './css/verifyCodePage.css';
import '../../styles/variables.css';
import factor1 from '../../assets/images/factorHumano1.jpg'; 
import factor2 from '../../assets/images/factorHumano2.png'; 
import factor3 from '../../assets/images/factorHumano3.png';

export const VerifyCodePage = () => {
    const [code, setCode] = useState(['', '', '', '']); // Estado para almacenar el código de verificación
    const inputsRef = useRef([]); // Referencia para los inputs del código
    
    // Estado para el carrusel
    const [currentSlide, setCurrentSlide] = useState(0);
    const images = [factor1, factor2, factor3]; // Array de imágenes para el carrusel

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 3500); // Cambia cada 3.5 segundos

        return () => clearInterval(interval);
    }, [images.length]);

    const handleChange = (index, value) => {
        if (/^[0-9]$/.test(value) || value === '') {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            if (value !== '' && index < 3) {
                inputsRef.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && code[index] === '' && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text/plain').slice(0, 4);
        const newCode = [...code];
        
        for (let i = 0; i < pasteData.length && i < 4; i++) {
            if (/^[0-9]$/.test(pasteData[i])) {
                newCode[i] = pasteData[i];
                if (i < 3) {
                    inputsRef.current[i + 1].focus();
                }
            }
        }

        setCode(newCode);
    };

    return (
        <>
            <div id="VerifyCodePage">
                <Gov/>
                <HeaderLogin/>
                
                <div className="VerifyPage">
                    <div className="frame">
                        <a href=""> <FaAngleLeft /><Link to="/">Ir a inicio de Sesión</Link></a>
                        
                        <h1>Verificar Codigo</h1>
                        <p>Ingresa el código que enviamos a tu email</p>
                        
                        <div className="input-box-email">
                            {[0, 1, 2, 3].map((index) => (
                                <input
                                    key={index}
                                    type="text" 
                                    maxLength="1"
                                    value={code[index]}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    ref={(el) => (inputsRef.current[index] = el)}
                                    autoFocus={index === 0}
                                />
                            ))}
                        </div>

                        <Link to="/update">
                            <button className="BottonVerify" type="submit">VERIFICAR</button>
                        </Link>
                    </div>

                    {/* Carrusel de imágenes */}
                    <div className="img-VerifyPage">
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
        </>
    );
};

export default VerifyCodePage;