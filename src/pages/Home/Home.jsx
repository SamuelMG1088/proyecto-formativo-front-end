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
                <div className="empresa-table-container">
              <div className="border">
                <table className="empresa-table">
                  <thead>
                    <tr>
                      <th>NUMERO DE DOCUMENTO</th>
                      <th>NOMBRE</th>
                      <th>CORREO</th>
                      <th>ACTIVIDAD</th>
                      <th>RAZÓN SOCIAL</th>
                      <th>ESTADO</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>00001</td>
                      <td>Christine Brooks</td>
                      <td>089 Kutch Green Apt. 448</td>
                      <td>04 Sep 2019</td>
                      <td>Electric</td>
                      <td>
                        <span className="status-badge active">Activo</span>
                      </td>
                      <td>
                        <Link to ='/editCompany'>
                          <button className="edit-button">
                            <FaRegEdit />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
              </div>
          </div>
      </div>
    </>
  );
}

export default Home;
