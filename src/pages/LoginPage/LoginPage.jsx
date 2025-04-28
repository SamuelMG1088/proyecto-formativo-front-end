import React from "react"
import './css/loginPage.css'
import '../../styles/variables.css'
import sofiaplus from '../../assets/icons/icon-sofiaplus.png'
import sgva from '../../assets/icons/icon-sgva.png'
import zajuna from '../../assets/icons/icon-zajuna.png'
import imglogin from '../../assets/images/img-login.svg'
import HeaderLogin from '../../layout/HeaderLogin/HeaderLogin.jsx';
import { Link } from 'react-router-dom';
import { BsEyeSlashFill } from "react-icons/bs";

export const OldPasswordPage = () => {
    return (
        <div id="LoginPage">
            <HeaderLogin/>
            <div className="LoginPage">
                <div className="frame">
                    <h1>Iniciar Sesión</h1>
                    <p>Accede a tu cuenta con tu email y contraseña </p>
                    <div className="input-box-email">
                        <label htmlFor="">Correo electrónico</label>
                        <input type="email"/>
                    </div>
                    <div className="input-box-email">
                        <label htmlFor="">Contraseña</label>
                        <input type="email"/>
                        <BsEyeSlashFill className='icon'/>
                    </div>

                    <div className="remember-forgot">
                        <label><input type="checkbox"/>Recordarme</label>
                        <Link to="/Old">Olvide mi contraseña</Link>
                    </div> {/* -- Link para recuprar cuenta -- */}

                    <Link to="">
                        <button className="BottonOld" type="submit">Login</button>
                    </Link>
                    <div className="accesses">
                    <p className='direct'>Accesos Directos</p>
                    <div className="box-assest">
                        <div className="box">
                            <img className='sofiaplus' src={sofiaplus} alt=''/>
                        </div>
                        <div className="box">
                            <img className='sgva' src={sgva} alt="" />
                        </div>
                        <div className="box">
                            <img  className='zajuna' src={zajuna} alt=""/>
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