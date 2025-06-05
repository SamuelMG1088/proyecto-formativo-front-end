import React, { useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { IoIosArrowForward } from "react-icons/io";
import { IoRefreshOutline } from "react-icons/io5";
import './css/filter.css'; // Asegúrate de tener un archivo CSS para los estilos

const Filter = ({
  onDocumentTypeChange,
  onStatusChange,
  onResetFilters,
  initialDocumentType = '',
  initialStatus = ''
}) => {
  const [showTipoDocumento, setShowTipoDocumento] = useState(false);
  const [showEstado, setShowEstado] = useState(false);
  const [selectedDocumento, setSelectedDocumento] = useState(initialDocumentType);
  const [selectedEstado, setSelectedEstado] = useState(initialStatus);

  const toggleTipoDocumento = () => {
    setShowTipoDocumento(!showTipoDocumento);
    setShowEstado(false);
  };

  const toggleEstado = () => {
    setShowEstado(!showEstado);
    setShowTipoDocumento(false);
  };

  const resetFilters = () => {
    setSelectedDocumento('');
    setSelectedEstado('');
    setShowTipoDocumento(false);
    setShowEstado(false);
    onResetFilters();
  };

  const handleTipoDocumento = (type) => {
    setSelectedDocumento(type);
    if (onDocumentTypeChange) {
      onDocumentTypeChange(type);
    }
  };

  const handleStatusSelect = (status) => {
    setSelectedEstado(status);
    if (onStatusChange) {
      onStatusChange(status);
    }
  };

  return (
    <div id='filter-component'>
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
        {showTipoDocumento && (
          <div className="filter-dropdown document-type-dropdown">
            <h3>Seleccione la razón social</h3>
            <div className="filter-options">
              <button
                className={`filter-option ${selectedDocumento === "C.C" ? "selected" : ""}`}
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
                className={`filter-option ${selectedEstado === "Activo" ? "selected" : ""}`}
                onClick={() => handleStatusSelect("Activo")}
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
    </div>
  );
};

export default Filter;