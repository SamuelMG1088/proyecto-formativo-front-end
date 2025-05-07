import './App.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OldPasswordPage from './pages/OldPasswordPage/OldPasswordPage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx' /* Importamos el componente LoginPage */
import UpdatePasswordPage from './pages/UpdatePasswordPage/UpdatePasswordPage'; /* Importamos el componente UpdatePasswordPage */
<<<<<<< HEAD
import VerifyCodePage from './pages/VerifyCodePage/VerifyCodePage.jsx';
import Navigation from './layout/SideBar/SideBar.jsx';
import { NavigationProvider } from './layout/SideBar/SideBar.jsx';
=======
import VerifyCodePage from './pages/VerifyCodePage/VerifyCodePage.jsx'
>>>>>>> a37860c3bd88c1d73ff3024b39685f099d6b2a83

function App() {
  return (
    <>
<<<<<<< HEAD
      <NavigationProvider>
        <Navigation/>
      </NavigationProvider>
    
=======
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} /> {/* Definimos la ruta para el componente LoginPage */}
        <Route path="/old" element={<OldPasswordPage/>} /> {/* Definimos la ruta para el componente OldPassword */}
        <Route path="/update" element={<UpdatePasswordPage/>} /> {/* Definimos la ruta para el componente UpdatePassword */}
        <Route path='/verify' element={<VerifyCodePage/>} />
      </Routes>
    </BrowserRouter>
>>>>>>> a37860c3bd88c1d73ff3024b39685f099d6b2a83
    </>
  )
}

export default App;