// src/layout/NavBar/NavBar.jsx
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../../styles/variables.css";
import "./css/navBar.css";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../contexts/AuthContext/AuthContext.jsx";
import modulesConfig from "../../components/modulconfi/modulconfi.jsx";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  const AlertaLogout = () => {
    const isDarkMode = document.body.classList.contains("dark");

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: t("alerts.logoutSuccess"),
      showConfirmButton: false,
      timer: 1500,
      background: isDarkMode ? "#1e1e1e" : "#fff",
      color: isDarkMode ? "#fff" : "#000",
    });

    logout();
    navigate("/");
  };

  // 🔹 Obtener módulos según rol
  const roleModules = user?.rol_usuario
    ? modulesConfig[user.rol_usuario] || []
    : [];

  // 🔹 Reemplazar parámetros dinámicos en los links
  const parseLink = (link) => {
    if (!link) return "#";
    if (link.includes(":id") && user?.id) {
      return link.replace(":id", user.id);
    }
    return link;
  };

  // 🔹 Función para determinar si el link está activo incluso con parámetros
  const isActive = (link) => {
    const parsed = parseLink(link);
    return location.pathname === parsed;
  };

  return (
    <div id="navbar">
      <nav className="navbar">
        <ul className="navbar-menu">
          {roleModules.map((module) => (
            <li
              key={module.id}
              className={module.link && isActive(module.link) ? "active" : ""}
            >
              {module.link ? (
                <NavLink to={parseLink(module.link)}>
                  {t(module.title)}
                </NavLink>
              ) : (
                <button
                  onClick={module.id === "logout" ? AlertaLogout : module.action}
                  className="logout-btn"
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  {t(module.title)}
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
