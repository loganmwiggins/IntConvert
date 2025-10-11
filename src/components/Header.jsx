import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

import '../stylesheets/ss-components/Header.css';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleHomeClick = () => {
        if (!location.pathname.includes("/home") && location.pathname !== "/") {
            navigate("/");
        }
    };

    const handleSettingsClick = () => {
        if (!location.pathname.includes("/settings")) {
            navigate("/settings");
        }
    };

    const handleInfoClick = () => {
        if (!location.pathname.includes("/info")) {
            navigate("/info");
        }
    };

    // Derive what to show in the header
    const pageTitle =
        location.pathname.startsWith("/settings") ? "Settings" :
        location.pathname.startsWith("/info") ? "Information" :
        "IntConvert";

    return (
        <div className="header">
            <div className="header-title">
                <motion.img 
                    src="/assets/icons/logo-v2.png" 
                    draggable="false" 
                    onClick={handleHomeClick}
                    whileTap={{ scale: 0.9 }}
                />
                <motion.h2
                    key={pageTitle}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    {pageTitle}
                </motion.h2>
            </div>
            <div className="header-btns">
                <motion.button className="btn-icon" onClick={handleHomeClick} whileTap={{ scale: 0.9 }}>
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