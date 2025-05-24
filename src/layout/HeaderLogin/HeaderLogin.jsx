import './css/headerLogin.css'
import '../../styles/variables.css'
import logosena from '../../assets/logos/logo-Sena.png'
import logosisgeec from '../../assets/logos/logo-sisgeec.png'

const HeaderLogin = () => {
    return (
        <>
            <div id='barra-navegacion'>
                <nav>
                    <img src={logosisgeec} alt="logo-sisgeec"/>
                    <img  className='img-sena' src={logosena} alt="logo-sena"/>
                </nav>
            </div>
        </>
    )
}
export default HeaderLogin;