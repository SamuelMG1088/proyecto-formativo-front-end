import React from "react"
import sofiaplus from '../../assets/icons/icon-sofiaplus.png'
import sgva from '../../assets/icons/icon-sgva.png'
import zajuna from '../../assets/icons/icon-zajuna.png'
import svgoldPassword from '../../assets/images/img-oldPassword.svg'
import HeaderLogin from '../../layout/HeaderLogin/HeaderLogin.jsx';
import { Link } from 'react-router-dom';
import { FaAngleLeft } from "react-icons/fa6";
import './css/oldPasswordPage.css'
import '../../styles/variables.css'

export const OldPasswordPage = () => {
    return (
        <div id="OldPasswrodPage">
            <HeaderLogin/>
            <div className="old-password">
                <div className="frame">
                    <a href=""> <FaAngleLeft /><Link to="/">Ir a inicio de Sesión</Link></a>
                    <h1>Olvido su contraseña?</h1>
                    <p>No se preocupe, se le enviará un código de verificación a su correo electrónico, escríbalo acá</p>
                    <div className="input-box-email">
                        <label htmlFor="">Email</label>
                        <input type="email"/>
                    </div>

                    <Link to="/verify">
                        <button className="BottonOld" type="submit">ENVIAR</button>
                    </Link>
                    
                    <div className="accesses">
                    <p className='direct'>Accesos Directos</p>
                    <div className="box-assest">
                        <div className="box">
                            <a href="https://zajuna.sena.edu.co/" target="_blank" rel="noopener noreferrer">
                                <img className='sofiaplus' src={sofiaplus} alt=''/>
                            </a>
                        </div>
                        <div className="box">
                            <a href="https://caprendizaje.sena.edu.co/sgva/SGVA_Diseno/pag/login.aspx" target="_blank" rel="noopener noreferrer" >
                                <img className='sgva' src={sgva} alt="" />
                            </a>
                        </div>
                        <div className="box">
                            <a href="https://zajuna-sena-edu.co/ayuda-y-soporte/" target="_blank" rel="noopener noreferrer" >
                                <img  className='zajuna' src={zajuna} alt=""/>
                            </a>
                        </div>
                    </div> {/* -- Cajas de accesos -- */}
                    </div>
                </div>

                <div className="img-old-password">
                    <img src={svgoldPassword} alt=""/>
                </div>

            </div>
        </div>
        )
}
export default OldPasswordPage;