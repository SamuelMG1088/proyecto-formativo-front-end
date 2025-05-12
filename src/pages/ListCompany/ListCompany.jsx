import { useState } from "react"
import "./css/listCompany.css"
import { FaRegEdit } from "react-icons/fa"
import ButtonViewInactive from "../../components/Buttons/ButtonViewInactive/ButtonViewInactive.jsx"
import ButtonAdd from "../../components/Buttons/ButtonAdd/ButtonAdd.jsx"
import ButtonsExports from "../../components/ExportPdfExcel/ExportPdfExcel.jsx"
import { FiFilter } from "react-icons/fi"
import { IoIosArrowForward } from "react-icons/io"
import { IoRefreshOutline } from "react-icons/io5"
import Navigation, { NavigationProvider, useNavigation } from '../../layout/SideBar/SideBar.jsx';
import { Link } from "react-router-dom"

export default function Visualizar_empresa() {
  const [showTipoDocumento, setShowTipoDocumento] = useState(false) //|Para determinar que la ventana del filtro este abierta
  const [showEstado, setShowEstado] = useState(false)
  const [selectedDocumento, setSelectedTipoDocumento] = useState("") //|Para almacenar el valor de la opcion seleccionada
  const [selectedEstado, setSelectedStatus] = useState("")

  const toggleTipoDocumento = () => { //Alternamos lo que va a mostrar
    setShowTipoDocumento(!showTipoDocumento)
    setShowEstado(false)
  }

  const toggleEstado = () => {
    setShowEstado(!showEstado)
    setShowTipoDocumento(false)
  }

  const handleTipoDocumento = (type) => { //Cambia por el seleccionado y luego cierra el filtro  TipoDocumento Estado
    setSelectedTipoDocumento(type)
    setShowTipoDocumento(false)
  }

  const handleStatusSelect = (status) => {
    setSelectedStatus(status)
    setShowEstado(false)
  }

  const resetFilters = () => { // Este limpia los valores seleccionados
    setSelectedTipoDocumento("")
    setSelectedStatus("")
  }

  return (
    <>
      <div id="ListarEmpresa">
            <NavigationProvider>
                <Navigation/>
            </NavigationProvider>
        
          
          <div className="container-principal">
            <div className="titles-container">
              <h2>Empresas</h2>      
              <div className="exports">
                <ButtonsExports />
              </div>
              <div className="button__view">
                <ButtonViewInactive />
              </div>
              <Link to='/createCompany'>
              <div className="button--Add">
                <ButtonAdd />
              </div>
              </Link>
            </div>

            {/* Filtro */}
            <div className="filter-container">
              <div className="filter-bar">
                <div className="filter-item filter-by">
                  <FiFilter />
                  <span>Filter By</span>
                </div>
                <div className="filter-item document-type" onClick={toggleTipoDocumento}>
                  <span>Tipo de documento</span>
                  <IoIosArrowForward />
                </div>
                <div className="filter-item status" onClick={toggleEstado}>
                  <span>Estado</span>
                  <IoIosArrowForward />
                </div>
                <div className="filter-item reset" onClick={resetFilters}>
                  <IoRefreshOutline className="refresh-icon" />
                  <span className="reset-text">Reset Filter</span>
                </div>
              </div>

              {/* Filtro de Tipo de Documento */}
              {showTipoDocumento && (  //Hacemos el renderizado condicional para que muestre segun el estado
                <div className="filter-dropdown document-type-dropdown">
                  <h3>Seleccione la razón social</h3>
                  <div className="filter-options">
                    <button
                      className={`filter-option ${selectedDocumento === "C.C" ? "selected" : ""}`} //Ponen el color verde a la opcion selecciona
                      onClick={() => handleTipoDocumento("C.C")}
                    >
                      C.C
                    </button>
                    <button
                      className={`filter-option ${selectedDocumento === "NIT" ? "selected" : ""}`}
                      onClick={() => handleTipoDocumento("NIT")}
                    >
                      NIT
                    </button>
                    <button
                      className={`filter-option ${selectedDocumento === "C.E" ? "selected" : ""}`}
                      onClick={() => handleTipoDocumento("C.E")}
                    >
                      C.E
                    </button>
                  </div>
                  <button className="select-button" onClick={() => setShowTipoDocumento(false)}>
                    Seleccionar
                  </button>
                </div>
              )}

              {/* Filtro de Estado */}
              {showEstado && (
                <div className="filter-dropdown status-dropdown">
                  <h3>Estado de empresa</h3>
                  <div className="filter-options">
                    <button
                      className={`filter-option ${selectedEstado === "Health & Medicine" ? "selected" : ""}`}
                      onClick={() => handleStatusSelect("Health & Medicine")}
                    >
                      Activo
                    </button>
                    <button
                      className={`filter-option ${selectedEstado === "Inactivo" ? "selected" : ""}`}
                      onClick={() => handleStatusSelect("Inactivo")}
                    >
                      Inactivo
                    </button>
                  </div>
                  <button className="select-button" onClick={() => setShowEstado(false)}>
                    Seleccionar
                  </button>
                </div>
              )}
            </div>

            <div className="empresa-table-container">
              <div className="border">
                <table className="empresa-table">
                  <thead>
                    <tr>
                      <th>NUMERO DE DOCUMENTO</th>
                      <th>NOMBRE</th>
                      <th>CORREO</th>
                      <th>ACTIVIDAD</th>
                      <th>RAZÓN SOCIAL</th>
                      <th>ESTADO</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>00001</td>
                      <td>Christine Brooks</td>
                      <td>089 Kutch Green Apt. 448</td>
                      <td>04 Sep 2019</td>
                      <td>Electric</td>
                      <td>
                        <span className="status-badge active">Activo</span>
                      </td>
                      <td>
                        <button className="edit-button">
                          <FaRegEdit />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>00002</td>
                      <td>Rosie Pearson</td>
                      <td>979 Immanuel Ferry Suite 526</td>
                      <td>28 May 2019</td>
                      <td>Book</td>
                      <td>
                        <span className="status-badge active">Activo</span>
                      </td>
                      <td>
                        <button className="edit-button">
                          <FaRegEdit />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>00003</td>
                      <td>Darrell Caldwell</td>
                      <td>8587 Frida Ports</td>
                      <td>23 Nov 2019</td>
                      <td>Medicine</td>
                      <td>
                        <span className="status-badge active">Activo</span>
                      </td>
                      <td>
                        <button className="edit-button">
                          <FaRegEdit />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>00004</td>
                      <td>Gilbert Johnston</td>
                      <td>768 Destiny Lake Suite 600</td>
                      <td>05 Feb 2019</td>
                      <td>Mobile</td>
                      <td>
                        <span className="status-badge active">Activo</span>
                      </td>
                      <td>
                        <button className="edit-button">
                          <FaRegEdit />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
      </div>
    </>
  )
}
