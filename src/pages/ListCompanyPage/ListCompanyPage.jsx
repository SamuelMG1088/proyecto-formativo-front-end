import React, { useState, useEffect } from 'react';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import BannerHome3 from '../../assets/images/BannerHome3.png';
import BannerHome4 from '../../assets/images/BannerHome4.png';
import BannerHome5 from '../../assets/images/BannerHome5.png';
import FilterComponent from '../../components/Filter/Filter.jsx'; // Importa el componente de filtro
import { NavLink } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosInformationCircle } from "react-icons/io";
import { Link } from 'react-router-dom';
import './css/listCompany.css';
import { IoIosCreate } from "react-icons/io";
import ExportPdfExcel from '../../components/ExportPdfExcel/ExportPdfExcel.jsx';


const ListCompany = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filteredData, setFilteredData] = useState([]); // Estado para los datos filtrados
  const images = [BannerHome3, BannerHome4, BannerHome5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  // Función para manejar cambios en el tipo de documento
  const handleDocumentTypeChange = (type) => {
    console.log('Filtrar por tipo de documento:', type);
    // Aquí implementarías la lógica de filtrado real
    // setFilteredData(data.filter(item => item.tipoDocumento === type));
  };

  // Función para manejar cambios en el estado
  const handleStatusChange = (status) => {
    console.log('Filtrar por estado:', status);
    // Aquí implementarías la lógica de filtrado real
    // setFilteredData(data.filter(item => item.estado === status));
  };

  // Función para resetear los filtros
  const handleResetFilters = () => {
    console.log('Filtros reiniciados');
    // setFilteredData(data); // Restaurar todos los datos
  };

  return (
    <div id="ListCompanyPage">
      <div className="PageListCompany">
        <Gov />
        <HeaderIcons />
        <NavBar />
        
        {/* Carrusel */}
        <div className="company-carousel">
          <div className="carousel-container">
            {images.map((image, index) => (
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
        
        {/* Contenido principal */} 
        <div className="list-company-content">
            <section className="list-company-section">
                <NavLink to="/home" className="NavLink"><FaArrowLeftLong className='icon-arrow' />Volver al Inicio</NavLink>
                <NavLink to="/CreateCompanyPage" className="CreateUse">
                <div>
                  <button className='button-create'>Crear Usuario</button>
                </div>
                </NavLink>

                <h2>Directorio de Usuarios</h2>
                <p>Explora y descubre usuarios registrados</p>
                <div className='Export'>
                  <ExportPdfExcel/>
                </div>
                
                {/* Componente de Filtro integrado aquí */}
                <FilterComponent
                onDocumentTypeChange={handleDocumentTypeChange}
                onStatusChange={handleStatusChange}
                onResetFilters={handleResetFilters}
                />
                
                {/* Aquí iría la lista de empresas filtradas */}
                <div className="company-list">
                {/* {filteredData.map(company => (
                    <CompanyCard key={company.id} company={company} />
                ))} */}
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
                                <Link to ='/viewCompany'>
                                <button className="edit-button">
                                    <IoIosInformationCircle />
                                </button>
                                </Link>
                            </td>
                            </tr>
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
                                <Link to ='/viewCompany'>
                                <button className="edit-button">
                                    <IoIosInformationCircle />
                                </button>
                                </Link>
                            </td>
                            </tr>
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
                                <Link to ='/viewCompany'>
                                <button className="edit-button">
                                    <IoIosInformationCircle />
                                </button>
                                </Link>
                            </td>
                            </tr>
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
                                <Link to ='/viewCompany'>
                                <button className="edit-button">
                                    <IoIosInformationCircle />
                                </button>
                                </Link>
                            </td>
                            </tr>
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
                                <Link to ='/viewCompany'>
                                <button className="edit-button">
                                    <IoIosInformationCircle />
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
                            <Link to ='/viewCompany'>
                                <button className="edit-button">
                                <IoIosInformationCircle />
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
                                <Link to ='/viewCompany'>
                                <button className="edit-button">
                                <IoIosInformationCircle />
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
                                <Link to ='/EditCompany'>
                                  <button className="edit-button">
                                <IoIosInformationCircle />
                                </button>
                            </Link>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
      </div>
    </div>
  );
}

export default ListCompany;