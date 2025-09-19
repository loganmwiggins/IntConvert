import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import '../stylesheets/ss-components/Layout.css';
import Header from './Header';

function Layout() {
    const location = useLocation();

    return (
        <div className="layout-wrapper">
            {/* <video autoPlay muted loop className="bg-video">
                <source src="assets/background-6_12mb.mp4" type="video/mp4" />
            </video> */}

            <div className="app-container">
                <div className="app-window">
                    <Header />
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Layout;