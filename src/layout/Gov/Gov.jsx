import './css/gov.css'
import '../../styles/variables.css'
import logogov from '../../assets/logos/logo-gov.png'


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