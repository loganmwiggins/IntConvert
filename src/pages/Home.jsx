import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import ConversionSection from '../components/ConversionSection';
import CalculationSection from '../components/CalculationSection';
import '../stylesheets/Home.css';

function Home() {
    const [result, setResult] = useState(null);
    const [resultFromBase, setResultFromBase] = useState(null);
    const [resultToBase, setResultToBase] = useState(null);
    const [resultFromValue, setResultFromValue] = useState(null);
    const [calculationHtml, setCalculationHtml] = useState(null);
    const [description, setDescription] = useState(null);
    const [otherResult1, setOtherResult1] = useState(null);
    const [otherResult2, setOtherResult2] = useState(null);
    const [otherResult1Label, setOtherResult1Label] = useState(null);
    const [otherResult2Label, setOtherResult2Label] = useState(null);
    const [showCalcSection, setShowCalcSection] = useState(true);

    const handleConverted = (payload) => {
        setShowCalcSection(true);
        setResult(payload.result);
        setResultFromBase(payload.resultFromBase);
        setResultToBase(payload.resultToBase);
        setResultFromValue(payload.resultFromValue);
        setCalculationHtml(payload.calculationHtml);
        setDescription(payload.description);
        setOtherResult1(payload.otherResult1);
        setOtherResult2(payload.otherResult2);
        setOtherResult1Label(payload.otherResult1Label);
        setOtherResult2Label(payload.otherResult2Label);
    };

    const handleClearResults = () => {
        setResult(null);
        setCalculationHtml(null);
        setDescription(null);
        setOtherResult1(null);
        setOtherResult2(null);
        setOtherResult1Label(null);
        setOtherResult2Label(null);
        setResultFromBase(null);
        setResultToBase(null);
        setResultFromValue(null);
    };
    
    const toggleCalcSection = () => {
        setShowCalcSection((prev) => !prev);
    };

    return (
        <div className="page-wrapper">
            <div className="home-layout">
                <ConversionSection 
                    onConvert={handleConverted}
                    onClear={handleClearResults}
                />

                <AnimatePresence>
                    {result && (
                        <div className="menu-btn-ctnr">
                            <motion.button 
                                type="button"
                                className="btn-menu"
                                title={showCalcSection ? "Hide Results" : "Show Results"}
                                onClick={toggleCalcSection}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <img src="/assets/icons/bars-staggered.svg" draggable="false" />
                            </motion.button>
                            <motion.button 
                                type="button"
                                className="btn-menu"
                                title="Clear Results"
                                onClick={handleClearResults}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <img src="/assets/icons/cross-small.svg" draggable="false" />
                            </motion.button>
                        </div>
                        
                    )}
                </AnimatePresence>

                <CalculationSection
                    result={result}
                    resultFromBase={resultFromBase}
                    resultToBase={resultToBase}
                    resultFromValue={resultFromValue}
                    calculationHtml={calculationHtml}
                    description={description}
                    otherResult1={otherResult1}
                    otherResult2={otherResult2}
                    otherResult1Label={otherResult1Label}
                    otherResult2Label={otherResult2Label}
                    showCalcSection={showCalcSection}
                />
            </div>
        </div>
    );
}

export default Home;