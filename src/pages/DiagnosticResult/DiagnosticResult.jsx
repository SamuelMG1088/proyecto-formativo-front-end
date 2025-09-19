// DiagnosticResult.jsx

import React, { useState, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import './css/diagnosticResult.css';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { FaChartBar } from 'react-icons/fa';
import { FaRegEdit } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import FilterComponent from '../../components/Filter/Filter.jsx';
import BannerHome3 from '../../assets/banners/BannerHome3.png';
import BannerHome4 from '../../assets/banners/BannerHome4.png';
import BannerHome5 from '../../assets/banners/BannerHome11.png';
import ExportPdfExcel from '../../components/ExportPdfExcel/ExportPdfExcel.jsx';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const DiagnosticResult = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [diagnostico, setDiagnostico] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const images = [BannerHome3, BannerHome4, BannerHome5];
  const location = useLocation();

  const calcularResultadosGrafica = (respuestas) => {
    return {
      [t('diagnosisResult.cybersecurity')]: respuestas.interes_ciberseguridad ? 100 : 0,
      [t('diagnosisResult.ecoMaterials')]: respuestas.materiales_biodegradables ? 100 : 0,
      [t('diagnosisResult.designSoftware')]: respuestas.software_diseno ? 100 : 0,
      [t('diagnosisResult.machineryOperation')]: respuestas.operacion_maquinaria ? 100 : 0,
      [t('diagnosisResult.specializedTools')]: respuestas.herramientas_especializadas ? 100 : 0,
      [t('diagnosisResult.heightSafety')]: 
        respuestas.normas_seguridad_altura === t('general.always') ? 100 :
        respuestas.normas_seguridad_altura === t('general.sometimes') ? 50 : 0
    };
  };

  useEffect(() => {
    if (diagnostico && diagnostico.respuestas) {
      const resultados = calcularResultadosGrafica(diagnostico.respuestas);
      
      const ctx = document.getElementById('diagnosticoChart');
      if (ctx) {
        const chartInstance = Chart.getChart(ctx);
        if (chartInstance) chartInstance.destroy();
        
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: Object.keys(resultados),
            datasets: [{
              label: t('diagnosisResult.scorePercentage'),
              data: Object.values(resultados),
              backgroundColor: ['#39a900'],
              borderColor: ['#39a900'],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                ticks: { stepSize: 25 }
              }
            },
            plugins: { legend: { display: false } }
          }
        });
      }
    }
  }, [diagnostico, t]);

  useEffect(() => {
    const fetchDiagnostico = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('authToken') || localStorage.getItem('token');
        if (!token) throw new Error(t('diagnosisResult.noAuthToken'));

        let diagnosticoId = location.state?.diagnostico?.id || localStorage.getItem('lastDiagnosisId');
        if (!diagnosticoId) throw new Error(t('diagnosisResult.noDiagnosisId'));

        const response = await axios.get(
          `http://localhost:3000/api/diagnosticos/${diagnosticoId}`,
          { headers: { 'Authorization': `Bearer ${token.replace('Bearer ', '')}` } }
        );

        if (response.data.success) {
          setDiagnostico(response.data.data.diagnostico);
        } else {
          throw new Error(response.data.message || t('diagnosisResult.diagnosisFetchError'));
        }
      } catch (error) {
        console.error(t('diagnosisResult.diagnosisFetchError'), error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDiagnostico();
  }, [location.state, t]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleDocumentTypeChange = (type) => console.log(t('diagnosisResult.filterByDocType'), type);
  const handleStatusChange = (status) => console.log(t('diagnosisResult.filterByStatus'), status);
  const handleResetFilters = () => console.log(t('diagnosisResult.filtersReset'));

  // 🔹 Datos de ejemplo para la tabla de empresas
  const empresas = [
    {
      documento: "00001",
      nombre: "Christine Brooks",
      correo: "089 Kutch Green Apt. 448",
      fecha: "04 Sep 2019",
      actividad: "Electric",
      estado: t('general.active')
    }
  ];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>{t('diagnosisResult.loadingResults')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>{t('diagnosisResult.loadError')}</h2>
        <p>{error}</p>
        <NavLink to="/home" className="NavLink">
          <FaArrowLeftLong className='icon-arrow' /> {t('general.backToHome')}
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
              <FaArrowLeftLong className='icon-arrow' />{t('general.backToHome')}
            </NavLink>
            <div className="chart-header">
              
              {/* 🔹 Exportar diagnóstico con gráfico */}
              <div className='Export-pdf-excel'>
                {diagnostico && (
                  <ExportPdfExcel
                    data={[diagnostico]}
                    fileName="diagnostico"
                    columns={{
                      id: "ID",
                      nombre: "Nombre",
                      correo: "Correo",
                      actividad: "Actividad",
                      empresa: "Empresa",
                      estado: "Estado"
                    }}
                    chartId="diagnosticoChart"  // ✅ Exporta gráfico al PDF
                  />
                )}
              </div>

              <div className='Sub-title'>
                <FaChartBar className="chart-icon" />
                <h2>{t('diagnosisResult.resultTitle')}</h2>
                <p>{t('diagnosisResult.resultDescription')}</p>
              </div>
              
              <div className="chart-container">
                <canvas id="diagnosticoChart"></canvas>
              </div>
              
              {!diagnostico && !loading && !error && (
                <div className="no-data-message">{t('diagnosisResult.noData')}</div>
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
                
                {/* 🔹 Exportar tabla de empresas */}
                {/* <div className='Export-pdf-excel'>
                  <ExportPdfExcel
                    data={empresas}
                    fileName="empresas"
                    columns={{
                      documento: "N° Documento",
                      nombre: "Nombre",
                      correo: "Correo",
                      fecha: "Fecha",
                      actividad: "Actividad",
                      estado: "Estado"
                    }}
                  />
                </div> */}

                <table className="empresa-table">
                  <thead>
                    <tr>
                      <th>{t('diagnosisResult.docNumber')}</th>
                      <th>{t('diagnosisResult.name')}</th>
                      <th>{t('diagnosisResult.email')}</th>
                      <th>{t('diagnosisResult.activity')}</th>
                      <th>{t('diagnosisResult.businessName')}</th>
                      <th>{t('diagnosisResult.status')}</th>
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
                        <span className="status-badge active">{t('general.active')}</span>
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
