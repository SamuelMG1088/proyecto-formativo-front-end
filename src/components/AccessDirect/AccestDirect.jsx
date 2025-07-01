import './css/accestDirect.css'
import '../../styles/variables.css'
import sofiaplus from '../../assets/icons/icon-sofiaplus.png'
import sgva from '../../assets/icons/icon-sgva.png'
import zajuna from '../../assets/icons/icon-zajuna.png'


const AccestDirect = () => {
    return (
        <>
        <div id="frame-accest">
            <div className="accesses">
                <div className='direct'><hr/><p>Accesos Directos</p><hr/></div>
                    <div className="box-assest">

                        <div className="box">
                            <a href="https://zajuna-sena-edu.co/ayuda-y-soporte/" target="_blank" rel="noopener noreferrer">
                                <img className='sofiaplus' src={sofiaplus} alt=''/>
                            </a>
                        </div>

                        <div className="box">
                            <a href="https://caprendizaje.sena.edu.co/sgva/SGVA_Diseno/pag/login.aspx" target="_blank" rel="noopener noreferrer" >
                                <img className='sgva' src={sgva} alt="" />
                            </a>
                        </div>

                        <div className="box">
                            <a href="https://zajuna.sena.edu.co/" target="_blank" rel="noopener noreferrer" >
                                <img  className='zajuna' src={zajuna} alt=""/>
                                
                            </a>
                        </div>
                    </div> {/* -- Cajas de accesos -- */}
            </div>
        </div>
        </>
    )
}
export default AccestDirect;