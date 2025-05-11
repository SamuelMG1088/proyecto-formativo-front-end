import React from "react"
import './css/updatePasswordPage.css'
import '../../styles/variables.css'
import imgUpdate from '../../assets/images/img-Update.svg'
import HeaderLogin from '../../layout/HeaderLogin/HeaderLogin.jsx';
import { Link } from 'react-router-dom';
import { BsEyeSlashFill } from "react-icons/bs";

export const UpdatePasswordPage = () => {
    return (
        <div id="UpdatePasswordPage">
            <HeaderLogin/>
            <div className="UpdatePage">
                <div className="frame">
                    <h1>Actualizar Contraseña</h1>
                    <p>Actualiza tu contraseña y esta vez pon una que recuerdes ;)</p>
                    <div className="input-box-email">
                        <label htmlFor="">Crear Contraseña</label>
                        <input type="email"/>
                        <BsEyeSlashFill className='icon'/>
                    </div>
                    <div className="input-box-email">
                        <label htmlFor="">Actualizar contraseña</label>
                        <input type="email"/>
                        <BsEyeSlashFill className='icon'/>
                    </div>

                    <Link to="/">
                        <button className="BottonUpdate" type="submit">ACTUALIZAR CONTRASEÑA</button>
                    </Link>
                </div>
                <div className="img-UpdatePage">
                    <img src={imgUpdate} alt=""/>
                </div>
            </div>
        </div>
        )
}
export default UpdatePasswordPage;