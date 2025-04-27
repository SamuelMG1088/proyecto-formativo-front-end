import React from 'react' /* Aqui importamos el archivo de estilos - Here we import the file that contains the styles*/ 
import './css/buttonView.css' /* Importamos la libreria de react - Import react library*/
import '../../../styles/variables.css'  /*Importamos el archivo de variables - */ 
export default function ButtonView () { /* Definimos el Componente - Define the component*/
  return ( /* Renderizamos el contenido del componente - Render the component of the content*/
    <div>
        <button className='View'>Ver</button>
    </div>
  )
}