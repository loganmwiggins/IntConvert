import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

import '../stylesheets/ss-components/Header.css';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleCalcClick = () => {
        if (!location.pathname.includes('/home') && location.pathname !== '/') {
            navigate('/');
        }
    };

    const handleSettingsClick = () => {
        if (!location.pathname.includes('/settings')) {
            navigate('/settings');
        }
    };

    const handleInfoClick = () => {
        if (!location.pathname.includes('/info')) {
            navigate('/info');
        }
    };

    return (
        <div className="header">
            <motion.div className="header-title">
                <img src="/assets/icons/logo-v2.png" draggable="false" />
                <h2>IntConvert</h2>
            </motion.div>
            <div className="header-btns">
                <motion.button className="btn-icon" onClick={handleCalcClick} whileTap={{ scale: 0.9 }}>
                    <img src="/assets/icons/calculator.svg" draggable="false" />
                </motion.button>
                <motion.button className="btn-icon" onClick={handleSettingsClick} whileTap={{ scale: 0.9 }}>
                    <img src="/assets/icons/settings-sliders.svg" draggable="false" />
                </motion.button>
                <motion.button className="btn-icon" onClick={handleInfoClick} whileTap={{ scale: 0.9 }}>
                    <img src="/assets/icons/info.svg" draggable="false" />
                </motion.button>
            </div>
        </div>
    );
}

export default Header;