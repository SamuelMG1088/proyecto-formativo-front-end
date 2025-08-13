import './css/buttonConfirm.css' /* Aqui importamos el archivo de estilos - Here we import the file that contains the styles*/ 
import React from 'react' /* Importamos la libreria de react - Import react library*/
import '../../../styles/variables.css'  /*Importamos el archivo de variables - */ 
import { useTranslation } from 'react-i18next';

export default function ButtonConfirm () { /* Definimos el Componente - Define the component*/
  const { t } = useTranslation(); /* Usamos la funcion de traduccion - Use the translation*/
     return (
    <div>
        <button className='Confirm'>{t('buttons.confirm')}</button>
    </div>
     );
}