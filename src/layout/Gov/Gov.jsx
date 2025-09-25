import './css/gov.css'
import '../../styles/variables.css'
import logogov from '../../assets/logos/gov-logo.png'


const Gov = () => {
    return (
        <>
            <div id='barra-gov'>
                <header>
                    <img src={logogov} alt="logo-gov"/>
                </header>
            </div>
        </>
    )
}
export default Gov;