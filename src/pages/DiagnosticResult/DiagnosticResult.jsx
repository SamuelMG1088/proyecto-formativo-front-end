import React, { useState, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import './css/diagnosticResult.css';
import { Link, useLocation } from 'react-router-dom';
import { FaChartBar } from 'react-icons/fa';
import { FaRegEdit } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import FilterComponent from '../../components/Filter/Filter.jsx';
import BannerHome3 from '../../assets/banners/BannerHome3.png';
import BannerHome4 from '../../assets/banners/BannerHome4.png';
import BannerHome5 from '../../assets/banners/BannerHome11.png';
import ExportPdfExcel from '../../components/ExportPdfExcel/ExportPdfExcel.jsx';
import axios from 'axios';

const DiagnosticResult = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [diagnostico, setDiagnostico] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const images = [BannerHome3, BannerHome4, BannerHome5];
  const location = useLocation();

  const calcularResultadosGrafica = (respuestas) => {
    return {
      Ciberseguridad: respuestas.interes_ciberseguridad ? 100 : 0,
      "Materiales Eco": respuestas.materiales_biodegradables ? 100 : 0,
      "Software Diseño": respuestas.software_diseno ? 100 : 0,
      "Operación Maquinaria": respuestas.operacion_maquinaria ? 100 : 0,
      "Herramientas Especializadas": respuestas.herramientas_especializadas ? 100 : 0,
      "Seguridad en Altura": 
        respuestas.normas_seguridad_altura === "Siempre" ? 100 :
        respuestas.normas_seguridad_altura === "Algunas veces" ? 50 : 0
    };
  };

  useEffect(() => {
    if (diagnostico && diagnostico.respuestas) {
      const resultados = calcularResultadosGrafica(diagnostico.respuestas);
      
      const ctx = document.getElementById('diagnosticoChart');
      if (ctx) {
        const chartInstance = Chart.getChart(ctx);
        if (chartInstance) {
          chartInstance.destroy();
        }
        
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: Object.keys(resultados),
            datasets: [{
              label: 'Puntuación (%)',
              data: Object.values(resultados),
              backgroundColor: [
                '#39a900',
                
              ],
              borderColor: [
                '#39a900',
                
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                  stepSize: 25
                }
              }
            },
            plugins: {
              legend: {
                display: false
              }
            }
          }
        });
      }
    }
  }, [diagnostico]);

  useEffect(() => {
    const fetchDiagnostico = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('authToken') || localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No hay token de autenticación');
        }

        let diagnosticoId = location.state?.diagnostico?.id || localStorage.getItem('lastDiagnosisId');
        
        if (!diagnosticoId) {
          throw new Error('No se encontró ID de diagnóstico');
        }

        const response = await axios.get(
          `http://localhost:3000/api/diagnosticos/${diagnosticoId}`,
          {
            headers: {
              'Authorization': `Bearer ${token.replace('Bearer ', '')}`
            }
          }
        );

        if (response.data.success) {
          setDiagnostico(response.data.data.diagnostico);
        } else {
          throw new Error(response.data.message || 'Error al obtener diagnóstico');
        }
      } catch (error) {
        console.error('Error al obtener diagnóstico:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDiagnostico();
  }, [location.state]);

  // Carrusel de imágenes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleDocumentTypeChange = (type) => {
    console.log('Filtrar por tipo de documento:', type);
  };

  const handleStatusChange = (status) => {
    console.log('Filtrar por estado:', status);
  };

  const handleResetFilters = () => {
    console.log('Filtros reiniciados');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando resultados del diagnóstico...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error al cargar el diagnóstico</h2>
        <p>{error}</p>
        <NavLink to="/home" className="NavLink">
          <FaArrowLeftLong className='icon-arrow' /> Volver al Inicio
        </NavLink>
      </div>
    );
  }

  return (
    <div id="DiagnosisResult">
      <div className="PageresultDiagnosis">
        <Gov />
        <HeaderIcons />
        <NavBar />

        {/* Carrusel */}
        <div className="diagnosis-carousel">
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
          
        <section className='info-result-section'>
          <div className='content-result-section'>
            <NavLink to="/home" className="NavLink">
              <FaArrowLeftLong className='icon-arrow' />Volver al Inicio
            </NavLink>
            <div className="chart-header">
              <div className='Export-pdf-excel'>
                {diagnostico && <ExportPdfExcel data={diagnostico} />}
              </div>

              <div className='Sub-title'>
                <FaChartBar className="chart-icon" />
                <h2>Resultado del diagnóstico</h2>
                <p>Este es el resultado del diagnóstico que realizó</p>
              </div>
              
              <div className="chart-container">
                <canvas id="diagnosticoChart"></canvas>
              </div>
              
              {!diagnostico && !loading && !error && (
                <div className="no-data-message">No hay datos de diagnóstico disponibles</div>
              )}
            </div>
          </div>
        </section>

        <div className="list-company-content">
          <section className="list-company-section">
            <FilterComponent
              onDocumentTypeChange={handleDocumentTypeChange}
              onStatusChange={handleStatusChange}
              onResetFilters={handleResetFilters}
            />
            
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
                        <Link to='/viewcompany'>
                          <button className="edit-button">
                            <FaRegEdit />
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
};

export default DiagnosticResult;