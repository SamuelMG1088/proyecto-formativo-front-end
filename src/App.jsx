import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import OldPasswordPage from './pages/OldPasswordPage/OldPasswordPage.jsx';
import UpdatePasswordPage from './pages/UpdatePasswordPage/UpdatePasswordPage.jsx';
import VerifyCodePage from './pages/VerifyCodePage/VerifyCodePage.jsx';
import Home from './pages/Home/Home.jsx';

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/oldpassword" element={<OldPasswordPage/>} />
          <Route path="/updatepassword" element={<UpdatePasswordPage/>} />
          <Route path="/verifycode" element={<VerifyCodePage/>} />
          <Route path="home" element={<Home/>} />
        </Routes>
      
    </BrowserRouter>
    </>
  )
}

export default App;