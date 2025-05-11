import './App.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OldPasswordPage from './pages/OldPasswordPage/OldPasswordPage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx' /* Importamos el componente LoginPage */
import UpdatePasswordPage from './pages/UpdatePasswordPage/UpdatePasswordPage'; /* Importamos el componente UpdatePasswordPage */
import VerifyCodePage from './pages/VerifyCodePage/VerifyCodePage.jsx';
import Home from './pages/Home/Home.jsx' /* Importamos el componente Home */

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
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;