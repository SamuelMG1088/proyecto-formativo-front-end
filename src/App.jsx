import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext/AuthContext.jsx'; // Importamos el AuthProvider y useAuth
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
import ViewCompany from './pages/ViewCompany/ViewCompany.jsx'
import 'normalize.css';
import './config/i18n.jsx';

// Componente para proteger rutas
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    // Si no hay usuario logueado, redirigir al login
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider> {/* Envuelve toda la aplicación con el AuthProvider */}
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/old" element={<OldPasswordPage />} />
          <Route path="/update" element={<UpdatePasswordPage />} />
          <Route path="/verify" element={<VerifyCodePage />} />

          {/* Rutas protegidas */}
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          
          <Route path="/viewprofile" element={
            <ProtectedRoute>
              <ViewProfile />
            </ProtectedRoute>
          } />
          
          <Route path="/listcompany" element={
            <ProtectedRoute>
              <ListCompanyPage />
            </ProtectedRoute>
          } />
          
          <Route path="/EditCompany/:id" element={
            <ProtectedRoute>
              <EditCompany />
            </ProtectedRoute>
          } />
          
          <Route path="/businessdiagnosis" element={
            <ProtectedRoute>
              <BusinesDiagnosis />
            </ProtectedRoute>
          } />
          
          <Route path="/DiagnosisResult" element={
            <ProtectedRoute>
              <DiagnosisResult />
            </ProtectedRoute>
          } />
          
          <Route path="/ViewTraining/:id" element={
            <ProtectedRoute>
              <ViewTraining />
            </ProtectedRoute>
          } />
          
          <Route path="/EditProfile" element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          } />
          
          <Route path="/CreateCompanyPage" element={
            <ProtectedRoute>
              <CreateCompanyPage />
            </ProtectedRoute>
          } />
          
          <Route path="/CreateProgram" element={
            <ProtectedRoute>
              <CreateProgram />
            </ProtectedRoute>
          } />
          
          <Route path="/ListProgram" element={
            <ProtectedRoute>
              <ListProgram />
            </ProtectedRoute>
          } />
          
          <Route path="/EditTraining/:id" element={
            <ProtectedRoute>
              <EditTraining />
            </ProtectedRoute>
          } />
          
          <Route path="/viewCompany/:id" element={
            <ProtectedRoute>
              <ViewCompany />
            </ProtectedRoute>
          } />

          {/* Ruta por defecto para rutas no encontradas */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;