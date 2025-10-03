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
import '../Manuales/manuales.css';
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
import Imagenmanual19 from "../../assets/Manuales/Usuario/imagen-manual19.jpg"
import Imagenmanual20 from "../../assets/Manuales/Usuario/imagen-manual20.jpg"
import Imagenmanual21 from "../../assets/Manuales/Usuario/imagen-manual21.jpg"
import Imagenmanual22 from "../../assets/Manuales/Usuario/imagen-manual22.jpg"
import Imagenmanual23 from "../../assets/Manuales/Usuario/imagen-manual23.jpg"
import Imagenmanual24 from "../../assets/Manuales/Usuario/imagen-manual24.jpg"
import Imagenmanual25 from "../../assets/Manuales/Usuario/imagen-manual25.jpg"
import Imagenmanual26 from "../../assets/Manuales/Usuario/imagen-manual26.jpg"
import Imagenmanual27 from "../../assets/Manuales/Usuario/imagen-manual27.jpg"
import Imagenmanual28 from "../../assets/Manuales/Usuario/imagen-manual28.jpg"
import Imagenmanual29 from "../../assets/Manuales/Usuario/imagen-manual29.jpg"
import Imagenmanual30 from "../../assets/Manuales/Usuario/imagen-manual30.jpg"
import Imagenmanual31 from "../../assets/Manuales/Usuario/imagen-manual31.jpg"
import Imagenmanual32 from "../../assets/Manuales/Usuario/imagen-manual32.jpg"
import Imagenmanual33 from "../../assets/Manuales/Usuario/imagen-manual33.jpg"
import Imagenmanual34 from "../../assets/Manuales/Usuario/imagen-manual34.jpg"
import Imagenmanual35 from "../../assets/Manuales/Usuario/imagen-manual35.jpg"
import Imagenmanual36 from "../../assets/Manuales/Usuario/imagen-manual36.jpg"
import Imagenmanual37 from "../../assets/Manuales/Usuario/imagen-manual37.jpg"

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
      <div className="homes">
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
            </div>Al iniciar sesión, se mostrará una ventana emergente de bienvenida con su nombre de usuario. En el ejemplo, el sistema muestra el mensaje de bienvenida dirigido al usuario Super Admin.




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
               <img src={Imagenmanual19} alt="Acceso denegado"  className='Prueba-imagen'/><p className='prueba2'>En la parte superior de la tabla de registros se encuentra una barra de filtros que facilita la búsqueda y organización de la información. Las opciones disponibles son: <br /> <br />
              Tipo de documento: permite filtrar por C.C (Cédula de Ciudadanía), C.E (Cédula de Extranjería) o NIT. <br /> <br />
              Rol: filtra según el rol asignado al usuario, ya sea Administrador o Empresa. <br /> <br />
              Estado: muestra únicamente los usuarios en estado Activo o Inactivo. <br /> <br />
              Resetear filtros: opción para limpiar todos los filtros aplicados y volver a mostrar la lista completa de usuarios. <br /> <br />
              Esta barra de filtros ayuda al administrador a localizar de manera rápida y precisa la información que necesita.</p> 
            </div>


            <div className='sena-content-section1'>
              <p className='prueba-p'>En la tabla se listan todos los usuarios registrados en el sistema. Este módulo es de uso exclusivo para el administrador. <br /> <br />
              La información que se muestra en la tabla incluye las siguientes columnas: <br /> <br />
              ID: número identificador único de cada usuario. <br /> <br />
              Nombre completo: nombres y apellidos del usuario. <br /> <br />
              Correo electrónico: dirección de correo registrada en el sistema. <br /> <br />
              Tipo de documento: identificación asociada al usuario (C.C, C.E o NIT). <br /> <br />
              Rol: perfil asignado al usuario (Administrador o Empresa). <br /> <br />
              Estado: indica si el usuario se encuentra Activo o Inactivo.</p><img src={Imagenmanual20} alt="Acceso denegado"  className='Prueba-imagen1'/>
            </div>
            <div className='sena-content-section'>
               <img src={Imagenmanual21} alt="Acceso denegado"  className='Prueba-imagen'/><p className='prueba1'>A la derecha de la columna Estado se encuentra un ícono que funciona como acceso directo al perfil de cada usuario. <br /> <br />
                Al seleccionarlo, el administrador podrá visualizar la información completa del usuario elegido, lo que le permite consultar en detalle todos los datos registrados en el sistema.</p>
            </div>


            <div className='sena-content-section1'>
              <p className='prueba3'>Al hacer clic en el ícono situado a la derecha de la columna Estado, se abrirá inmediatamente la vista detallada del usuario. El diseño de esta pantalla muestra, de forma clara y ordenada, la información del usuario (los datos que aparecen son únicamente ejemplos y no son verídicos).</p><img src={Imagenmanual22} alt="Acceso denegado"  className='Prueba-imagen1'/>
            </div>

            <div className='sena-content-section'>
               <img src={Imagenmanual23} alt="Acceso denegado"  className='Prueba-imagen'/><p className='prueba1'>En la interfaz del perfil de usuario aparecen dos botones principales con funciones específicas: <br /> <br />
               Botón verde – Editar: permite modificar únicamente la información habilitada por el sistema, como el número de contacto, el correo electrónico y la dirección. <br /> <br />
               Botón azul – Suspender: inactiva al usuario seleccionado, impidiendo que continúe interactuando con el software.</p>
            </div>


            <div className='sena-content-section1'>
              <p className='prueba-p'>Al regresar a la vista de Directorio de Usuarios, se encuentra un botón de color azul con el nombre “Crear Usuario”. <br /> <br />
               Este botón redirige al administrador a un formulario en el cual podrá registrar un nuevo usuario, ingresando la información requerida por el sistema para completar el proceso de creación.</p><img src={Imagenmanual24} alt="Acceso denegado"  className='Prueba-imagen1'/>
            </div>
            <div className='sena-content-section'>
               <img src={Imagenmanual25} alt="Acceso denegado"  className='Prueba-imagen'/><p className='prueba1'>Al hacer clic en el botón “Crear usuario”, el sistema lo redirigirá a un formulario de registro. <br /> <br />
                En este formulario aparecerán los campos que deben ser diligenciados con la información correspondiente. Es importante completar todos los campos obligatorios, ya que solo de esta manera el sistema permitirá guardar el registro correctamente y asegurar que el usuario quede con   información completa, verídica y confiable.</p>
            </div>


            <div className='sena-content-section1'>
              <p className='prueba-p'>Se diligenció el formulario de creación de usuario a modo de ejemplo. <br /> <br />
              Si toda la información ingresada es correcta y coincide con los requisitos del sistema, el registro será exitoso. En este caso, el sistema mostrará una alerta de confirmación como se evidencia en la imagen de referencia.</p><img src={Imagenmanual26} alt="Acceso denegado"  className='Prueba-imagen1'/>
            </div>
            <div className='sena-content-section'>
               <img src={Imagenmanual27} alt="Acceso denegado"  className='Prueba-imagen'/><p className='prueba1'>En la sección de Directorio de Usuarios, donde se listan todos los registros, se encuentran dos botones de exportación identificados con los logotipos de PDF y Excel. <br /> <br />
               Al hacer clic en el botón con el logo de PDF, el sistema generará un reporte de los usuarios en dicho formato. <br /> <br />
               Al hacer clic en el botón con el logo de Excel, se exportará la información en formato .xlsx. <br /> <br /> 
               De esta manera, el administrador puede obtener reportes de los usuarios en el formato que más se ajuste a sus necesidades.</p>
            </div>


            <div className='sena-content-section1'>
              <p className='prueba-p'>Al hacer clic en la opción Programas de Formación de la barra de navegación, el sistema lo redirigirá al Directorio de Programas de Formación. <br /> br
                En este módulo, el administrador podrá realizar las siguientes acciones: <br /> <br />
                1. Crear nuevos Programas de Formación. <br /> <br />
                2. Listar los Programas de Formación existentes. <br /> <br />
                3. Visualizar la información detallada de cada Programa de Formación. <br /> <br />
                4. Modificar los datos registrados. <br /> <br />
                5. Inactivar Programas de Formación cuando sea necesario. <br /> <br />
                6. Generar reportes de los programas de formación en formatos Excel y PDF. <br /> <br />
                En el caso del usuario empresa, podrá realizar las opciones: 2, 3 y 6.</p><img src={Imagenmanual28} alt="Acceso denegado"  className='Prueba-imagen1'/>
            </div>
            <div className='sena-content-section'>
               <img src={Imagenmanual29} alt="Acceso denegado"  className='Prueba-imagen3'/>
                <p className='prueba4'>La arquitectura del software mantiene una estructura uniforme en todos los módulos, lo que facilita la navegación y el uso del sistema. <br /> <br />
                Tablas: representan la información listada de los registros disponibles en cada módulo.<br /> <br />
                Íconos a la derecha: permiten visualizar en detalle el contenido seleccionado o la información requerida.<br /> <br />
                Botones de exportación (PDF y Excel): generan reportes de la información listada en los formatos correspondientes.<br /> <br />
                Barra de filtros (parte superior de la tabla): permite refinar la búsqueda según las opciones disponibles en cada módulo.<br /> <br />
                Botón “Crear”: su disponibilidad depende de los permisos del usuario. Por ejemplo, el usuario final no cuenta con acceso a este botón ni a ciertas acciones, ya que solo están habilitadas para el administrador u otros roles con privilegios específicos.<br /> <br />
                Esta organización garantiza que cada usuario tenga acceso únicamente a las funciones que le corresponden, manteniendo así la seguridad y el control dentro del sistema.</p>
            </div>


            <div className='sena-content-section1'>
              <p className='prueba-p'>Al hacer clic en la opción Diagnóstico Empresarial de la barra de navegación, el sistema lo redirigirá al Directorio de Programas de Formación. <br /> <br />
              En este módulo, el administrador podrá realizar las siguientes acciones: <br /> <br />
              1. Crear/Diligenciar  nuevos Diagnósticos Empresariales. <br /> <br />
              2. Visualizar la información detallada de cada Diagnóstico Empresarial. <br /> <br />
              3. Modificar los datos registrados. <br /> <br />
              4. Inactivar Diagnóstico Empresarial  cuando sea necesario. <br /> <br />
              5. Generar reportes del Diagnóstico Empresarial  en formatos Excel y PDF. <br /> <br />
              En el caso del usuario empresa, podrá realizar las opciones: 1, 2 y 5</p><img src={Imagenmanual30} alt="Acceso denegado"  className='Prueba-imagen1'/>
            </div>
            <div className='sena-content-section'>
               <img src={Imagenmanual31} alt="Acceso denegado"  className='Prueba-imagen3'/>
                <p className='prueba4'>Para realizar el Diagnóstico Empresarial, el usuario debe diligenciar un formulario compuesto por campos de selección (no de opinión libre). <br /> <br />
                De acuerdo con las opciones seleccionadas en cada campo, el sistema generará automáticamente: <br /> <br />
                Una gráfica con los resultados del diagnóstico. <br /> <br />
                Un listado de programas de formación que más se asemejan a las necesidades de la empresa. <br /> <br />
                De esta forma, las empresas pueden identificar qué programas de formación y qué aprendices se ajustan mejor a sus requerimientos, basándose en la información diligenciada en el formulario. <br /> <br />
                Es importante recalcar que se deben diligenciar todos los formularios para que este funcione correctamente</p>
            </div>

            <div className='sena-content-section1'>
              <p className='prueba3'>Al diligenciar el Diagnóstico Empresarial, el sistema mostrará una alerta de confirmación que le indicará si el proceso fue exitoso. <br /> <br />
              Para que el diagnóstico se complete correctamente, es indispensable que todas las opciones del formulario sean seleccionadas con la respuesta de su elección. Solo de esta manera el sistema podrá generar la gráfica y el listado de programas de formación correspondientes.</p><img src={Imagenmanual32} alt="Acceso denegado"  className='Prueba-imagen1'/>
            </div>
            <div className='sena-content-section'>
               <img src={Imagenmanual33} alt="Acceso denegado"  className='Prueba-imagen3'/>
                <p className='prueba1'>Después de confirmar la alerta con la opción “Ver resultados”, el sistema mostrará dos elementos principales: <br /> <br />
                1. Gráfica de compatibilidad: representa de manera visual el nivel de coincidencia entre las respuestas diligenciadas en el formulario y los programas de formación disponibles</p>
            </div>


            <div className='sena-content-section1'>
              <p className='prueba-p'>2. Listado de programas de formación: muestra los programas ofrecidos por el SENA CDITI, organizados según el nivel de compatibilidad con la información ingresada en el diagnóstico. <br /> <br />
              De esta forma, el usuario puede interpretar fácilmente los resultados y tomar decisiones informadas sobre los programas de formación más adecuados.</p><img src={Imagenmanual34} alt="Acceso denegado"  className='Prueba-imagen1'/>
            </div>
            <div className='sena-content-section'>
               <img src={Imagenmanual35} alt="Acceso denegado"  className='Prueba-imagen3'/>
                <p className='prueba4'>Al seleccionar en la barra de navegación el módulo Perfil, el usuario podrá visualizar su propia información registrada en el sistema.</p>
            </div>


            <div className='sena-content-section1'>
              <p className='prueba3'>En esta sección se encuentra la interfaz de visualización del perfil de usuario, donde cada persona podrá consultar sus datos personales registrados en el sistema. Además, se ofrece la posibilidad de actualizar cierta información, únicamente en aquellos campos que el sistema tiene autorizados para su edición, garantizando así la seguridad y confiabilidad de la información.</p><img src={Imagenmanual36} alt="Acceso denegado"  className='Prueba-imagen1'/>
            </div>
            <div className='sena-content-section'>
               <img src={Imagenmanual37} alt="Acceso denegado"  className='Prueba-imagen3'/>
                <p className='prueba4'>Al momento de cerrar la sesión, el sistema mostrará una ventana emergente de confirmación, la cual notificará al usuario que su sesión ha finalizado de manera exitosa. Posteriormente, será redirigido automáticamente a la pantalla inicial del login, donde podrá ingresar nuevamente sus credenciales en caso de que desee acceder otra vez..</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManualUser;
