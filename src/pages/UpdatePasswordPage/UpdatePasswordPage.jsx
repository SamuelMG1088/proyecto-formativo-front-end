import React, { useState, useEffect } from "react";
import './css/updatePasswordPage.css';
import '../../styles/variables.css';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import Gov from '../../layout/Gov/Gov.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import factor1 from '../../assets/images/factorHumano1.jpg'; 
import factor2 from '../../assets/images/factorHumano2.png'; 
import factor3 from '../../assets/images/factorHumano3.png';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export const UpdatePasswordPage = () => {
    const { t } = useTranslation();
    const [currentSlide, setCurrentSlide] = useState(0);
    const images = [factor1, factor2, factor3];

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const email = location?.state?.email || '';
    const code = location?.state?.code || '';

    useEffect(() => {
        // Redirigir si no se proporcionan email o código
        if (!email || !code) {
            Swal.fire(
                t('updatePasswordPage.alerts.missingInfo.title'),
                t('updatePasswordPage.alerts.missingInfo.text'),
                'error'
            ).then(() => navigate('/'));
        }
    }, [email, code, navigate, t]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const handleUpdatePassword = async () => {
        if (!password || !confirmPassword) {
            Swal.fire(
                t('updatePasswordPage.alerts.emptyFields.title'),
                t('updatePasswordPage.alerts.emptyFields.text'),
                'warning'
            );
            return;
        }

        if (password !== confirmPassword) {
            Swal.fire(
                t('updatePasswordPage.alerts.passwordMismatch.title'),
                t('updatePasswordPage.alerts.passwordMismatch.text'),
                'error'
            );
            return;
        }

        if (password.length < 6) {
            Swal.fire(
                t('updatePasswordPage.alerts.passwordLength.title'),
                t('updatePasswordPage.alerts.passwordLength.text'),
                'error'
            );
            return;
        }

        try {
            await axios.post('http://localhost:3000/api/password-reset/reset-password', {
                email,
                code,
                newPassword: password,
                confirmPassword
            });

            Swal.fire(
                t('updatePasswordPage.alerts.success.title'),
                t('updatePasswordPage.alerts.success.text'),
                'success'
            ).then(() => {
                navigate('/');
            });
        } catch (error) {
            const msg = error?.response?.data?.message || t('updatePasswordPage.alerts.apiError.text');
            Swal.fire(
                t('updatePasswordPage.alerts.apiError.title'),
                t('updatePasswordPage.alerts.apiError.text', { message: msg }),
                'error'
            );
        }
    };

    return (
        <div id="UpdatePasswordPage">
            <Gov />
            <HeaderIcons />
            <div className="UpdatePage">
                <div className="frame">
                    <h1>{t('updatePasswordPage.title')}</h1>
                    <p>{t('updatePasswordPage.subtitle')}</p>

                    <div className="input-box-email">
                        <label>{t('updatePasswordPage.newPasswordLabel')}</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {showPassword ? (
                            <BsEyeFill 
                                className="icon" 
                                onClick={togglePasswordVisibility} 
                                title={t('updatePasswordPage.passwordVisibility.hide')}
                            />
                        ) : (
                            <BsEyeSlashFill 
                                className="icon" 
                                onClick={togglePasswordVisibility} 
                                title={t('updatePasswordPage.passwordVisibility.show')}
                            />
                        )}
                    </div>

                    <div className="input-box-email">
                        <label>{t('updatePasswordPage.confirmPasswordLabel')}</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {showPassword ? (
                            <BsEyeFill 
                                className="icon" 
                                onClick={togglePasswordVisibility} 
                                title={t('updatePasswordPage.passwordVisibility.hide')}
                            />
                        ) : (
                            <BsEyeSlashFill 
                                className="icon" 
                                onClick={togglePasswordVisibility} 
                                title={t('updatePasswordPage.passwordVisibility.show')}
                            />
                        )}
                    </div>

                    <button className="BottonUpdate" type="button" onClick={handleUpdatePassword}>
                        {t('updatePasswordPage.updateButton')}
                    </button>
                </div>

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