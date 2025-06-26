// ExportPdfExcel.jsx

import React from 'react';
import './css/exportPdfExcel.css';
import '../../styles/variables.css';
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const ExportPdfExcel = ({ 
  data, 
  fileName = "exported-data", 
  columns, 
  excludeColumns = []
}) => {
  const processData = (rawData) => {
    if (!rawData || rawData.length === 0) return [];

    const sampleItem = rawData[0];
    const allColumns = columns || Object.keys(sampleItem);
    const filteredColumns = allColumns.filter(col => !excludeColumns.includes(col));

    return rawData.map(item => {
      const processedItem = {};
      filteredColumns.forEach(col => {
        let value = item[col];
        if (value === null || value === undefined) value = '';
        if (typeof value === 'object') {
          value = JSON.stringify(value);
        }
        processedItem[col] = value;
      });
      return processedItem;
    });
  };

  const exportToPDF = () => {
    try {
      const processedData = processData(data);
      if (!processedData || processedData.length === 0) {
        console.warn("No hay datos para exportar a PDF");
        return;
      }

      const doc = new jsPDF({
        orientation: Object.keys(processedData[0]).length > 5 ? 'landscape' : 'portrait'
      });

      const headers = [Object.keys(processedData[0])];
      const tableData = processedData.map(item => Object.values(item));

      doc.autoTable({
        head: headers,
        body: tableData,
        margin: { top: 10 },
        styles: {
          fontSize: 8,
          cellPadding: 2,
          overflow: 'linebreak'
        },
        headStyles: {
          fillColor: [22, 160, 133],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        }
      });

      doc.save(`${fileName}.pdf`);
    } catch (error) {
      console.error("Error al generar PDF:", error);
    }
  };

  const exportToExcel = () => {
    try {
      const processedData = processData(data);
      if (!processedData || processedData.length === 0) {
        console.warn("No hay datos para exportar a Excel");
        return;
      }

      const ws = XLSX.utils.json_to_sheet(processedData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Datos");
      XLSX.writeFile(wb, `${fileName}.xlsx`);
    } catch (error) {
      console.error("Error al generar Excel:", error);
    }
  };

  return (
    <div id='Buttons-exports'>
      <div className="exports">
        <div className="box-exports pdf" title="Exportar a PDF">
          <MdPictureAsPdf className="logo-pdf" onClick={exportToPDF} />
        </div>
        <div className="box-exports excel" title="Exportar a Excel">
          <RiFileExcel2Fill className="logo-exel" onClick={exportToExcel} />
        </div>
      </div>
    </div>
  );
};

export default ExportPdfExcel;
