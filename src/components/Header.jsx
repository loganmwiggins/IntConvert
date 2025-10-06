import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

import '../stylesheets/ss-components/Header.css';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleTitleClick = () => {
        if (!location.pathname.includes('/home') && location.pathname !== '/') {
            navigate('/');
        }
    };

    const handleInfoClick = () => {
        if (!location.pathname.includes('/info')) {
            navigate('/info');
        }
    };

    return (
        <div className="header">
            <motion.div
                className="header-title"
                onClick={handleTitleClick}
                whileTap={{ scale: 0.9 }}
            >
                <img src="/assets/icons/logo-v2.png" draggable="false" />
                <h2>IntConvert</h2>
            </motion.div>
            <div className="header-btns">
                <motion.button className="btn-icon" onClick={handleInfoClick} whileTap={{ scale: 0.9 }}>
                    <img src="/assets/icons/info.svg" draggable="false" />
                </motion.button>
            </div>
        </div>
    );
}

export default Header;