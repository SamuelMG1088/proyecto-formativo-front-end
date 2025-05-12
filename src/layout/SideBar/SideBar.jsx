import React, { createContext, useState, useContext, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { IoIosSearch } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoHomeOutline } from "react-icons/io5";
import { TfiStatsUp } from "react-icons/tfi";
import { FaRegBuilding } from "react-icons/fa";
import { PiUsers } from "react-icons/pi";
import { MdOutlineAlignVerticalBottom } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { BsBuildings } from "react-icons/bs";
import LogoSena from '../../assets/logos/logo-Sena.png';
import Profilepic from '../../assets/logos/logo-Sena.png';
import { Link } from 'react-router-dom';
import './css/SideBar.css';

// Contexto de navegación
const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <NavigationContext.Provider value={{ isCollapsed, toggleSidebar }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);

const Navigation = () => {
  const { isCollapsed, toggleSidebar } = useNavigation();

  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1023 });

  useEffect(() => {
    if (isMobile && !isCollapsed) {
      toggleSidebar();
    }
  }, [isMobile]);

  return (
    <>
      {/* Sidebar */}
      <div id="Sidebar" className={`container ${isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'}`}>
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
           <div className="sidebar-border"></div>

          <header className="logosena">
            <img src={LogoSena} alt="Logo SENA" />
            {!isCollapsed && <h2 className="logo">SISGEEC</h2>}
          </header>

          <nav>
            <ul className="sidebar-menu">
              <Link  className='sidebar-link' to="/home">
                <li className={isMobile ? 'mobile-item' : ''}>
                  <button className="button-Sidebar"><IoHomeOutline className="icon" /></button>
                  {!isCollapsed && <span>Home</span>}
                </li>
              </Link>

              <Link  className='sidebar-link' to="/viewCompanies">
                <li className={isMobile ? 'mobile-item' : ''}>
                  <button className="button-Sidebar"><BsBuildings className="icon" /></button>
                  {!isCollapsed && <span>Empresas</span>}
                </li>
              </Link>

              <Link  className='sidebar-link' to="/viewInternships">
                <li className={isMobile ? 'mobile-item' : ''}>
                  <button className="button-Sidebar"><PiUsers className="icon" /></button>
                  {!isCollapsed && <span>Usuarios</span>}
                </li>
              </Link>

              <Link  className='sidebar-link' to="/viewInternships">
                <li className={isMobile ? 'mobile-item' : ''}>
                  <button className="button-Sidebar"><MdOutlineAlignVerticalBottom className="icon" /></button>
                  {!isCollapsed && <span>Programa de formación</span>}
                </li>
              </Link>

              <Link className='sidebar-link' to="/viewReports">
                <li className={isMobile ? 'mobile-item' : ''}>
                  <button className="button-Sidebar"><TfiStatsUp className="icon" /></button>
                  {!isCollapsed && <span>Gráficos</span>}
                </li>
              </Link>

              <Link  className='sidebar-link' to="/viewProfile">
                <li className={isMobile ? 'mobile-item' : ''}>
                  <button className="button-Sidebar"><AiOutlineUser className="icon" /></button>
                  {!isCollapsed && <span>Perfil</span>}
                </li>
              </Link>

            </ul>
          </nav>

          {!isCollapsed && <div className="line-bottom" />}
          
          <Link  className='sidebar-link' to="/">
            <button className="logout">
              <CiLogout className="icon" />
              {!isCollapsed && <span>Cerrar sesión</span>} 
            </button>
          </Link>
          
        </aside>
      </div>

      {/* Navbar */}
      <nav id="NavBar" className={`nav-section ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="left-nav-content">
          <button className="menu-toggle" onClick={toggleSidebar}>
            <RxHamburgerMenu className="hamburger-icon" />
          </button>
          <form className="search-bar">
            <label htmlFor="search">
              <IoIosSearch className="search-icon" />
            </label>
            <input id="search" type="text" placeholder="Buscar..." />
          </form>
        </div>

        <div className="profile-container">
          <img src={Profilepic} alt="Foto de perfil" className="profile-pic" />
          <div className="profile-info">
            <p className="profile-name"><strong>Stephania Duque</strong></p>
            <p className="profile-role">Admin</p>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;