import { NavLink, useLocation } from 'react-router-dom';
import '../../styles/variables.css'
import './css/navBar.css';
import Swal from 'sweetalert2';

const NavBar = () => {
    const location = useLocation();

    const AlertaLogout = () => {
    Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Fue exitoso tu cerrado de sesion",
    showConfirmButton: false,
    timer: 1500
    });
};
    
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
                    <li className={location.pathname === '/ListProgram' ? 'active' : '' || location.pathname === '/ViewTraining' ? 'active' : ''}>
                        <NavLink to="/ListProgram">Programa de Formación</NavLink>
                    </li>
                    <li className={location.pathname === '/businessdiagnosis' ? 'active' : ''}>
                        <NavLink to="/businessdiagnosis">Diagnostico Empresarial</NavLink>
                    </li>
                    <li className={location.pathname === '/viewprofile' ? 'active' : '' || location.pathname === '/Editprofile' ? 'active' : ''}>
                        <NavLink to="/viewprofile">Perfil</NavLink>
                    </li>
                    <li>
                        <NavLink to="/" onClick={AlertaLogout}>Cerrar Sesión</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar;