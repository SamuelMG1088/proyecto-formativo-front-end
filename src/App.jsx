import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage.jsx'; /* Importamos el componente LoginPage */
import OldPasswordPage from './pages/OldPasswordPage/OldPasswordPage.jsx';
import UpdatePasswordPage from './pages/UpdatePasswordPage/UpdatePasswordPage'; /* Importamos el componente UpdatePasswordPage */
import VerifyCodePage from './pages/VerifyCodePage/VerifyCodePage.jsx';
import Home from './pages/Home/Home.jsx'; /* Importamos el componente Home */
import ViewProfile from './pages/ViewProfile/ViewProfile.jsx'; /* Importamos el componente ViewProfile */
import ListCompanyPage from './pages/ListCompanyPage/ListCompanyPage.jsx'; /* Importamos el componente ListCompanyPage */
import EditCompany from './pages/EditCompany/EditCompany.jsx'; /* Importamos el componente ViewCompany */
import BusinesDiagnosis from './pages/BusinessDiagnosis/BusinessDiagnosis.jsx'; /* Importamos el componente BusinessDiagnosis */
import DiagnosisResult from './pages/DiagnosticResult/DiagnosticResult.JSX';
import ViewTraining from './pages/ViewTrainingProgram/ViewTrainingProgram.jsx';
import EditProfile from './pages/EditProfile/EditProfile.jsx'; /* Importamos el componente ViewCompany */
import CreateCompanyPage from './pages/CreateCompanyPage/CreateCompanyPage.jsx'; /* Importamos el componente CreateCompanyPage */
import CreateProgram from './pages/CreateProgramForm/CreateProgramForm.jsx'; /* Importamos el componente CreateProgram */
import ListProgram from './pages/ListProgram/ListProgram.jsx';
import EditTraining from './pages/EditTrainingProgram/EditTrainingProgram.jsx';
import ViewCompany from './pages/ViewCompany/ViewCompany.jsx'


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
        <Route path="/EditCompany" element={<EditCompany/>} /> {/* Definimos la ruta para el componente ViewCompany */}
        <Route path="/businessdiagnosis" element={<BusinesDiagnosis/>} /> {/* Definimos la ruta para el componente BusinessDiagnosis */}
        <Route path="/DiagnosisResult" element={<DiagnosisResult/>} /> {/* Definimos la ruta para el componente BusinessDiagnosis */}
        <Route path="/ViewTraining" element={<ViewTraining/>} /> {/* Definimos la ruta para el componente BusinessDiagnosis */}
        <Route path="/EditProfile" element={<EditProfile/>} /> {/* Definimos la ruta para el componente ViewCompany */}
        <Route path="/CreateCompanyPage" element={<CreateCompanyPage/>} /> {/* Definimos la ruta para el componente CreateCompany */}
        <Route path="/CreateProgram" element={<CreateProgram/>} /> {/* Definimos la ruta para el componente CreateProgram */}
        <Route path="/ListProgram" element={<ListProgram/>} /> {/* Definimos la ruta para el componente ListProgram */}
        <Route path="/EditTraining" element={<EditTraining/>} /> {/* Definimos la ruta para el componente EditTraining */}
        <Route path="/viewCompany" element={<ViewCompany/>} /> {/* Definimos la ruta para el componente EditTraining */}
        <Route path="/EditCompany" element={<EditCompany/>} /> {/* Definimos la ruta para el componente EditTraining */}


      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;