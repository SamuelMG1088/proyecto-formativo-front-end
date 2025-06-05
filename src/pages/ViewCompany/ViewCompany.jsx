import React from 'react'
import Gov from '../../layout/Gov/Gov.jsx';
import HeaderIcons from '../../layout/HeaderIcons/HeaderIcons.jsx';
import NavBar from '../../layout/NavBar/NavBar.jsx';

const ViewCompany = () => {
  return (
    <>
        <div id="ViewCompanyPage">
            <div className="PageViewCompany">
                <Gov />
                <HeaderIcons />
                <NavBar />
            </div>
        </div>
    </>
  );
}

export default ViewCompany;