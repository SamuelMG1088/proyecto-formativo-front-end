import './css/headerLogin.css'
import '../../styles/variables.css'
import logosena from '../../assets/logos/logo-Sena.png'

const HeaderLogin = () => {
    return (
        <>
            <div id='barra-navegacion'>
                <nav>
                    <img src={logosena} alt="logo-sena"/>
                    <h1>SISGEEC</h1>
                </nav>
            </div>
        </>
    )
}
export default HeaderLogin;