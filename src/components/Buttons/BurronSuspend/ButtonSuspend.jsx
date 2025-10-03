import './css/buttonSuspender.css' /* Aqui importamos el archivo de estilos - Here we import the file that contains the styles*/ 
import React from 'react' /* Importamos la libreria de react - Import react library*/
import '../../../styles/variables.css'  /*Importamos el archivo de variables - */ 
import { useTranslation } from 'react-i18next';


export default function ButtonSuspend () { /* Definimos el Componente - Define the component*/
  const { t } = useTranslation();
  return ( /* Renderizamos el contenido del componente - Render the component of the content*/
    <div>
        <button className='Suspend'>{t('buttons.suspend')}</button>
    </div>
  )
}