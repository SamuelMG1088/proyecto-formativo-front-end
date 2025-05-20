import React from "react"
import './css/loginPage.css'
import '../../styles/variables.css'
import sofiaplus from '../../assets/icons/icon-sofiaplus.png'
import sgva from '../../assets/icons/icon-sgva.png'
import zajuna from '../../assets/icons/icon-zajuna.png'
import imglogin from '../../assets/images/img-login.svg'
import HeaderLogin from '../../layout/HeaderLogin/HeaderLogin.jsx';
import { BsEyeSlashFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

export const OldPasswordPage = () => {
    return (
        <div id="LoginPage">
            <HeaderLogin/>
            <div className="LoginPage">
                <div className="frame">
                    <h1>Iniciar Sesión</h1>
                    <p className="P_Accede" >Accede a tu cuenta con tu email y contraseña </p>
                    <div className="input-box-email">
                        <label htmlFor="">Correo electrónico</label>
                        <input type="email"/>
                    </div>
                    <div className="input-box-email">
                        <label htmlFor="">Contraseña</label>
                        <input type="password"/>
                        <BsEyeSlashFill className='icon'/>
                    </div>

                    <div className="remember-forgot">
                        <label><input type="checkbox"/>Recordarme</label>
                        <Link to="/old" className="OldMyPass">
                            Olvide mi contraseña
                        </Link>
                    </div>

                    <Link to="/home">
                        <button className="Bottonlogin" type="submit">LOGIN</button>
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

                <div className="img-LoginPage">
                    <img src={imglogin} alt=""/>
                </div>

            </div>
        </div>
        )
}
export default OldPasswordPage;