import React, { useState, useEffect } from 'react';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import BannerHome9 from '../../assets/images/factorHumano7.jpg'
import BannerHome10 from '../../assets/images/factorHumano8.jpg'
import BannerUser from '../../assets/images/factorHumano9.jpg'
import { IoIosCheckbox } from "react-icons/io";
import factor1 from '../../assets/images/factorHumano1.jpg'
import { GiColombia } from "react-icons/gi";
import { Link } from 'react-router-dom';
import '../Manuales/Manuales.css';
import '../../styles/variables.css'
import { useTranslation } from 'react-i18next';
import { FaArrowLeftLong } from "react-icons/fa6";
import Imagenmanual1 from "../../assets/Manuales/Usuario/Imagen-manual1.jpg"
import Imagenmanual2 from "../../assets/Manuales/Usuario/imagen-manual2.jpg"
import Imagenmanual3 from "../../assets/Manuales/Usuario/imagen-manual3.jpg"
import Imagenmanual4 from "../../assets/Manuales/Usuario/imagen-manual4.jpg"
import Imagenmanual5 from "../../assets/Manuales/Usuario/imagen-manual5.jpg"
import Imagenmanual6 from "../../assets/Manuales/Usuario/imagen-manual6.jpg"
import Imagenmanual7 from "../../assets/Manuales/Usuario/imagen-manual7.jpg"
import Imagenmanual8 from "../../assets/Manuales/Usuario/imagen-manual8.jpg"
import Imagenmanual9 from "../../assets/Manuales/Usuario/imagen-manual9.jpg"
import Imagenmanual10 from "../../assets/Manuales/Usuario/imagen-manual10.jpg"
import Imagenmanual11 from "../../assets/Manuales/Usuario/imagen-manual11.jpg"
import Imagenmanual12 from "../../assets/Manuales/Usuario/imagen-manual12.jpg"
import Imagenmanual13 from "../../assets/Manuales/Usuario/imagen-manual13.jpg"
import Imagenmanual14 from "../../assets/Manuales/Usuario/imagen-manual14.jpg"
import Imagenmanual15 from "../../assets/Manuales/Usuario/imagen-manual15.jpg"
import Imagenmanual16 from "../../assets/Manuales/Usuario/imagen-manual16.jpg"
import Imagenmanual17 from "../../assets/Manuales/Usuario/imagen-manual17.jpg"
import Imagenmanual18 from "../../assets/Manuales/Usuario/imagen-manual18.jpg"
// import Imagenmanual16 from "../../assets/Manuales/Usuario/imagen-manual16.jpg"
// import Imagenmanual16 from "../../assets/Manuales/Usuario/imagen-manual16.jpg"
// import Imagenmanual16 from "../../assets/Manuales/Usuario/imagen-manual16.jpg"
// import Imagenmanual16 from "../../assets/Manuales/Usuario/imagen-manual16.jpg"

