import React from "react"
import imgVerify from '../../assets/images/img-VerifyCode.svg'
import HeaderLogin from '../../layout/HeaderLogin/HeaderLogin.jsx';
import { Link } from 'react-router-dom';
import { BsEyeSlashFill } from "react-icons/bs";
import './css/verifyCodePage.css'
import '../../styles/variables.css'

export const VerifyCodePage = () => {
    return (
        <div id="VerifyCodePage">
            <HeaderLogin/>
            <div className="VerifyPage">
                <div className="frame">
                    <a href=""> <FaAngleLeft /><Link to="/">Ir a inicio de Sesión</Link></a>
                    <h1>Verificar Codigo</h1>
                    <p>Ingresa el código que enviamos a tu email</p>
                    <div className="input-box-email">
                        <label htmlFor="">Ingrese el Codigo</label>
                        <input type="email"/>
                        <BsEyeSlashFill className='icon'/>
                    </div>

                    <Link to="">
                        <button className="BottonOld" type="submit">Verificar</button>
                    </Link>
                </div>
                <div className="img-UpdatePage">
                    <img src={imgVerify} alt=""/>
                </div>
            </div>
        </div>
        )
}
export default VerifyCodePage;