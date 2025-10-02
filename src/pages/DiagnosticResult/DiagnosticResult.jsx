import React, { useState, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import NavBar from '../../layout/NavBar/NavBar.jsx';
import './css/diagnosticResult.css';
import '../../styles/variables.css'
import { Link, useLocation, NavLink } from 'react-router-dom';
import { FaChartBar, FaGraduationCap } from 'react-icons/fa';
import { FaRegEdit } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosInformationCircle } from "react-icons/io";
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
  const [programasRecomendados, setProgramasRecomendados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPrograms, setShowPrograms] = useState(false);
  const images = [BannerHome3, BannerHome4, BannerHome5];
  const location = useLocation();

  // Función mejorada para mapear áreas del diagnóstico a programas
  const mapearAreasAProgramas = (respuestas) => {
    if (!respuestas) return [];
    
    const areasNecesarias = [];
    
    // Mapeo más robusto de respuestas a áreas
    const mapeoAreas = {
      interes_ciberseguridad: ['Ciberseguridad', 'Seguridad Informática', 'Tecnología'],
      materiales_biodegradables: ['Sostenibilidad', 'Medio Ambiente', 'Ecología'],
      software_diseno: ['Diseño', 'Software', 'Tecnología', 'Digital'],
      operacion_maquinaria: ['Operación', 'Maquinaria', 'Industrial', 'Técnica'],
      herramientas_especializadas: ['Herramientas', 'Técnica', 'Especializada'],
      normas_seguridad_altura: ['Seguridad', 'Industrial', 'Prevención']
    };
    
    Object.keys(mapeoAreas).forEach(key => {
      if (respuestas[key]) {
        if (key === 'normas_seguridad_altura') {
          // Para seguridad en alturas, evaluar el valor
          if (respuestas[key] === 'Siempre' || respuestas[key] === 'Always' || 
              respuestas[key] === 'A veces' || respuestas[key] === 'Sometimes') {
            areasNecesarias.push(...mapeoAreas[key]);
          }
        } else if (respuestas[key] === true || respuestas[key] === 'Sí' || respuestas[key] === 'Yes') {
          areasNecesarias.push(...mapeoAreas[key]);
        }
      }
    });
    
    // Eliminar duplicados
    return [...new Set(areasNecesarias)];
  };

  // Función mejorada para buscar programas recomendados
  const buscarProgramasRecomendados = async (areasNecesarias) => {
    try {
      console.log('Buscando programas para áreas:', areasNecesarias);
      
      if (areasNecesarias.length === 0) {
        setProgramasRecomendados([]);
        return;
      }

      const res = await axios.get('http://localhost:3000/api/programas', {
        timeout: 10000 // 10 segundos timeout
      });
      
      const todosProgramas = res.data.programa || [];
      console.log('Total de programas disponibles:', todosProgramas.length);

      // Filtrar programas que coincidan con las áreas necesarias
      const programasFiltrados = todosProgramas.filter(programa => {
        if (!programa) return false;
        
        const nombrePrograma = (programa.nombre || '').toLowerCase();
        const areaPrograma = (programa.area_vinculada || '').toLowerCase();
        const nivelPrograma = (programa.nivel || '').toLowerCase();
        
        // Buscar coincidencias en nombre, área o nivel
        return areasNecesarias.some(area => {
          const areaLower = area.toLowerCase();
          return nombrePrograma.includes(areaLower) ||
                 areaPrograma.includes(areaLower) ||
                 nivelPrograma.includes(areaLower);
        });
      });
      
      console.log('Programas recomendados encontrados:', programasFiltrados.length);
      setProgramasRecomendados(programasFiltrados);
      
    } catch (err) {
      console.error('Error al cargar programas recomendados:', err);
      // Si hay error, mostrar programas de ejemplo
      setProgramasRecomendados(getProgramasEjemplo(areasNecesarias));
    }
  };

  // Función de respaldo con programas de ejemplo
  const getProgramasEjemplo = (areasNecesarias) => {
    const programasEjemplo = [
      {
        id: 1,
        nombre: "Curso de Ciberseguridad Básica",
        nivel: "Básico",
        duracion: "40 horas",
        area_vinculada: "Tecnología",
        estado: "Activo"
      },
      {
        id: 2,
        nombre: "Manejo Seguro de Maquinaria Industrial",
        nivel: "Intermedio", 
        duracion: "60 horas",
        area_vinculada: "Industrial",
        estado: "Activo"
      },
      {
        id: 3,
        nombre: "Diseño con Software Especializado",
        nivel: "Avanzado",
        duracion: "80 horas",
        area_vinculada: "Diseño",
        estado: "Activo"
      }
    ];
    
    return programasEjemplo.filter(programa => 
      areasNecesarias.some(area => 
        programa.nombre.toLowerCase().includes(area.toLowerCase()) ||
        programa.area_vinculada.toLowerCase().includes(area.toLowerCase())
      )
    );
  };

  const calcularResultadosGrafica = (respuestas) => {
    if (!respuestas) return {};
    
    return {
      [t('diagnosisResult.cybersecurity', 'Ciberseguridad')]: respuestas.interes_ciberseguridad ? 100 : 0,
      [t('diagnosisResult.ecoMaterials', 'Materiales Ecológicos')]: respuestas.materiales_biodegradables ? 100 : 0,
      [t('diagnosisResult.designSoftware', 'Software de Diseño')]: respuestas.software_diseno ? 100 : 0,
      [t('diagnosisResult.machineryOperation', 'Operación de Maquinaria')]: respuestas.operacion_maquinaria ? 100 : 0,
      [t('diagnosisResult.specializedTools', 'Herramientas Especializadas')]: respuestas.herramientas_especializadas ? 100 : 0,
      [t('diagnosisResult.heightSafety', 'Seguridad en Alturas')]: 
        respuestas.normas_seguridad_altura === t('general.always', 'Siempre') ? 100 :
        respuestas.normas_seguridad_altura === t('general.sometimes', 'A veces') ? 50 : 0
    };
  };

  useEffect(() => {
    if (diagnostico && diagnostico.respuestas) {
      const resultados = calcularResultadosGrafica(diagnostico.respuestas);
      
      const ctx = document.getElementById('diagnosticoChart');
      if (ctx) {
        const chartInstance = Chart.getChart(ctx);
        if (chartInstance) chartInstance.destroy();
        
        if (Object.keys(resultados).length > 0) {
          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: Object.keys(resultados),
              datasets: [{
                label: t('diagnosisResult.scorePercentage', 'Porcentaje de Puntuación'),
                data: Object.values(resultados),
                backgroundColor: ['#39a900'],
                borderColor: ['#39a900'],
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              scales: {
                x: {
                  ticks: {
                    color: '#948e8eff', // 🔴 labels eje X en rojo
                    font: {
                      size: 14,
                      weight: 'bold'
                    }
                  }
                },
                y: {
                  beginAtZero: true,
                  max: 100,
                  ticks: { 
                    stepSize: 25,
                    color: '#948e8eff', // 🔴 números eje Y en rojo
                    font: {
                      size: 14
                    }
                  }
                }
              },
              plugins: { 
                legend: { display: false }
              }
            }
          });
        }
      }

      const areasNecesarias = mapearAreasAProgramas(diagnostico.respuestas);
      buscarProgramasRecomendados(areasNecesarias);
    }
  }, [diagnostico, t]);

  useEffect(() => {
    const fetchDiagnostico = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('authToken') || localStorage.getItem('token');
        
        if (!token) {
          throw new Error(t('diagnosisResult.noAuthToken', 'Token de autenticación no encontrado'));
        }

        let diagnosticoId = location.state?.diagnostico?.id || localStorage.getItem('lastDiagnosisId');
        
        if (!diagnosticoId) {
          throw new Error(t('diagnosisResult.noDiagnosisId', 'ID de diagnóstico no encontrado'));
        }

        const response = await axios.get(
          `http://localhost:3000/api/diagnosticos/${diagnosticoId}`,
          { 
            headers: { 
              'Authorization': `Bearer ${token.replace('Bearer ', '')}` 
            },
            timeout: 10000
          }
        );

        if (response.data.success) {
          setDiagnostico(response.data.data.diagnostico);
        } else {
          throw new Error(response.data.message || t('diagnosisResult.diagnosisFetchError', 'Error al cargar el diagnóstico'));
        }
      } catch (error) {
        console.error('Error fetching diagnosis:', error);
        setError(error.message);
        
        // Datos de ejemplo para desarrollo
        if (process.env.NODE_ENV === 'development') {
          setDiagnostico({
            id: 1,
            respuestas: {
              interes_ciberseguridad: true,
              materiales_biodegradables: false,
              software_diseno: true,
              operacion_maquinaria: true,
              herramientas_especializadas: false,
              normas_seguridad_altura: 'Siempre'
            }
          });
          setError(null);
        }
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

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>{t('diagnosisResult.loadingResults', 'Cargando resultados...')}</p>
      </div>
    );
  }

  if (error && !diagnostico) {
    return (
      <div className="error-container">
        <h2>{t('diagnosisResult.loadError', 'Error al cargar')}</h2>
        <p>{error}</p>
        <NavLink to="/home" className="NavLink">
          <FaArrowLeftLong className='icon-arrow' /> {t('general.backToHome', 'Volver al Inicio')}
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
          
        {/* Sección principal de resultados */}
        <section className='info-result-section'>
          <div className='content-result-section'>
            <NavLink to="/home" className="NavLink">
              <FaArrowLeftLong className='icon-arrow' />
              {t('general.backToHome', 'Volver al Inicio')}
            </NavLink>
            
            <div className="chart-header">
              {/* Exportar PDF/Excel */}
              <div className='Export-pdf-excel'>
  {programasRecomendados && programasRecomendados.length > 0 && (
    <ExportPdfExcel
      data={programasRecomendados}   // 🔹 Exportar solo los programas recomendados
      fileName="programas_recomendados"
      columns={{
        nombre: "Nombre",
        nivel: "Nivel",
        duracion: "Duración",
        area_vinculada: "Área Vinculada",
        estado: "Estado"
      }}
      excludeColumns={["id", "id_perfil", "nombre_perfil", "id_rae", "rae", "lectiva", "productiva", "competencia"]}
      chartId="diagnosticoChart"  // 🔹 la gráfica se muestra en pantalla pero NO se exporta
    />
  )}
</div>

              <div className='Sub-title'>
                <FaChartBar className="chart-icon" />
                <h2>{t('diagnosisResult.resultTitle', 'Resultados del Diagnóstico')}</h2>
                <p>{t('diagnosisResult.resultDescription', 'Análisis de las necesidades detectadas')}</p>
              </div>
              
              {/* Gráfico */}
              <div className="chart-container">
                <canvas id="diagnosticoChart"></canvas>
              </div>
              <div className="programs-recommendation-section">
                <button 
                  className="show-programs-btn"
                  onClick={() => setShowPrograms(!showPrograms)}
                >
                  <FaGraduationCap />
                  {showPrograms ? 
                    t('diagnosisResult.hidePrograms', 'Ocultar programas recomendados') : 
                    t('diagnosisResult.showRecommendedPrograms', 'Ver programas de formación recomendados')
                  }
                  ({programasRecomendados.length})
                </button>

                {showPrograms && (
                  <div className="recommended-programs-container">
                    <h3>{t('diagnosisResult.recommendedPrograms', 'Programas de Formación Recomendados')}</h3>
                    
                    {programasRecomendados.length > 0 ? (
                      <div className="programs-grid">
                        {programasRecomendados.map((programa) => (
                          <div key={programa.id} className="program-card">
                            <h4>{programa.nombre}</h4>
                            <p><strong>{t('listProgram.tableHeaders.level', 'Nivel')}:</strong> {programa.nivel}</p>
                            <p><strong>{t('listProgram.tableHeaders.duration', 'Duración')}:</strong> {programa.duracion}</p>
                            <p><strong>{t('listProgram.tableHeaders.modality', 'Modalidad')}:</strong> {programa.area_vinculada}</p>
                            <p><strong>{t('listProgram.tableHeaders.status', 'Estado')}:</strong> 
                              <span className={`status-badge ${programa.estado === 'Activo' ? 'active' : 'inactive'}`}>
                                {programa.estado === 'Activo' ? 
                                  t('listProgram.status.active', 'Activo') : 
                                  t('listProgram.status.inactive', 'Inactivo')
                                }
                              </span>
                            </p>
                            <Link to={`/ViewTraining/${programa.id}`}>
                              <button className="view-program-btn">
                                <IoIosInformationCircle />
                                {t('diagnosisResult.viewProgram', 'Ver Programa')}
                              </button>
                            </Link>
                          </div>
              
                        ))}
                      </div>
                    ) : (
                      <p className="no-programs-message">
                        {t('diagnosisResult.noRecommendedPrograms', 'No se encontraron programas recomendados para las necesidades detectadas')}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiagnosticResult;
