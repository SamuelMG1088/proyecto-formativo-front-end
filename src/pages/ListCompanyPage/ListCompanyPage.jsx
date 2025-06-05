import React from 'react';
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import NavBar from '../../layout/NavBar/NavBar.jsx';

const ViewProfile = () => {
    return (
        <div id="ListCompanyPage">
            <div className="PageListCompany">
                <Gov />
                <HeaderIcons />
                <NavBar />
                <div className="img-header"></div>
                <section className="info-list-company-section">
                    <div className="content-list-company-section">
                        <h1>Lista de Empresas</h1>
                        {/* Aquí puedes agregar el contenido de la lista de empresas */}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default ViewProfile;