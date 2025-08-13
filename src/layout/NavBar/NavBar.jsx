import { NavLink, useLocation } from 'react-router-dom';
import '../../styles/variables.css';
import './css/navBar.css';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

const NavBar = () => {
    const location = useLocation();
    const { t, i18n } = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("lang", lang); // recuerda idioma
    };

    const AlertaLogout = () => {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: t("alerts.logoutSuccess"),
            showConfirmButton: false,
            timer: 1500
        });
    };

    return (
        <div id="navbar">
            <nav className="navbar">
                <ul className="navbar-menu">
                    <li className={location.pathname === '/home' ? 'active' : ''}>
                        <NavLink to="/home">{t("navbar.home")}</NavLink>
                    </li>
                    <li className={location.pathname === '/listcompany' ? 'active' : '' ||
                        location.pathname === '/viewcompany' ? 'active' : '' ||
                        location.pathname === '/CreateCompanyPage' ? 'active' : '' ||
                        location.pathname === '/viewCompany/14' ? 'active' : ''}>
                        <NavLink to="/listcompany">{t("navbar.users")}</NavLink>
                    </li>
                    <li className={location.pathname === '/ListProgram' ? 'active' : '' ||
                        location.pathname === '/ViewTraining/2896364' ? 'active' : '' ||
                        location.pathname === '/CreateProgram' ? 'active' : ''}>
                        <NavLink to="/ListProgram">{t("navbar.training")}</NavLink>
                    </li>
                    <li className={location.pathname === '/businessdiagnosis' ? 'active' : ''}>
                        <NavLink to="/businessdiagnosis">{t("navbar.diagnosis")}</NavLink>
                    </li>
                    <li className={location.pathname === '/viewprofile' ? 'active' : '' ||
                        location.pathname === '/Editprofile' ? 'active' : ''}>
                        <NavLink to="/viewprofile">{t("navbar.profile")}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/" onClick={AlertaLogout}>{t("navbar.logout")}</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;
