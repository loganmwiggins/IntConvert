import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../stylesheets/ss-components/Header.css';

function Header() {
    const navigate = useNavigate();
    return (
        <div className="header">
            <div className="header-title">
                <img src="/assets/icons/logo-v2.png" draggable="false" />
                <h2>IntConvert</h2>
            </div>
            <div className="header-btns">
                <button className="btn-icon" onClick={() => navigate('/info')}>
                    <img src="/assets/icons/info.svg" draggable="false" />
                </button>
            </div>
        </div>
    );
}

export default Header;