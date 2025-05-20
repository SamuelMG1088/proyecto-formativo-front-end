import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage.jsx'; /* Importamos el componente LoginPage */
import OldPasswordPage from './pages/OldPasswordPage/OldPasswordPage.jsx';
import UpdatePasswordPage from './pages/UpdatePasswordPage/UpdatePasswordPage'; /* Importamos el componente UpdatePasswordPage */
import VerifyCodePage from './pages/VerifyCodePage/VerifyCodePage.jsx';
import Home from './pages/Home/Home.jsx'; /* Importamos el componente Home */
import ViewProfilePage from './pages/ViewProfilePage/ViewProfilePage.jsx'; /* Importamos el componente ViewProfilePage */
import EditProfilePage from './pages/EditProfilePage/EditProfilepage.jsx';
import FormCreate from './pages/CreateCompanyPage/CreateCompanyPage.jsx';
import InfoView from './pages/ListCompany/ListCompany.jsx';
import EditCompany from './pages/EditCompany/EditCompany.jsx'
import ListarInactivas from './pages/InactiveStateCompaniesPage/InactiveStateCompaniesPage.jsx';
import ListarProgramaFormacion from './pages/ListProgramaFormacion/ListProgramaFormacion.jsx';
import ListarUsuarios from './pages/ListUsers/ListUsers.jsx'; /* Importamos el componente ListarUsuarios */
import InactiveStateUsers from './pages/InactiveStateUsers/InactiveStateUsers.jsx'; /* Importamos el componente InactiveStateUsers */
import TrainingProgramForm from './pages/CreateTrainingProgramPage/CreateTrainingProgramPage.jsx'; /* Importamos el componente TrainingProgramForm */
import EditTraining from './pages/EditTrainingProgramsPage/EditTrainingPrograms.jsx'; /* Importamos el componente EditTraining */
import ViewTraining from './pages/ViewTrainingProgramPage/ViewTrainingProgramPage.jsx' /* Importamos el componente ViewTraining */
import Carrusel from './components/Carrusel/Carrusel.jsx'; /* Importamos el componente Carrusel */


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} /> {/* Definimos la ruta para el componente LoginPage */}
        <Route path="/old" element={<OldPasswordPage/>} /> {/* Definimos la ruta para el componente OldPassword */}
        <Route path="/update" element={<UpdatePasswordPage/>} /> {/* Definimos la ruta para el componente UpdatePassword */}
        <Route path="/verify" element={<VerifyCodePage/>} /> {/* Definimos la ruta para el componente VerifyCodePage */}
        <Route path="/home" element={<Home/>}/> {/* Definimos la ruta para el componente Home */}
        <Route path="/viewProfile" element={<ViewProfilePage/>}/> {/* Definimos la ruta para el componente ViewProfilePage */}
        <Route path="/editProfile" element={<EditProfilePage/>}/> {/* Definimos la ruta para el componente EditProfilePage */}
        <Route path="/createCompany" element={<FormCreate/>}/> {/* Definimos la ruta para el componente CreateUserForCompanyPage */}
        <Route path="/listcompany" element={<InfoView/>}/> {/* Definimos la ruta para el componente ListCompany */}
        <Route path="/editCompany" element={<EditCompany/>}/> {/* Definimos la ruta para el componente EditarEmpresa */}
        <Route path="/listarInactivas" element={<ListarInactivas/>}/> {/* Definimos la ruta para el componente ListCompany */}
        <Route path="/listarProgramaFormacion" element={<ListarProgramaFormacion/>}/> {/* Definimos la ruta para el componente ListProgramaFormacion */}
        <Route path='/listUser' element={<ListarUsuarios/>}/> {/* Definimos la ruta para el componente ListarUsuarios */}
        <Route path='/listInactiveUsers' element={<InactiveStateUsers/>}/> {/* Definimos la ruta para el componente ListaInactivaUsuario */}
        <Route path='/createProgramTraining' element={<TrainingProgramForm/>}/> {/* Definimos la ruta para el componente crear Programa de Formación*/}
        <Route path='/EditTraining' element={<EditTraining/>}/> {/* Definimos la ruta para el componente Programa de formacion*/}
        <Route path="/viewTraining" element={<ViewTraining/>}/> {/* Definimos la ruta para el componente visualizar Programa de formacion  */}
        <Route path="/carrusel" element={<Carrusel/>} /> {/* Definimos la ruta para el componente LoginPage */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;