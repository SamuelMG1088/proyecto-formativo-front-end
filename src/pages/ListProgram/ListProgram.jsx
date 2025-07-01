import React, { useState, useEffect } from 'react';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import BannerHome3 from '../../assets/images/BannerHome3.png';
import BannerHome4 from '../../assets/images/BannerHome4.png';
import BannerHome5 from '../../assets/images/BannerHome5.png';
import FilterComponent from '../../components/Filter/Filter.jsx';
import { NavLink } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosInformationCircle } from "react-icons/io";
import { Link } from 'react-router-dom';
import './css/listProgram.css';
import { IoIosCreate } from "react-icons/io";
import ExportPdfExcel from '../../components/ExportPdfExcel/ExportPdfExcel.jsx';

const ListProgram = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const images = [BannerHome3, BannerHome4, BannerHome5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  // Filter handlers for programs
  const handleProgramTypeChange = (type) => {
    console.log('Filtrar por tipo de programa:', type);
    // Implement actual filtering logic here
  };

  const handleStatusChange = (status) => {
    console.log('Filtrar por estado:', status);
    // Implement actual filtering logic here
  };

  const handleResetFilters = () => {
    console.log('Filtros reiniciados');
    // Reset filtered data
  };


    
  return (
    <div id="ListProgramPage">
      <div className="PageListProgram">
        <Gov />
        <HeaderIcons />
        <NavBar />
        
        {/* Carrusel */}
        <div className="program-carousel">
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
        
        {/* Main content */} 
        <div className="list-program-content">
            <section className="list-program-section">
                <NavLink to="/home" className="NavLink"><FaArrowLeftLong className='icon-arrow' />Volver al Inicio</NavLink>
                <NavLink to="/CreateProgram" className="CreateProgram">
                <div>
                  <button  className='Create-program'>Crear Programa</button>
                </div>
                </NavLink>
                <h2>Directorio de Programas de Formación</h2>
                <p>Explora y gestiona los programas de formación registrados</p>
                
                <div className='Exports'>
                  <ExportPdfExcel/>
                </div>
                {/* Filter component */}
                <FilterComponent
                  onDocumentTypeChange={handleProgramTypeChange}
                  onStatusChange={handleStatusChange}
                  onResetFilters={handleResetFilters}
                />
                
                {/* Program list table */}
                <div className="program-table-container">
                    <div className="border">
                        <table className="program-table">
                        <thead>
                            <tr>
                            <th>CÓDIGO</th>
                            <th>NOMBRE</th>
                            <th>NIVEL</th>
                            <th>DURACIÓN (MESES)</th>
                            <th>MODALIDAD</th>
                            <th>ESTADO</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>PROG-001</td>
                            <td>Análisis y Desarrollo de Software</td>
                            <td>Técnico</td>
                            <td>24</td>
                            <td>Presencial</td>
                            <td>
                                <span className="status-badge active">Activo</span>
                            </td>
                            <td>
                                <Link to ='/ViewTraining'>
                                <button className="edit-button">
                                    <IoIosInformationCircle />
                                </button>
                                </Link>
                            </td>
                            </tr>
                            <tr>
                            <td>PROG-002</td>
                            <td>Gestión Empresarial</td>
                            <td>Tecnólogo</td>
                            <td>36</td>
                            <td>Virtual</td>
                            <td>
                                <span className="status-badge active">Activo</span>
                            </td>
                            <td>
                                <Link to ='/ViewTraining'>
                                <button className="edit-button">
                                    <IoIosInformationCircle />
                                </button>
                                </Link>
                            </td>
                            </tr>
                            <tr>
                            <td>PROG-003</td>
                            <td>Mecánica Industrial</td>
                            <td>Técnico</td>
                            <td>18</td>
                            <td>Presencial</td>
                            <td>
                                <span className="status-badge active">Activo</span>
                            </td>
                            <td>
                                <Link to ='/ViewTraining'>
                                <button className="edit-button">
                                    <IoIosInformationCircle />
                                </button>
                                </Link>
                            </td>
                            </tr>
                            <tr>
                            <td>PROG-004</td>
                            <td>Diseño Gráfico</td>
                            <td>Tecnólogo</td>
                            <td>30</td>
                            <td>Mixta</td>
                            <td>
                                <span className="status-badge inactive">Inactivo</span>
                            </td>
                            <td>
                                <Link to ='/ViewTraining'>
                                <button className="edit-button">
                                    <IoIosInformationCircle />
                                </button>
                                </Link>
                            </td>
                            </tr>
                            <tr>
                            <td>PROG-005</td>
                            <td>Electricidad Industrial</td>
                            <td>Técnico</td>
                            <td>24</td>
                            <td>Presencial</td>
                            <td>
                                <span className="status-badge active">Activo</span>
                            </td>
                            <td>
                                <Link to ='/ViewTraining'>
                                <button className="edit-button">
                                    <IoIosInformationCircle />
                                </button>
                                </Link>
                            </td>
                            </tr>
                            <tr>
                            <td>PROG-006</td>
                            <td>Contabilidad Financiera</td>
                            <td>Tecnólogo</td>
                            <td>36</td>
                            <td>Virtual</td>
                            <td>
                                <span className="status-badge active">Activo</span>
                            </td>
                            <td>
                                <Link to ='/ViewTraining'>
                                <button className="edit-button">
                                    <IoIosInformationCircle />
                                </button>
                                </Link>
                            </td>
                            </tr>
                            <tr>
                            <td>PROG-007</td>
                            <td>Soldadura</td>
                            <td>Técnico</td>
                            <td>12</td>
                            <td>Presencial</td>
                            <td>
                                <span className="status-badge inactive">Inactivo</span>
                            </td>
                            <td>
                                <Link to ='/ViewTraining'>
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

export default ListProgram;