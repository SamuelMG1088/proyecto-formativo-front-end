import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import './css/graphicResultDiagnosis.css'; 

const data = [
  { mes: 'Enero', habilidades: 80 },
  { mes: 'Febrero', habilidades: 75 },
  { mes: 'Marzo', habilidades: 90 },
  { mes: 'Abril', habilidades: 70 },
  { mes: 'Mayo', habilidades: 85 },
  { mes: 'Junio', habilidades: 95 },
];

const DiagnosisResult = () => {
  return (
    <div className="diagnosis-result-page">

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="habilidades" fill="#28a745" name="Habilidades" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DiagnosisResult;
