import React from "react"
import './css/oldPasswordPage.css'
import sofiaplus from '../../assets/icons/icon-sofiaplus.png'
import sgva from '../../assets/icons/icon-sgva.png'
import zajuna from '../../assets/icons/icon-zajuna.png'
import svgoldPassword from '../../assets/images/img-oldPassword.svg'
import HeaderLogin from '../../layout/HeaderLogin/HeaderLogin.jsx';
import { Link } from 'react-router-dom';
import { FaAngleLeft } from "react-icons/fa6";

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
                        <button className="BottonOld" type="submit">Enviar</button>
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

                <div className="img-old-password">
                    <img src={svgoldPassword} alt=""/>
                </div>

            </div>
        </div>
        )
}
export default OldPasswordPage;