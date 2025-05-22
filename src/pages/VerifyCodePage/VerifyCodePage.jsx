import React, { useRef, useState } from "react";
import imgVerify from '../../assets/images/img-VerifyCode.svg';
import HeaderLogin from '../../layout/HeaderLogin/HeaderLogin.jsx';
import { Link } from 'react-router-dom';
import { FaAngleLeft } from "react-icons/fa";
import './css/verifyCodePage.css';
import '../../styles/variables.css';

export const VerifyCodePage = () => {
    const [code, setCode] = useState(['', '', '', '']); // Estado para almacenar el código de verificación
    
    const inputsRef = useRef([]); // Referencia para los inputs del código

    const handleChange = (index, value) => {
        if (/^[0-9]$/.test(value) || value === '') { // Valida que el valor sea un número o vacío
            const newCode = [...code]; // Crea una copia del estado actual
            newCode[index] = value; // Asigna el nuevo valor al índice correspondiente
            setCode(newCode);

            if (value !== '' && index < 3) { // Si el valor no está vacío y no es el último campo
                inputsRef.current[index + 1].focus(); // Pasa al siguiente input
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && code[index] === '' && index > 0) { // Si se presiona Backspace y el campo está vacío
            inputsRef.current[index - 1].focus(); // Regresa al campo anterior
        }
    };

    const handlePaste = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del pegado
        const pasteData = e.clipboardData.getData('text/plain').slice(0, 4); // Obtiene los primeros 4 caracteres del portapapeles
        const newCode = [...code]; // Crea una copia del estado actual
        
        for (let i = 0; i < pasteData.length && i < 4; i++) { // Itera sobre los caracteres pegados
            if (/^[0-9]$/.test(pasteData[i])) { // Valida que el carácter sea un número
                newCode[i] = pasteData[i]; // Asigna el carácter al índice correspondiente
                if (i < 3) { 
                    inputsRef.current[i + 1].focus();
                }
            }
        }

        setCode(newCode); // Actualiza el estado con el nuevo código
    };

    return (
        <>
            <div id="VerifyCodePage">
                {/* Componente de encabezado */}
                <HeaderLogin/>
                
                <div className="VerifyPage">
                    <div className="frame">
                        {/* Enlace para volver al inicio de sesión */}
                        <a href=""> <FaAngleLeft /><Link to="/">Ir a inicio de Sesión</Link></a>
                        
                        {/* Título y descripción */}
                        <h1>Verificar Codigo</h1>
                        <p>Ingresa el código que enviamos a tu email</p>
                        
                        {/* Contenedor de los inputs del código */}
                        <div className="input-box-email">
                            {/* Mapea 4 inputs para el código de verificación */}
                            {[0, 1, 2, 3].map((index) => (
                                <input
                                    key={index}  // Clave única para React
                                    type="text" 
                                    maxLength="1"
                                    value={code[index]}  // Valor del input
                                    onChange={(e) => handleChange(index, e.target.value)}  // Maneja cambios
                                    onKeyDown={(e) => handleKeyDown(index, e)}  // Maneja teclas
                                    onPaste={handlePaste}  // Maneja pegado
                                    ref={(el) => (inputsRef.current[index] = el)}  // Referencia al DOM
                                    autoFocus={index === 0}  // Autofoco en el primer input
                                />
                            ))}
                        </div>

                        {/* Botón de verificación */}
                        <Link to="/update">
                            <button className="BottonVerify" type="submit">VERIFICAR</button>
                        </Link>
                    </div>

                    {/* Imagen decorativa */}
                    <div className="img-VerifyPage">
                        <img src={imgVerify} alt="Ilustración de verificación"/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VerifyCodePage;