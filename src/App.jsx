import './App.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OldPasswordPage from './pages/OldPasswordPage/OldPasswordPage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx' /* Importamos el componente LoginPage */
import UpdatePasswordPage from './pages/UpdatePasswordPage/UpdatePasswordPage'; /* Importamos el componente UpdatePasswordPage */
import VerifyCodePage from './pages/VerifyCodePage/VerifyCodePage.jsx';
import Navigation from './layout/SideBar/SideBar.jsx';
import { NavigationProvider } from './layout/SideBar/SideBar.jsx';

function App() {
  return (
    <>
      <NavigationProvider>
        <Navigation/>
      </NavigationProvider>
    
    </>
  )
}

export default App;