import { useState } from "react"
import { FaRegEdit } from "react-icons/fa"
import { Link } from "react-router-dom"
import { FiFilter } from "react-icons/fi"
import { IoIosArrowForward } from "react-icons/io"
import { IoRefreshOutline } from "react-icons/io5"
import ButtonsExports from "../../components/ExportPdfExcel/ExportPdfExcel.jsx"
import ButtonAdd from "../../components/Buttons/ButtonAdd/ButtonAdd.jsx"
import ButtonViewInactive from "../../components/Buttons/ButtonViewInactive/ButtonViewInactive.jsx"
import Navigation, { NavigationProvider, useNavigation } from '../../layout/SideBar/SideBar.jsx';
import "./css/listProgramaFormacion.css"

export default function ListarProgramaFormacion() {
return (
    <>
      <div id="ListarProgramaFormacion">
            <NavigationProvider>
                <Navigation/>
            </NavigationProvider>
        
          <div className="container-principal">
            <div className="titles-container">
              <h2>Programas de formacion</h2>      
              <div className="exports">
                <ButtonsExports />
              </div>
              <Link to='/listarInactivas'>
              <div className="button__view">
                <ButtonViewInactive />
              </div>
              </Link>
              <Link to='/createCompany'>
              <div className="button--Add">
                <ButtonAdd />
              </div>
              </Link>
            </div>

            <div className="programas-table-container">
              <div className="border">
                <table className="programas-table">
                  <thead>
                    <tr>
                      <th>FICHA</th>
                      <th>NOMBRE DEL PROGRAMA</th>
                      <th>PERFIL OCUPACIONAL</th>
                      <th>VERSION</th>
                      <th>NIVEL DE FORMACION</th>
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
                        <Link to ='/editCompany'>
                          <button className="edit-button">
                            <FaRegEdit />
                          </button>
                        </Link>
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
                      <Link to ='/editCompany'>
                        <button className="edit-button">
                          <FaRegEdit />
                        </button>
                      </Link>
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
                        <Link to ='/editCompany'>
                        <button className="edit-button">
                          <FaRegEdit />
                        </button>
                      </Link>
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
                        <Link to ='/editCompany'>
                        <button className="edit-button">
                          <FaRegEdit/>
                        </button>
                      </Link>
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
                        <Link to ='/editCompany'>
                        <button className="edit-button">
                          <FaRegEdit/>
                        </button>
                      </Link>
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
                        <Link to ='/editCompany'>
                        <button className="edit-button">
                          <FaRegEdit/>
                        </button>
                      </Link>
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
                        <Link to ='/editCompany'>
                        <button className="edit-button">
                          <FaRegEdit/>
                        </button>
                      </Link>
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
                        <Link to ='/editCompany'>
                        <button className="edit-button">
                          <FaRegEdit/>
                        </button>
                      </Link>
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
                        <Link to ='/editCompany'>
                        <button className="edit-button">
                          <FaRegEdit/>
                        </button>
                      </Link>
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
