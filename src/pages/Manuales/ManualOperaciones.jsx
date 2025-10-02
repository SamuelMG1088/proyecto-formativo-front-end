import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Layouts
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';

// Imágenes del carrusel
import BannerHome9 from '../../assets/images/factorHumano7.jpg';
import BannerHome10 from '../../assets/images/factorHumano8.jpg';
import BannerUser from '../../assets/images/factorHumano9.jpg';

// Recursos adicionales
import Imagenmanual25 from "../../assets/Manuales/Usuario/imagen-manual25.jpg"
import Imagenmanual10 from "../../assets/Manuales/Usuario/imagen-manual10.jpg";
import Imagenmanual18 from "../../assets/Manuales/Usuario/imagen-manual18.jpg";
import Imagenmanual22 from "../../assets/Manuales/Usuario/imagen-manual22.jpg"
import Imagenmanual23 from "../../assets/Manuales/Usuario/imagen-manual23.jpg"
import Imagenmanual27 from "../../assets/Manuales/Usuario/imagen-manual27.jpg"
import Imagenmanual29 from "../../assets/Manuales/Usuario/imagen-manual29.jpg"
import Imagenmanual31 from "../../assets/Manuales/Usuario/imagen-manual31.jpg"
import Imagenmanual32 from "../../assets/Manuales/Usuario/imagen-manual32.jpg"
import Imagenmanual33 from "../../assets/Manuales/Usuario/imagen-manual33.jpg"
import Imagenmanual36 from "../../assets/Manuales/Usuario/imagen-manual36.jpg"
import Imagenmanual37 from "../../assets/Manuales/Usuario/imagen-manual37.jpg"
import Imagenoperacion1 from "../../assets/Manuales/operaciones/imagen-operacion1.png"
import Imagenoperacion2 from "../../assets/Manuales/operaciones/imagen-operacion2.jpg"
import Imagenmanual11 from "../../assets/Manuales/Usuario/imagen-manual11.jpg"
import Imagenmanual12 from "../../assets/Manuales/Usuario/imagen-manual12.jpg"
import Imagenmanual19 from "../../assets/Manuales/Usuario/imagen-manual19.jpg"
import Imagenmanual34 from "../../assets/Manuales/Usuario/imagen-manual34.jpg"

// Estilos
import '../Manuales/Manuales.css';

