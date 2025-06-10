import { NavLink, useLocation } from 'react-router-dom';
import '../../styles/variables.css'
import './css/navBar.css';

const NavBar = () => {
    const location = useLocation();
    
    return (
        <div id="navbar">
            <nav className="navbar">
                <ul className="navbar-menu">
                    <li className={location.pathname === '/home' ? 'active' : ''}>
                        <NavLink to="/home">Home</NavLink>
                    </li>
                    <li className={location.pathname === '/listcompany' ? 'active' : '' || location.pathname === '/viewcompany' ? 'active' : ''}>
                        <NavLink to="/listcompany">Usuarios</NavLink>
                    </li>
                    <li className={location.pathname === '/program' ? 'active' : ''}>
                        <NavLink to="/ViewTraining">Programa de Formación</NavLink>
                    </li>
                    <li className={location.pathname === '/businessdiagnosis' ? 'active' : ''}>
                        <NavLink to="/businessdiagnosis">Diagnostico Empresarial</NavLink>
                    </li>
                    <li className={location.pathname === '/viewprofile' ? 'active' : ''}>
                        <NavLink to="/viewprofile">Perfil</NavLink>
                    </li>
                    <li>
                        <NavLink to="/">Cerrar Sesión</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default NavBar;