const ManualUser = () => {
  const { t } = useTranslation();

  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [BannerHome9, BannerHome10, BannerUser];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
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
            {images.map((image, index) =>  (
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
              <Link to="/" className='link_senaa'>
                 <h> Volver al login</h>
              </Link>
              <Link to="/ManualOperaciones" className='link_sena'>
                 <h> Manual de operaciones</h>
              </Link>
              <Link to="/Manualinstalacion" className='link_sena'>
                 <h> Manual de instalacion</h>
              </Link>
            </section>
            <div className='sena-content-section'>
               <img src={Imagenmanual1} alt="Acceso denegado"  className='Prueba-imagen'/><p className='prueba1'>Se carga el navegador preferido y que cuente con internet disponible. En esta demostración utilizaremos Google Chrome. Colocamos el puntero del ratón (mouse) sobre el icono Google Chrome y presionamos dos veces seguidas el botón izquierdo del ratón. Una vez que se encuentre en el entorno del navegador, digitamos la dirección de la página web correspondiente a la aplicación SISGEEC (PENDIENTE) en la casilla de URL.</p>
            </div>


            <div className='sena-content-section1'>
              <p className='prueba-p'>Una vez la página está cargada el usuario está ubicado en el login de inicio de sesión del sistema de información en donde puede visualizar lo siguiente:
                <br /> <br /> • Encontramos dos opciones en el menú blanco donde se determina el logo del sistema y el logo del SENA: </p><img src={Imagenmanual2} alt="login"  className='Prueba-imagen1'/>
            </div>
            <div className='sena-content-section'>
               <img src={Imagenmanual3} alt="Acceso denegado"  className='Prueba-imagen'/><p className='prueba1'>•	Al hacer clic en el ícono con forma de luna, los usuarios pueden activar el modo nocturno del sistema, lo que facilita la visualización y reduce la fatiga ocular.</p>
            </div>


            <div className='sena-content-section1'>
              <p className='prueba-p'>•	El ícono del mundo indica el idioma actual del sistema: “EN” significa que está en español y permite cambiar a inglés; “ES” indica que está en inglés y permite cambiar a español. Así, los usuarios pueden practicar y aprender los dos idiomas.</p><img src={Imagenmanual4} alt="Acceso denegado"  className='Prueba-imagen1'/>
            </div>
            <div className='sena-content-section'>
               <img src={Imagenmanual5} alt="Acceso denegado"  className='Prueba-imagen'/><p className='prueba1'>	Para acceder al sistema, se requiere un correo electrónico y una contraseña proporcionados por el administrador. La contraseña puede visualizarse utilizando el ícono de “ojo” dentro del campo, lo que permite comprobar que se haya escrito correctamente. Es importante que la información ingresada coincida exactamente con los datos suministrados. <br /> <br /> •	Una vez ingresada la información en los campos, haga clic en el botón “Ingresar” para acceder al sistema.</p>
            </div>


            <div className='sena-content-section1'>
              <p className='prueba-p'>• Si no recuerda la contraseña proporcionada por el administrador, puede recuperarla haciendo clic en “Olvidé mi contraseña”. Esto lo llevará a una página donde deberá ingresar el correo electrónico asociado a su cuenta.</p><img src={Imagenmanual6} alt="Acceso denegado"  className='Prueba-imagen1'/>
            </div>
            <div className='sena-content-section'>
               <img src={Imagenmanual7} alt="Acceso denegado"  className='Prueba-imagen'/><p className='prueba1'>•	Esto lo llevará a la página de solicitud de correo electrónico. Debe ingresar el mismo correo que le proporcionó el administrador del sistema.</p>
            </div>


            <div className='sena-content-section1'>
              <p className='prueba-p'>•	Al ingresar su correo electrónico, recibirá un código de verificación de 6 dígitos para confirmar su identidad. Debe ingresar cada número en los cuadros correspondientes de la página.</p><img src={Imagenmanual8} alt="Acceso denegado"  className='Prueba-imagen1'/>
            </div>
            <div className='sena-content-section'>
               <img src={Imagenmanual9} alt="Acceso denegado"  className='Prueba-imagen'/><p className='prueba1'>Cuando el código de 6 dígitos llegue a su correo electrónico y sea ingresado correctamente, el sistema habilitará la opción para actualizar la contraseña. Deberá escribir la nueva contraseña en el primer campo y confirmarla en el segundo, con el fin de verificar que coincidan.
               Una vez actualizada, podrá ingresar al sistema sin inconvenientes utilizando su nueva contraseña.</p>
            </div>


            <div className='sena-content-section1'>
              <p className='prueba-p'>Al iniciar sesión, se mostrará una ventana emergente de bienvenida con su nombre de usuario.
              En el ejemplo, el sistema muestra el mensaje de bienvenida dirigido al usuario Super Admin.</p><img src={Imagenmanual10} alt="Acceso denegado"  className='Prueba-imagen1'/>
            </div>
            <div className='sena-content-section'>
               <img src={Imagenmanual11} alt="Acceso denegado"  className='Prueba-imagen'/><p className='prueba1'>Al iniciar sesión, lo primero que visualizará será la página de inicio (Home), la cual está dividida en tres secciones principales: <br /><br />
              1. Menú y carrusel de imágenes <br /><br />
              En esta sección encontrará el menú de opciones que le permitirá navegar hacia las diferentes funcionalidades del sistema. <br /> <br /> También se incluye un carrusel de imágenes representativas del propósito principal del software.</p>
            </div>


            <div className='sena-content-section1'>
              <p className='prueba-p'>2. Contenido institucional del SENA <br /> <br />Aquí se muestra un video de YouTube alusivo al SENA, su cultura y su representación institucional. <br /> <br />
              Además, se incluye un texto informativo relacionado con el SENA y con el software.</p><img src={Imagenmanual12} alt="Acceso denegado"  className='Prueba-imagen1'/>
            </div>
            <div className='sena-content-section'>
               <img src={Imagenmanual13} alt="Acceso denegado"  className='Prueba-imagen'/><p className='prueba1'>3. Diagnóstico empresarial <br /> <br />
                Al final de la página se presenta una descripción sobre el diagnóstico empresarial. <br /> <br />
                Se incluye un botón que, al seleccionarlo, le permitirá realizar el diagnóstico para identificar qué aprendices contratar.</p>
            </div>


            <div className='sena-content-section1'>
                <p className='prueba-p'>En la parte superior de la interfaz se encuentra una barra de navegación de color blanco. Esta barra contiene las principales opciones de acceso al sistema, organizadas de la siguiente manera: Home, Usuarios, Programas de formación, Perfil y Cerrar sesión. <br /> <br />
                Home: lo redirige a la página principal del sistema, donde podrá visualizar el contenido general, como el carrusel de imágenes, el video institucional y la sección de diagnóstico empresarial. <br /> <br />
                Usuarios: le permite acceder al módulo de gestión de usuarios, en el cual podrá consultar, crear, modificar o suspender usuarios según los permisos que tenga asignados. <br /> <br />
                Programas de formación: lo lleva al módulo donde se listan los programas de formación disponibles. Desde aquí podrá visualizar información detallada sobre cada programa. <br /> <br />
                Perfil: esta opción abre el módulo de perfil personal del usuario que ha iniciado sesión. Allí podrá consultar sus datos, actualizarlos y personalizar información según corresponda. <br /> <br />
                Cerrar sesión: finaliza la sesión activa y lo redirige a la pantalla de inicio de sesión para garantizar la seguridad de la cuenta..</p><img src={Imagenmanual14} alt="Acceso denegado"  className='Prueba-imagen2'/>
            </div>
            <div className='sena-content-section'>
               <img src={Imagenmanual15} alt="Acceso denegado"  className='Prueba-imagen'/><p className='prueba1'>Si el ingreso al sistema se realiza con un usuario de tipo Empresa, solo estarán disponibles los módulos: Home, Programas de formación, Diagnóstico empresarial, Perfil y Cerrar sesión. Estos permiten consultar información general, realizar el diagnóstico para la contratación de aprendices, gestionar el perfil de usuario y finalizar la sesión de forma segura.</p>
            </div>


            <div className='sena-content-section1'>
              <p className='prueba-p'>En los módulos Home, Usuarios, Programas de formación, Diagnóstico empresarial y Perfil, la interfaz mantiene siempre una misma estructura compuesta por cuatro secciones principales: <br /> <br />
              Sección 1: Barra superior azul del GOV.CO: ubicada en la parte más alta de la pantalla, con la imagen institucional del Gobierno de Colombia. <br /> <br />
              Sección 2: Barra de navegación secundaria: contiene el logo del software y el logo del SENA, junto con las opciones para activar el modo oscuro o claro y la opción de cambiar el idioma. <br /> <br />
              Sección 3: Menú de opciones: permite elegir a qué módulo desea dirigirse dentro del sistema. <br /> <br />
              Sección 4: Carrusel de imágenes: muestra imágenes alusivas al propósito del software, reforzando su identidad visual.</p><img src={Imagenmanual16} alt="Acceso denegado"  className='Prueba-imagen2'/>
            </div>
            <div className='sena-content-section'>
               <img src={Imagenmanual17} alt="Acceso denegado"  className='Prueba-imagen'/><p className='prueba2'>Al hacer clic en la opción Usuarios de la barra de navegación, el sistema lo redirigirá al Directorio de Usuarios (disponible únicamente para administradores). <br /><br />
                En este módulo, el administrador podrá realizar las siguientes acciones: <br /><br />
                Crear nuevos usuarios.<br /><br />
                Listar los usuarios existentes.<br /><br />
                Visualizar la información detallada de cada usuario. <br /><br />
                Modificar los datos registrados.<br /><br />
                Inactivar usuarios cuando sea necesario.<br /><br />
                Generar reportes de los usuarios en formatos Excel y PDF.</p>
            </div>
            <div className='sena-content-section1'>
              <p className='prueba-p'>Al ingresar al módulo Usuarios, el administrador podrá acceder a la lista de usuarios registrados en el sistema. Esta sección cuenta con diferentes funcionalidades que permiten gestionar la información de manera eficiente. <br /> <br />
              nota: Los datos de los usuarios se muestran de forma censurada para garantizar la protección de la información personal y cumplir con las normas de seguridad de datos</p><img src={Imagenmanual18} alt="Acceso denegado"  className='Prueba-imagen1'/>
            </div>
            <div className='sena-content-section'>
               <img src={Imagenmanual1} alt="Acceso denegado"  className='Prueba-imagen'/><p className='prueba1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima quis eveniet perferendis? Nobis ut iusto veniam harum ratione. Velit minima iure harum quas recusandae. Quisquam consectetur laboriosam autem iure iste.</p>
            </div>


            <div className='sena-content-section1'>
              <p className='prueba-p'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae necessitatibus ab doloribus saepe quisquam ipsum ratione quos officiis. Ducimus similique reprehenderit id maiores temporibus quo expedita asperiores officiis cum quae.</p><img src={Imagenmanual1} alt="Acceso denegado"  className='Prueba-imagen1'/>
            </div>
            <div className='sena-content-section'>
               <img src={Imagenmanual1} alt="Acceso denegado"  className='Prueba-imagen'/><p className='prueba1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima quis eveniet perferendis? Nobis ut iusto veniam harum ratione. Velit minima iure harum quas recusandae. Quisquam consectetur laboriosam autem iure iste.</p>
            </div>


            <div className='sena-content-section1'>
              <p className='prueba-p'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae necessitatibus ab doloribus saepe quisquam ipsum ratione quos officiis. Ducimus similique reprehenderit id maiores temporibus quo expedita asperiores officiis cum quae.</p><img src={Imagenmanual1} alt="Acceso denegado"  className='Prueba-imagen1'/>
            </div>
            <div className='sena-content-section'>
               <img src={Imagenmanual1} alt="Acceso denegado"  className='Prueba-imagen'/><p className='prueba1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima quis eveniet perferendis? Nobis ut iusto veniam harum ratione. Velit minima iure harum quas recusandae. Quisquam consectetur laboriosam autem iure iste.</p>
            </div>


            <div className='sena-content-section1'>
              <p className='prueba-p'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae necessitatibus ab doloribus saepe quisquam ipsum ratione quos officiis. Ducimus similique reprehenderit id maiores temporibus quo expedita asperiores officiis cum quae.</p><img src={Imagenmanual1} alt="Acceso denegado"  className='Prueba-imagen1'/>
            </div>
            <div className='sena-content-section'>
               <img src={Imagenmanual1} alt="Acceso denegado"  className='Prueba-imagen'/><p className='prueba1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima quis eveniet perferendis? Nobis ut iusto veniam harum ratione. Velit minima iure harum quas recusandae. Quisquam consectetur laboriosam autem iure iste.</p>
            </div>


            <div className='sena-content-section1'>
              <p className='prueba-p'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae necessitatibus ab doloribus saepe quisquam ipsum ratione quos officiis. Ducimus similique reprehenderit id maiores temporibus quo expedita asperiores officiis cum quae.</p><img src={Imagenmanual1} alt="Acceso denegado"  className='Prueba-imagen1'/>
            </div>
            <div className='sena-content-section'>
               <img src={Imagenmanual1} alt="Acceso denegado"  className='Prueba-imagen'/><p className='prueba1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima quis eveniet perferendis? Nobis ut iusto veniam harum ratione. Velit minima iure harum quas recusandae. Quisquam consectetur laboriosam autem iure iste.</p>
            </div>


            <div className='sena-content-section1'>
              <p className='prueba-p'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae necessitatibus ab doloribus saepe quisquam ipsum ratione quos officiis. Ducimus similique reprehenderit id maiores temporibus quo expedita asperiores officiis cum quae.</p><img src={Imagenmanual1} alt="Acceso denegado"  className='Prueba-imagen1'/>
            </div>
            <div className='sena-content-section'>
               <img src={Imagenmanual1} alt="Acceso denegado"  className='Prueba-imagen'/><p className='prueba1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima quis eveniet perferendis? Nobis ut iusto veniam harum ratione. Velit minima iure harum quas recusandae. Quisquam consectetur laboriosam autem iure iste.</p>
            </div>


            <div className='sena-content-section1'>
              <p className='prueba-p'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae necessitatibus ab doloribus saepe quisquam ipsum ratione quos officiis. Ducimus similique reprehenderit id maiores temporibus quo expedita asperiores officiis cum quae.</p><img src={Imagenmanual1} alt="Acceso denegado"  className='Prueba-imagen1'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManualUser;
