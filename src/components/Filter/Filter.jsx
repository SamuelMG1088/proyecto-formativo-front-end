import React, { useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { IoIosArrowForward } from "react-icons/io";
import { IoRefreshOutline } from "react-icons/io5";
import { useTranslation } from 'react-i18next';
import './css/filter.css';

const Filter = ({
  onDocumentTypeChange,
  onStatusChange,
  onRoleChange,
  onResetFilters,
  initialDocumentType = '',
  initialStatus = '',
  initialRole = ''
}) => {
  const { t } = useTranslation();

  const [showTipoDocumento, setShowTipoDocumento] = useState(false);
  const [showEstado, setShowEstado] = useState(false);
  const [showRol, setShowRol] = useState(false);
  const [selectedDocumento, setSelectedDocumento] = useState(initialDocumentType);
  const [selectedEstado, setSelectedEstado] = useState(initialStatus);
  const [selectedRol, setSelectedRol] = useState(initialRole);

  // 🔹 Toggle
  const toggleTipoDocumento = () => {
    setShowTipoDocumento(!showTipoDocumento);
    setShowEstado(false);
    setShowRol(false);
  };

  const toggleEstado = () => {
    setShowEstado(!showEstado);
    setShowTipoDocumento(false);
    setShowRol(false);
  };

  const toggleRol = () => {
    setShowRol(!showRol);
    setShowTipoDocumento(false);
    setShowEstado(false);
  };

  // 🔹 Reset
  const resetFilters = () => {
    setSelectedDocumento('');
    setSelectedEstado('');
    setSelectedRol('');
    setShowTipoDocumento(false);
    setShowEstado(false);
    setShowRol(false);
    onResetFilters();
  };

  // 🔹 Handlers
  const handleTipoDocumento = (type) => {
    setSelectedDocumento(type);
    if (onDocumentTypeChange) onDocumentTypeChange(type);
    setShowTipoDocumento(false);
  };

  const handleStatusSelect = (status) => {
    setSelectedEstado(status);
    if (onStatusChange) onStatusChange(status);
    setShowEstado(false);
  };

  const handleRoleSelect = (role) => {
    setSelectedRol(role);
    if (onRoleChange) onRoleChange(role);
    setShowRol(false); // 🔹 Cierra el dropdown al seleccionar
  };

  return (
    <div id='filter-component'>
      <div className="filter-container">
        <div className="filter-bar">
          <div className="filter-item filter-by">
            <FiFilter />
            <span>{t('filter.filterBy')}</span>
          </div>
          <div className="filter-item document-type" onClick={toggleTipoDocumento}>
            <span>{t('filter.documentType')}</span>
            <IoIosArrowForward />
          </div>
          <div className="filter-item rol" onClick={toggleRol}>
            <span>{t('filter.role')}</span>
            <IoIosArrowForward />
          </div>
          <div className="filter-item status" onClick={toggleEstado}>
            <span>{t('filter.status')}</span>
            <IoIosArrowForward />
          </div>
          <div className="filter-item reset" onClick={resetFilters}>
            <IoRefreshOutline className="refresh-icon" />
            <span className="reset-text">{t('filter.reset')}</span>
          </div>
        </div>

        {/* Filtro de Tipo de Documento */}
        {showTipoDocumento && (
          <div className="filter-dropdown document-type-dropdown">
            <h3>{t('filter.selectDocumentType')}</h3>
            <div className="filter-options">
              <button
                className={`filter-option ${selectedDocumento === "C.C" ? "selected" : ""}`}
                onClick={() => handleTipoDocumento("C.C")}
              >
                {t('filter.documents.CC')}
              </button>
              <button
                className={`filter-option ${selectedDocumento === "NIT" ? "selected" : ""}`}
                onClick={() => handleTipoDocumento("NIT")}
              >
                {t('filter.documents.NIT')}
              </button>
              <button
                className={`filter-option ${selectedDocumento === "C.E" ? "selected" : ""}`}
                onClick={() => handleTipoDocumento("C.E")}
              >
                {t('filter.documents.CE')}
              </button>
            </div>
          </div>
        )}

        {/* Filtro de Rol */}
        {showRol && (
          <div className="filter-dropdown rol-dropdown">
            <h3>{t('filter.selectRole')}</h3>
            <div className="filter-options">
              <button
                className={`filter-option ${selectedRol === "Empresa" ? "selected" : ""}`}
                onClick={() => handleRoleSelect("Empresa")}
              >
                {t('filter.roles.empresa')}
              </button>
              <button
                className={`filter-option ${selectedRol === "Admin" ? "selected" : ""}`}
                onClick={() => handleRoleSelect("Admin")}
              >
                {t('filter.roles.admin')}
              </button>
            </div>
          </div>
        )}

        {/* Filtro de Estado */}
        {showEstado && (
          <div className="filter-dropdown status-dropdown">
            <h3>{t('filter.selectStatus')}</h3>
            <div className="filter-options">
              <button
                className={`filter-option ${selectedEstado === "Activo" ? "selected" : ""}`}
                onClick={() => handleStatusSelect("Activo")}
              >
                {t('filter.statuses.activo')}
              </button>
              <button
                className={`filter-option ${selectedEstado === "Inactivo" ? "selected" : ""}`}
                onClick={() => handleStatusSelect("Inactivo")}
              >
                {t('filter.statuses.inactivo')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
