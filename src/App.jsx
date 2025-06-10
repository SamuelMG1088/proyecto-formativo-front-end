import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage.jsx'; /* Importamos el componente LoginPage */
import OldPasswordPage from './pages/OldPasswordPage/OldPasswordPage.jsx';
import UpdatePasswordPage from './pages/UpdatePasswordPage/UpdatePasswordPage'; /* Importamos el componente UpdatePasswordPage */
import VerifyCodePage from './pages/VerifyCodePage/VerifyCodePage.jsx';
import Home from './pages/Home/Home.jsx'; /* Importamos el componente Home */
import ViewProfile from './pages/ViewProfile/ViewProfile.jsx'; /* Importamos el componente ViewProfile */
import ListCompanyPage from './pages/ListCompanyPage/ListCompanyPage.jsx'; /* Importamos el componente ListCompanyPage */
import ViewCompany from './pages/ViewCompany/ViewCompany.jsx'; /* Importamos el componente ViewCompany */
import BusinesDiagnosis from './pages/BusinessDiagnosis/BusinessDiagnosis.jsx'; /* Importamos el componente BusinessDiagnosis */
import SuccessfullDiagnosis from './pages/SuccessfulDiagnosis/SuccessfulDiagnosis.jsx';
import DiagnosisResult from './pages/DiagnosticResult/DiagnosticResult.JSX';
import ViewTraining from './pages/ViewTrainingProgram/ViewTrainingProgram.jsx';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} /> {/* Definimos la ruta para el componente LoginPage */}
        <Route path="/old" element={<OldPasswordPage/>} /> {/* Definimos la ruta para el componente OldPassword */}
        <Route path="/update" element={<UpdatePasswordPage/>} /> {/* Definimos la ruta para el componente UpdatePassword */}
        <Route path="/verify" element={<VerifyCodePage/>} /> {/* Definimos la ruta para el componente VerifyCodePage */}
        <Route path="/home" element={<Home/>} /> {/* Definimos la ruta para el componente Home */}
        <Route path='viewprofile' element={<ViewProfile/>} /> {/* Definimos la ruta para el componente ViewProfile */}
        <Route path="/listcompany" element={<ListCompanyPage/>} /> {/* Ruta comodín para redirigir a LoginPage si no coincide ninguna otra ruta */}
        <Route path="/viewcompany" element={<ViewCompany/>} /> {/* Definimos la ruta para el componente ViewCompany */}
        <Route path="/businessdiagnosis" element={<BusinesDiagnosis/>} /> {/* Definimos la ruta para el componente BusinessDiagnosis */}
        <Route path="/SuccessfullDiagnosis" element={<SuccessfullDiagnosis/>} /> {/* Definimos la ruta para el componente BusinessDiagnosis */}
        <Route path="/DiagnosisResult" element={<DiagnosisResult/>} /> {/* Definimos la ruta para el componente BusinessDiagnosis */}
        <Route path="/ViewTraining" element={<ViewTraining/>} /> {/* Definimos la ruta para el componente BusinessDiagnosis */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;