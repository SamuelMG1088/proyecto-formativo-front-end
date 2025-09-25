import './css/accestDirect.css'
import '../../styles/variables.css'
import sofiaplus from '../../assets/icons/icon-sofiaplus.png'
import sgva from '../../assets/icons/icon-sgva.png'
import zajuna from '../../assets/icons/icon-zajuna.png'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';



const AccestDirect = () => {
    const { t } = useTranslation();
    return (
        <>
        <div id="frame-accest">
            <div className="accesses">
                <div className='direct'></div>
                
                    <div className="box-assest">

                        <div className="box">
                            <Link to="/ManualUser" className='manuales'> 
                                <p>Manual de Usuario</p>
                            </Link>
                        </div>

                        <div className="box">
                            <Link to="/ManualOperaciones" className='manuales'> 
                                <p>Manual de Operaciones</p>
                            </Link>
                        </div>

                        <div className="box">
                            <Link to="/Manualinstalacion" className='manuales'> 
                                <p>Manual de Instalacion</p>
                            </Link>
                        </div>
                    </div> {/* -- Cajas de accesos -- */}
            </div>
        </div>
        </>
    )
}
export default AccestDirect;