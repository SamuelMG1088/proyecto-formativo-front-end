import React from 'react' /* Aqui importamos el archivo de estilos - Here we import the file that contains the styles*/ 
import './css/editDelete.css' /* Importamos la libreria de react - Import react library*/
import '../../styles/variables.css'  /*Importamos el archivo de variables - */ 
import { FaRegEdit } from 'react-icons/fa';
import { IoTrashOutline } from 'react-icons/io5';

export default function EditDelete () { /* Definimos el Componente - Define the component*/
  return ( /* Renderizamos el contenido del componente - Render the component of the content*/
    <div id='EditDelete'>
        <div className="action-card">
              <button className="icon-button edit-button">
                <FaRegEdit />
              </button>
              <button className="icon-button delete-button">
                <IoTrashOutline />
              </button>
            </div>
    </div>
  )
}