const ManualUser = () => {
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
    <div id="Homepages">
      <div className="home">
        <Gov />
        <HeaderIcons />

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

        {/* Contenido principal */}
        <div className="home-content">
          <div className="home-section">

            {/* Navegación */}
            <section className="sena-colombia">
              <Link to="/" className="link_senaa">
                <span>Volver al login</span>
              </Link>
              <Link to="/ManualUser" className="link_sena">
                <span>Manual de usuario</span>
              </Link>
            </section>

            {/* Manual */}
            <div className="sena-content-section3">
              <h2><strong>MANUAL DE OPERACIONES</strong></h2>

              <p className="Manual-operaciones">
                <strong>SISGEEC – Sistema de Gestión Empresarial</strong> <br /><br />

                <strong>Autores:</strong> Trinity Code <br /><br />
                <strong>Centro de Formación:</strong> SENA – CDITI <br /><br />
                <strong>Fecha:</strong> 2025 <br /><br />

                <h3>Introducción</h3>
                Este manual de operaciones tiene como propósito orientar a los usuarios en el uso del sistema de información SISGEEC, explicando de manera clara y práctica las funcionalidades disponibles según el rol asignado. Se incluyen descripciones de procesos, capturas de pantalla y ejemplos que facilitan la comprensión del sistema. <br /><br />

                <h3>Objetivo</h3>
                Dar a conocer, de forma sencilla y estructurada, los procesos y acciones que los usuarios pueden realizar dentro de SISGEEC, diferenciados por roles de acceso. <br /><br />

                <h3>Responsables y alcance de las tareas</h3>
                <strong>Equipo de Desarrollo:</strong> codificación, pruebas y despliegue de SISGEEC. <br />
                <strong>Equipo de Documentación:</strong> elaboración de manuales e instructivos. <br />
                <strong>Administrador del sistema:</strong> control de usuarios, roles y mantenimiento de datos. <br /><br />

                <h3>Descripción de procedimientos</h3>
                <h4>1. Administradores</h4>
                Los administradores pueden realizar todas las acciones del sistema: <br /><br />

                <strong>Iniciar sesión.</strong><br />
                <img src={Imagenmanual10} alt="Pantalla de inicio de sesión" className="img-operaciones" /><br /><br />

                - Gestionar usuarios (crear, listar, visualizar, editar, inactivar, exportar). <br />
                <img src={Imagenmanual25} alt="Crear usuario" className="img-operaciones" /><br /><br />
                <img src={Imagenmanual18} alt="Listar Usuarios" className="img-operaciones" /><br /><br />
                <img src={Imagenmanual22} alt="visualizar el perfil" className="img-operaciones" /><br /><br />
                <img src={Imagenmanual23} alt="editar y suspender" className="img-operaciones" /><br /><br />
                <img src={Imagenmanual27} alt="Exportar" className="img-operaciones" /><br /><br />
                - Consultar y administrar programas de formación. <br />
                <img src={Imagenmanual29} alt="Programa de formación" className="img-operaciones" /><br /><br />
                - Visualizar y responder diagnósticos empresariales. <br />
                <img src={Imagenmanual31} alt="Diagnostico" className="img-operaciones" /><br /><br />
                <img src={Imagenmanual32} alt="Diagnostico" className="img-operaciones" /><br /><br />
                <img src={Imagenmanual33} alt="Resultado diagnostico" className="img-operaciones" /><br /><br />
                - Configurar su perfil de usuario. <br />
                <img src={Imagenmanual36} alt="Perfil" className="img-operaciones" /><br /><br />
                - Cerrar sesión. <br /><br />
                <img src={Imagenmanual37} alt="cerrar sesión" className="img-operaciones" /><br /><br />

                <h4>2. Empresas</h4>
                Los usuarios tipo empresa cuentan con permisos limitados: <br /><br />

                - Iniciar sesión. <br />
                <img src={Imagenmanual10} alt="Pantalla de inicio de sesión" className="img-operaciones" /><br /><br />
                - Consultar programas de formación. <br />
                <img src={Imagenoperacion1} alt="listar Programa de formación" className="img-operaciones" /><br /><br />
                - Realizar el diagnóstico empresarial y visualizar resultados en gráficas y listados. <br />
                <img src={Imagenmanual31} alt="Diagnostico" className="img-operaciones" /><br /><br />
                <img src={Imagenmanual32} alt="Diagnostico" className="img-operaciones" /><br /><br />
                <img src={Imagenmanual33} alt="Resultado diagnostico" className="img-operaciones" /><br /><br />
                - Gestionar y actualizar su perfil. <br />
                <img src={Imagenmanual36} alt="Perfil" className="img-operaciones" /><br /><br />
                <img src={Imagenoperacion2} alt="editar perfil" className="img-operaciones" /><br /><br />
                - Cerrar sesión. <br /><br />
                <img src={Imagenmanual37} alt="cerrar sesión" className="img-operaciones" /><br /><br />


                <h3>Pantallas principales</h3>
                 <strong>Home:</strong> estructura con navbar GOV, menú de módulos y carrusel de imágenes. <br />
                <img src={Imagenmanual11} alt="Home" className="img-operaciones" /><br /><br />
                <img src={Imagenmanual12} alt="Home" className="img-operaciones" /><br /><br />
                 <strong>Módulo Usuarios:</strong> listado, filtros, perfil, edición, suspensión y exportación. <br />
                 <img src={Imagenmanual18} alt="Listar Usuarios" className="img-operaciones" /><br /><br />
                 <img src={Imagenmanual19} alt="Filtro"  className='img-operaciones'/>
                 <img src={Imagenmanual22} alt="visualizar el perfil" className="img-operaciones" /><br /><br />
                 <img src={Imagenmanual23} alt="editar y suspender" className="img-operaciones" /><br /><br />
                 <img src={Imagenmanual27} alt="Exportar" className="img-operaciones" /><br /><br />
                 <strong>Módulo Programas de Formación:</strong> consulta y visualización. <br />
                 <img src={Imagenoperacion1} alt="listar Programa de formación" className="img-operaciones" /><br /><br />
                 <strong>Módulo Diagnóstico Empresarial:</strong> formulario, confirmación, resultados con gráfica y listado. <br />
                 <img src={Imagenmanual31} alt="Diagnostico" className="img-operaciones" /><br /><br />
                <img src={Imagenmanual32} alt="Diagnostico" className="img-operaciones" /><br /><br />
                <img src={Imagenmanual33} alt="Resultado diagnostico" className="img-operaciones" /><br /><br />
                <img src={Imagenmanual34} alt="Resultado diagnostico" className="img-operaciones" /><br /><br />

                - <strong>Módulo Perfil:</strong> gestión de datos del usuario. <br />
                <img src={Imagenmanual36} alt="Perfil" className="img-operaciones" /><br /><br />
                - <strong>Cerrar sesión:</strong> confirmación y retorno al login. <br /><br />
                <img src={Imagenmanual37} alt="cerrar sesión" className="img-operaciones" /><br /><br />

                <h3>Contactos</h3>
                <strong>Equipo de desarrollo SISGEEC</strong> <br /><br />

                Stephania Herrera Duque – Desarrollador Backend <br /><br />
                Jhonatan Stiven Acevedo Mendoza, Samuel Monsalve Gómez – Desarrollador Frontend <br /><br />
                Jhonatan Stiven Acevedo Mendoza, Samuel Monsalve Gómez y Stephania Herrera Duque – Documentación y pruebas <br /><br />
                Correo de soporte: <a href="mailto:sisgeec@gmail.com">sisgeec@gmail.com</a> <br /><br />

                <h3>Glosario</h3>
                <strong>Administrador:</strong> Usuario con acceso completo a todos los módulos. <br />
                <strong>Empresa:</strong> Usuario que representa a una entidad contratante, con permisos limitados. <br />
                <strong>Diagnóstico empresarial:</strong> Herramienta que permite identificar programas según necesidades. <br />
                <strong>Perfil:</strong> Sección donde cada usuario gestiona sus datos. <br />
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualUser;
