import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import Gov from '../../layout/Gov/Gov.jsx';
import { FaAngleLeft } from "react-icons/fa";

import './css/verifyCodePage.css';
import '../../styles/variables.css';

import factor1 from '../../assets/images/factorHumano1.jpg'; 
import factor2 from '../../assets/images/factorHumano2.png'; 
import factor3 from '../../assets/images/factorHumano3.png';

export const VerifyCodePage = () => {
    const { t } = useTranslation();
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputsRef = useRef([]);
    const navigate = useNavigate();
    const location = useLocation();

    const email = location?.state?.email || '';

    const [currentSlide, setCurrentSlide] = useState(0);
    const images = [factor1, factor2, factor3];

    // Carousel auto-slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev === images.length - 1 ? 0 : prev + 1));
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    // Handle input change
    const handleChange = (index, value) => {
        if (/^[0-9]?$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
            if (value !== '' && index < 5) {
                inputsRef.current[index + 1]?.focus();
            }
        }
    };

    // Handle backspace to move to previous input
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && code[index] === '' && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    // Handle paste of entire code
    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text/plain').slice(0, 6);
        const newCode = [...code];

        for (let i = 0; i < pasteData.length && i < 6; i++) {
            if (/^[0-9]$/.test(pasteData[i])) {
                newCode[i] = pasteData[i];
                if (i < 5) inputsRef.current[i + 1]?.focus();
            }
        }

        setCode(newCode);
    };

    // Verify code with backend
    const handleVerify = async () => {
        const fullCode = code.join('');
        if (fullCode.length < 6) {
            Swal.fire(
                t('verifyCodePage.alerts.incompleteCode.title'),
                t('verifyCodePage.alerts.incompleteCode.text'),
                'warning'
            );
            return;
        }

        try {
            await axios.post('http://localhost:3000/api/password-reset/verify-code', {
                email,
                code: fullCode
            });

            Swal.fire(
                t('verifyCodePage.alerts.verified.title'),
                t('verifyCodePage.alerts.verified.text'),
                'success'
            ).then(() => {
                navigate('/update', { state: { email, code: fullCode } });
            });
        } catch (error) {
            const msg = error?.response?.data?.message || t('verifyCodePage.alerts.error.text');
            Swal.fire(
                t('verifyCodePage.alerts.apiError.title'),
                t('verifyCodePage.alerts.apiError.text', { message: msg }),
                'error'
            );
        }
    };

    return (
        <div id="VerifyCodePage">
            <Gov />
            <HeaderIcons />

            <div className="VerifyPage">
                <div className="frame">
                    <Link to="/" className="back-link">
                        <FaAngleLeft style={{ marginRight: '8px' }} />
                        {t('verifyCodePage.backLink')}
                    </Link>

                    <h1>{t('verifyCodePage.title')}</h1>
                    <p>{t('verifyCodePage.subtitle')}</p>

                    <div className="input-box-email">
                        {code.map((value, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={value}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                ref={(el) => (inputsRef.current[index] = el)}
                                autoFocus={index === 0}
                            />
                        ))}
                    </div>

                    <p className="again-code">
                        {t('verifyCodePage.resendText')} <span style={{ cursor: 'pointer' }}>{t('verifyCodePage.resendLink')}</span>
                    </p>

                    <button className="BottonVerify" onClick={handleVerify}>
                        {t('verifyCodePage.verifyButton')}
                    </button>
                </div>

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
    );
};

export default VerifyCodePage;