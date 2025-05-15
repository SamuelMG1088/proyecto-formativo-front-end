import ButtonsExports from "../../components/ExportPdfExcel/ExportPdfExcel.jsx"
import ButtonAdd from "../../components/Buttons/ButtonAdd/ButtonAdd.jsx"
import ButtonViewInactive from "../../components/Buttons/ButtonViewInactive/ButtonViewInactive.jsx"
import Navigation, { NavigationProvider, useNavigation } from '../../layout/SideBar/SideBar.jsx';
import Fury from "../../assets/images/Fury.jpg";
import tatan from "../../assets/images/tatan.jpg";
import fania from "../../assets/images/img-view-profile.jpg";
import juanjo from "../../assets/images/juanjo.jpg";
import pinqui from "../../assets/images/pinqui.jpg";
import ladin from "../../assets/images/ladin.jpg";
import "./css/inactiveSTateUsers.css";

export default function ListarUsuarios() {
return (
    <>
        <div id="UsersInactive">
            <NavigationProvider>
                <Navigation/>
            </NavigationProvider>
        
            <div className="container-principal">
                <div className="titles-container">
                    <h2>Usuarios Inactivos</h2>
                </div>

                <div className="container-users">
                    <div className="fila-1">

                        <div className="card-user">
                            <img src={Fury} alt="" className="img-card-user"/>
                            <div className="user-info">
                                <h3 className="user-name">Samuel Monsalve</h3>
                                <p className="user-email">monsalvegomezsamuel2@gmail.com</p>
                            </div>
                            <div className="user-button">
                                <button className="button-activate">Activar</button>
                                <button className="button-delete">Eliminar</button>
                            </div>
                        </div>

                        <div className="card-user">
                            <img src={tatan} alt="" className="img-card-user"/>
                            <div className="user-info">
                                <h3 className="user-name">Jhonatan Acevedo</h3>
                                <p className="user-email">mendomacuqui@gmail.com</p>
                            </div>
                            <div className="user-button">
                                <button className="button-activate">Activar</button>
                                <button className="button-delete">Eliminar</button>
                            </div>
                        </div>

                        <div className="card-user">
                            <img src={fania} alt="" className="img-card-user"/>
                            <div className="user-info">
                                <h3 className="user-name">Stephania Herrera</h3>
                                <p className="user-email">niadqu1@gmail.com</p>
                            </div>
                            <div className="user-button">
                                <button className="button-activate">Activar</button>
                                <button className="button-delete">Eliminar</button>
                            </div>
                        </div>

                    </div>

                    <div className="fila-2">

                        <div className="card-user">
                            <img src={ladin} alt="" className="img-card-user"/>
                            <div className="user-info">
                                <h3 className="user-name">Edwin Quiceno</h3>
                                <p className="user-email">quicenin1489@gmail.com</p>
                            </div>
                            <div className="user-button">
                                <button className="button-activate">Activar</button>
                                <button className="button-delete">Eliminar</button>
                            </div>
                        </div>

                        <div className="card-user">
                            <img src={juanjo} alt="" className="img-card-user"/>
                            <div className="user-info">
                                <h3 className="user-name">Juan Jose Osorio</h3>
                                <p className="user-email">osoriojuanjoñp88@gmail.com</p>
                            </div>
                            <div className="user-button">
                                <button className="button-activate">Activar</button>
                                <button className="button-delete">Eliminar</button>
                            </div>
                        </div>

                        <div className="card-user">
                            <img src={pinqui} alt="" className="img-card-user"/>
                            <div className="user-info">
                                <h3 className="user-name">Breyner Ladino</h3>
                                <p className="user-email">ladinladinchica@gmail.com</p>
                            </div>
                            <div className="user-button">
                                <button className="button-activate">Activar</button>
                                <button className="button-delete">Eliminar</button>
                            </div>
                        </div>

                    </div>


                </div>


          </div>
        </div>
    </>
  )
}
