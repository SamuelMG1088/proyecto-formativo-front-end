// Home.jsx
import React from 'react';
import CardUser from '../../components/Cards/CardUser/CardUser.jsx';
import CardOrder from '../../components/Cards/CardOrder/CardOrder.jsx';
import CardSales from '../../components/Cards/CardSales/CardSales.jsx';
import CardPending from '../../Components/Cards/CardPending/CardPending.jsx';
import EnEjecucionChart from '../../components/GraphicHome/GraphicHome.jsx';
import Navigation, { NavigationProvider, useNavigation } from '../../layout/SideBar/SideBar.jsx';
import './css/Home.css';

const HomeContent = () => {
  const { isCollapsed } = useNavigation();

  return (
    <>
      <Navigation/>
      <div id="Homepage">
        <div id="Home" className={isCollapsed ? 'collapsed' : ''}>
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
    </>
  );
};

const Home = () => (
  <NavigationProvider>
    <HomeContent />
  </NavigationProvider>
);

export default Home;
