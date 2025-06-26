import React from 'react' /* Aqui importamos el archivo de estilos - Here we import the file that contains the styles*/ 
import './css/exportPdfExcel.css' /* Importamos la libreria de react - Import react library*/
import '../../styles/variables.css'  /*Importamos el archivo de variables - */ 
import { ImFilePdf } from "react-icons/im";
import { GrDocumentWindows } from "react-icons/gr";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";


export default function ExportPdfExcel () { /* Definimos el Componente - Define the component*/
  return ( /* Renderizamos el contenido del componente - Render the component of the content*/
    <div id='Buttons-exports'>
        <div className="exports">
            <div className="box-exports pdf">
                <MdPictureAsPdf className="logo-pdf"/>
            </div>
            <div className="box-exports">
                <RiFileExcel2Fill className="logo-exel"/>
            </div>
        </div>
    </div>
  )
}



