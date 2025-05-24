// Home.jsx
import React from 'react';
import CardUser from '../../components/Cards/CardUser/CardUser.jsx';
import CardOrder from '../../components/Cards/CardOrder/CardOrder.jsx';
import CardSales from '../../components/Cards/CardSales/CardSales.jsx';
import CardPending from '../../Components/Cards/CardPending/CardPending.jsx';
import EnEjecucionChart from '../../components/GraphicHome/GraphicHome.jsx';
import Navigation, { NavigationProvider, useNavigation } from '../../layout/SideBar/SideBar.jsx';
import { Link } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';
import './css/Home.css';

const Home = () => {
  return (
    <>
      <div id="Homepage">
        <div className="home-page">
            <NavigationProvider>
              <Navigation/>
            </NavigationProvider>
              <div id="Home">
                <div className="h1">
                <h2>Bienvenida, Stephania Duque</h2>
                </div>

                <div className="cards-container">
                  <CardUser />
                  <CardSales />
                  <CardOrder />
                  <CardPending />
                </div>

                <div className="Grafics">
                  <EnEjecucionChart />
                </div>
              </div>
              {/* <footer> 
                <div className="box-front">
                  <p>JkkJK</p>
                </div>
                <div className="footer">
                  <p>© 2025 Sisgeec. Todos los derechos reservados.</p>
                </div>
                <div className="box-back">
                    <p>JkkJK</p>
                </div>
              </footer> */}
          </div>
        </div>

    </>
  );
}

export default Home;
