// App.js - Componente principal
import React from 'react';
import EnEjecucionChart from '../../components/GraphicHome/GraphicHome.jsx';
import CardUser from '../../components/Cards/CardUser/CardUser.jsx'
import CardOrder from '../../components/Cards/CardOrder/CardOrder.jsx'
import CardSales from '../../components/Cards/CardSales/CardSales.jsx'
import CardPending from '../../components/Cards/CardPending/CardPending.jsx'
import { NavigationProvider } from '../../layout/SideBar/SideBar.jsx';
import './css/home.css'
import '../../styles/variables.css'
import Navigation from '../../layout/SideBar/SideBar.jsx';
const Home = () => {
  return (
    <NavigationProvider>
        <Navigation/>
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
        
    </NavigationProvider>
  );
}

export default Home;