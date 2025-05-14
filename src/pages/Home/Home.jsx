// Home.jsx
import React from 'react';
import CardUser from '../../components/Cards/CardUser/CardUser.jsx';
import CardOrder from '../../components/Cards/CardOrder/CardOrder.jsx';
import CardSales from '../../components/Cards/CardSales/CardSales.jsx';
import CardPending from '../../Components/Cards/CardPending/CardPending.jsx';
import EnEjecucionChart from '../../components/GraphicHome/GraphicHome.jsx';
import Navigation, { NavigationProvider, useNavigation } from '../../layout/SideBar/SideBar.jsx';
import './css/Home.css';

const Home = () => {
  return (
    <>
    <NavigationProvider>

      <Navigation/>
      <div id="Homepage">
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
       </div>
    </NavigationProvider>
    </>
  );
}

export default Home;
