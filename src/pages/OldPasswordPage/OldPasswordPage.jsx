import React, { useState, useEffect } from 'react';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import AccestDirect from '../../components/AccessDirect/AccestDirect.jsx';
import Gov from '../../layout/Gov/Gov.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { FaAngleLeft } from "react-icons/fa6";
import './css/oldPasswordPage.css';
import '../../styles/variables.css';
import factor1 from '../../assets/images/factorHumano1.jpg';
import factor2 from '../../assets/images/factorHumano2.png';
import factor3 from '../../assets/images/factorHumano3.png';
import axios from 'axios';
import Swal from 'sweetalert2';

export const OldPasswordPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const images = [factor1, factor2, factor3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSendCode = async () => {
    if (!email) {
      Swal.fire('Error', 'Por favor, escriba un correo electrónico.', 'warning');
      return;
    }

    if (!isValidEmail(email)) {
      Swal.fire('Error', 'El formato del correo no es válido.', 'warning');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/password-reset/forgot-password', { email });


      const { code } = response.data;

      if (code) {
        Swal.fire({
          title: 'Código enviado',
          html: `Tu código es: <strong>${code}</strong>`,
          icon: 'info',
        }).then(() => {
          navigate('/verify', { state: { email } });
        });
      } else {
        Swal.fire('Éxito', 'Se ha enviado un código de verificación a tu correo.', 'success').then(() => {
          navigate('/verify', { state: { email } });
        });
      }

    } catch (error) {
      const msg = error?.response?.data?.message || 'No se pudo enviar el código. Verifique el correo ingresado.';
      Swal.fire('Error', msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="OldPasswrodPage">
      <Gov />
      <HeaderIcons />
      <div className="old-password">
        <div className="frame">
          <Link to="/" className="link-back">
            <FaAngleLeft /> Ir a inicio de Sesión
          </Link>

          <h1>¿Olvidó su contraseña?</h1>
          <p className='descripcion'>
            No se preocupe, se le enviará un código de verificación a su correo electrónico. Escríbalo aquí:
          </p>

          <div className="input-box-email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
              disabled={loading}
            />
          </div>

          <button className="BottonOld" type="button" onClick={handleSendCode} disabled={loading}>
            {loading ? 'ENVIANDO...' : 'ENVIAR'}
          </button>

          <AccestDirect />
        </div>

        {/* Carrusel */}
        <div className="img-old-password">
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

export default OldPasswordPage;
