import React, { useState, useEffect } from 'react';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import BannerHome9 from '../../assets/banners/BannerHome9.png'
import BannerHome10 from '../../assets/banners/BannerHome10.png'
import BannerUser from '../../assets/banners/BannerUsers.png'
import NavBar from '../../layout/NavBar/NavBar.jsx';
import { IoIosCheckbox } from "react-icons/io";
import factor1 from '../../assets/images/factorHumano1.jpg'
import { GiColombia } from "react-icons/gi";
import { Link } from 'react-router-dom';
import './css/Home.css';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [BannerHome9, BannerHome10, BannerUser];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 16000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div id="Homepage">
      <div className="home">
        <Gov />
        <HeaderIcons />
        <NavBar />

        {/* Carrusel */}
        <div className="home-carousel">
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

        <div className="home-content">
          <div className="home-sections">

            {/* SENA Colombia */}
            <section className="sena-colombia">
              <div className="title-seccion-sena">
                <GiColombia className='icon-map'/>
                <h1>{t("home.senaTitle")}</h1>
              </div>
              <div className="sena-content-section">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/k5rZk-qC0JM?si=Iu-h8RfFA4Hynll-" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                <p>{t("home.senaDescription")}</p>
              </div>
            </section>

            {/* Sistema de Gestión Empresarial */}
            <section className="section-sistema-gestion">
              <div className="info-sisgeec">
                <h2>{t("home.systemTitle")}</h2>
                <h3>{t("home.systemSubtitle")}</h3>

                <h4><IoIosCheckbox className='icon-checkbox' />{t("home.feature1.title")}</h4>
                <p>{t("home.feature1.desc")}</p>
                
                <h4><IoIosCheckbox className='icon-checkbox' />{t("home.feature2.title")}</h4>
                <p>{t("home.feature2.desc")}</p>

                <h4><IoIosCheckbox className='icon-checkbox' />{t("home.feature3.title")}</h4>
                <p>{t("home.feature3.desc")}</p>
              </div>

              <img src={factor1} alt=""/>
            </section>

            {/* Diagnóstico */}
            <section className="section-completed-diagnosis">
              <div className="content-diagnosis">
                <h3>{t("home.diagnosisTitle")}</h3>
                <p>{t("home.diagnosisDesc")}</p>
                <Link to="/businessdiagnosis">
                  <button className='btn-completar'>{t("home.diagnosisButton")}</button>
                </Link>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
