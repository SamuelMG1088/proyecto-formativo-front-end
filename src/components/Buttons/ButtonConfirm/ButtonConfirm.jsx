import './css/buttonConfirm.css' /* Aqui importamos el archivo de estilos - Here we import the file that contains the styles*/ 
import React from 'react' /* Importamos la libreria de react - Import react library*/
import '../../../styles/variables.css'  /*Importamos el archivo de variables - */ 

export default function ButtonConfirm () { /* Definimos el Componente - Define the component*/
  return ( /* Renderizamos el contenido del componente - Render the component of the content*/
    <div>
        <button className='Confirm'>Confirmar</button>
    </div>
  )
}