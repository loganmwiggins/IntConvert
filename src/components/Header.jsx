import React from 'react';

import '../stylesheets/ss-components/Header.css';

function Header() {
    return (
        <div className="header">
            <div className="header-title">
                <img src="/assets/icons/logo-v2.png" draggable="false" />
                <h2>IntConvert</h2>
            </div>
        </div>
    );
}

export default Header;