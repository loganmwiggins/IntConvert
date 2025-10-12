import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

import '../stylesheets/ss-components/Header.css';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuWrapRef = useRef(null);

    // Use app-wide theme context
    const { theme, setTheme } = useTheme();

    // Close on outside click
    useEffect(() => {
        const onDocClick = (e) => {
            if (!isMenuOpen) return;
            if (menuWrapRef.current && !menuWrapRef.current.contains(e.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, [isMenuOpen]);

    // Close on Escape
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') setIsMenuOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    const handleHomeClick = () => {
        if (!location.pathname.startsWith("/home")) {
            navigate("/home");
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

    const pageTitle =
        location.pathname.startsWith("/settings") ? "Settings" :
        location.pathname.startsWith("/info") ? "Information" :
        "IntConvert";

    const isConvertPage = location.pathname === "/home";
    const isInfoPage = location.pathname.startsWith("/info");

    return (
        <div className="header">
            <div className="header-title">
                <motion.img 
                    src="/assets/icons/logo-v2.png"
                    alt="IntConvert logo"
                    draggable="false" 
                    onClick={() => { handleHomeClick(); setIsMenuOpen(false); }}
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
                {/* Moved these into the menu popover:
                <motion.button className="btn-icon" onClick={handleHomeClick} whileTap={{ scale: 0.9 }}>
                    <img src="/assets/icons/calculator.svg" className="icon-dynamic" draggable="false" />
                </motion.button>
                <motion.button className="btn-icon" onClick={handleInfoClick} whileTap={{ scale: 0.9 }}>
                    <img src="/assets/icons/info.svg" className="icon-dynamic" draggable="false" />
                </motion.button>
                <motion.button className="btn-icon" onClick={handleSettingsClick} whileTap={{ scale: 0.9 }}>
                    <img src="/assets/icons/settings-sliders.svg" className="icon-dynamic" draggable="false" />
                </motion.button>
                */}
                <div className="header-menu-wrap" ref={menuWrapRef}>
                    {/* Menu button */}
                    <motion.button
                        className="btn-icon"
                        whileTap={{ scale: 0.9 }}
                        aria-haspopup="menu"
                        aria-expanded={isMenuOpen}
                        aria-label="Open menu"
                        onClick={() => setIsMenuOpen((v) => !v)}
                    >
                        <img src="/assets/icons/menu-burger.svg" className="icon-dynamic" draggable="false" />
                    </motion.button>

                    {/* Menu popup */}
                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                className="header-menu"
                                role="menu"
                                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                                transition={{ duration: 0.15, ease: "easeOut" }}
                            >
                                <button
                                    className={`menu-item ${isConvertPage ? 'is-active' : ''}`}
                                    role="menuitem"
                                    aria-current={isConvertPage ? 'page' : undefined}
                                    onClick={() => { handleHomeClick(); setIsMenuOpen(false); }}
                                >
                                    <img src="/assets/icons/calculator.svg" className="icon-dynamic" alt="" aria-hidden="true" />
                                    <span>Convert</span>
                                </button>

                                <button
                                    className={`menu-item ${isInfoPage ? 'is-active' : ''}`}
                                    role="menuitem"
                                    aria-current={isInfoPage ? 'page' : undefined}
                                    onClick={() => { handleInfoClick(); setIsMenuOpen(false); }}
                                >
                                    <img src="/assets/icons/info.svg" className="icon-dynamic" alt="" aria-hidden="true" />
                                    <span>Information</span>
                                </button>

                                <div className="menu-separator" />

                                <label className="menu-item menu-toggle" role="menuitem" aria-label="Toggle dark mode">
                                    <span>Dark mode</span>
                                    <input
                                        type="checkbox"
                                        checked={theme === 'dark'}
                                        onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
                                    />
                                    <div className="toggle" aria-hidden="true">
                                        <div className="knob" />
                                    </div>
                                </label>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default Header;