import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../stylesheets/ss-components/Card.css';

function Card({ header, children }) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="card">
            <div className="card-header" onClick={() => setCollapsed(c => !c)}>
                <p className="p-600">{header}</p>
                <motion.button
                    className="btn-icon"
                    aria-label={collapsed ? "Expand" : "Collapse"}
                    title={collapsed ? "Expand" : "Collapse"}
                >
                    <motion.img
                        src="/assets/icons/angle-small-down.svg"
                        draggable="false"
                        animate={{ rotate: collapsed ? 0 : 180 }}
                        transition={{ duration: 0.25 }}
                    />
                </motion.button>
            </div>

            <AnimatePresence initial={false}>
                {!collapsed && (
                    <motion.div
                        key="card-content"
                        className="card-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Card;