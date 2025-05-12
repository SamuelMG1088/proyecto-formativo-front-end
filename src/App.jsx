import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage.jsx' /* Importamos el componente LoginPage */
import OldPasswordPage from './pages/OldPasswordPage/OldPasswordPage.jsx';
import UpdatePasswordPage from './pages/UpdatePasswordPage/UpdatePasswordPage'; /* Importamos el componente UpdatePasswordPage */
import VerifyCodePage from './pages/VerifyCodePage/VerifyCodePage.jsx';
import Home from './pages/Home/Home.jsx' /* Importamos el componente Home */
import ViewProfilePage from './pages/ViewProfilePage/ViewProfilePage.jsx' /* Importamos el componente ViewProfilePage */
import EditProfilePage from './pages/EditProfilePage/EditProfilepage.jsx';
import FormCreate from './pages/CreateCompanyPage/CreateCompanyPage.jsx';

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
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;