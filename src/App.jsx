import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext/AuthContext.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import OldPasswordPage from './pages/OldPasswordPage/OldPasswordPage.jsx';
import UpdatePasswordPage from './pages/UpdatePasswordPage/UpdatePasswordPage';
import VerifyCodePage from './pages/VerifyCodePage/VerifyCodePage.jsx';
import Home from './pages/Home/Home.jsx';
import ViewProfile from './pages/ViewProfile/ViewProfile.jsx';
import ListCompanyPage from './pages/ListCompanyPage/ListCompanyPage.jsx';
import EditCompany from './pages/EditCompany/EditCompany.jsx';
import BusinesDiagnosis from './pages/BusinessDiagnosis/BusinessDiagnosis.jsx';
import DiagnosisResult from './pages/DiagnosticResult/DiagnosticResult.JSX';
import ViewTraining from './pages/ViewTrainingProgram/ViewTrainingProgram.jsx';
import EditProfile from './pages/EditProfile/EditProfile.jsx';
import CreateCompanyPage from './pages/CreateCompanyPage/CreateCompanyPage.jsx';
import CreateProgram from './pages/CreateProgramForm/CreateProgramForm.jsx';
import ListProgram from './pages/ListProgram/ListProgram.jsx';
import EditTraining from './pages/EditTrainingProgram/EditTrainingProgram.jsx';
import ViewCompany from './pages/ViewCompany/ViewCompany.jsx';
import 'normalize.css';
import './config/i18n.jsx';


import { ThemeProvider, useTheme } from "next-themes";
import { useEffect, useState } from "react";


function ThemeSync() {
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    const current = theme === "system" ? resolvedTheme : theme;
    if (!current) return;

    if (current === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme, resolvedTheme]);

  return null;
}

function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      className="toggle-theme-btn"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Cambiar tema"
    >
      {/* Botón vacío, solo para dar click */}
    </button>
  );
}

// Componente para proteger rutas
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ThemeSync />

        <BrowserRouter>
          {/* Botón global fijo */}
          <div style={{ position: "fixed", top: 18, right: 18, zIndex: 9999 }}>
            <ThemeToggleButton />
          </div>

          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/old" element={<OldPasswordPage />} />
            <Route path="/update" element={<UpdatePasswordPage />} />
            <Route path="/verify" element={<VerifyCodePage />} />

            {/* Rutas protegidas */}
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/viewprofile" element={<ProtectedRoute><ViewProfile /></ProtectedRoute>} />
            <Route path="/listcompany" element={<ProtectedRoute><ListCompanyPage /></ProtectedRoute>} />
            <Route path="/EditCompany/:id" element={<ProtectedRoute><EditCompany /></ProtectedRoute>} />
            <Route path="/businessdiagnosis" element={<ProtectedRoute><BusinesDiagnosis /></ProtectedRoute>} />
            <Route path="/DiagnosisResult" element={<ProtectedRoute><DiagnosisResult /></ProtectedRoute>} />
            <Route path="/ViewTraining/:id" element={<ProtectedRoute><ViewTraining /></ProtectedRoute>} />
            <Route path="/EditProfile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
            <Route path="/CreateCompanyPage" element={<ProtectedRoute><CreateCompanyPage /></ProtectedRoute>} />
            <Route path="/CreateProgram" element={<ProtectedRoute><CreateProgram /></ProtectedRoute>} />
            <Route path="/ListProgram" element={<ProtectedRoute><ListProgram /></ProtectedRoute>} />
            <Route path="/EditTraining/:id" element={<ProtectedRoute><EditTraining /></ProtectedRoute>} />
            <Route path="/viewCompany/:id" element={<ProtectedRoute><ViewCompany /></ProtectedRoute>} />

            {/* Ruta por defecto */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
