import React from 'react';
import { motion } from 'framer-motion';

import Card from '../components/Card';
import '../stylesheets/Info.css';

function Info() {
    return (
        <div className="page-wrapper">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: "easeInOut", delay: 0 }}
            >
                <Card header="App Information" canCollapse={false}>
                    <p>
                        IntConvert was developed with the goal of creating a simple, intuitive, and well-designed application for converting integers with different bases. As a result, with this app, users are able to easily make accurate conversions between the binary, octal, decimal, and hexadecimal number systems.
                    </p>  
                </Card>
            </motion.div>
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
            >
                <Card header="App Version" canCollapse={false}>
                    <p>Version 2.0.0</p>
                </Card>
            </motion.div>
        </div>
    );
}

export default Info;