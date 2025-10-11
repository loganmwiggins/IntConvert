import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import ConversionSection from '../components/ConversionSection';
import CalculationSection from '../components/CalculationSection';
import Card from '../components/Card';
import '../stylesheets/Home.css';

// ---------------------------
// Labels used for rendering
// ---------------------------
const labelMap = {
    bin: "Binary",
    oct: "Octal",
    dec: "Decimal",
    hex: "Hexadecimal",
};

// ---------------------------
// Component
// ---------------------------
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

    const handleConverted = (payload) => {
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

    return (
        <div className="page-wrapper">
            <div className="home-layout">
                {/* CONVERSION SECTION */}
                <ConversionSection 
                    onConvert={handleConverted}
                    onClear={handleClearResults}
                />

                {/* CALCULATION SECTION */}
                <AnimatePresence>
                    {result && (
                        <motion.section 
                            className="calculation-section"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            {/* Result card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
                            >
                                <Card 
                                    key={`${resultFromValue}-${result}-${resultFromBase}-${resultToBase}`}
                                    header="Result"
                                >
                                    <div className="results-row">
                                        <div className="labeled-result">
                                            <AnimatePresence mode="wait">
                                                <motion.h1
                                                    key={resultFromValue}
                                                    initial={{ opacity: 0, y: 30 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 30 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
                                                >
                                                    {resultFromValue}
                                                </motion.h1>
                                                <motion.label 
                                                    className="label-colored"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
                                                >
                                                    {resultFromBase ? labelMap[resultFromBase] : ""}
                                                </motion.label>
                                            </AnimatePresence>
                                        </div>
                                        <div>
                                            <AnimatePresence mode="wait">
                                                <motion.h1
                                                    key={result}
                                                    initial={{ opacity: 0, x: -40 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -40 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
                                                >
                                                    →
                                                </motion.h1>
                                            </AnimatePresence>
                                        </div>
                                        <div className="labeled-result">
                                            <AnimatePresence mode="wait">
                                                <motion.h1
                                                    key={result}
                                                    initial={{ opacity: 0, y: 30 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 30 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut", delay: 0.3 }}
                                                >
                                                    {result}
                                                </motion.h1>
                                                <motion.label 
                                                    className="label-colored"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut", delay: 0.3 }}
                                                >
                                                    {resultToBase ? labelMap[resultToBase] : ""}
                                                </motion.label>
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>

                            {/* Formula card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
                            >
                                <Card 
                                    key={`${resultFromValue}-${result}-${resultFromBase}-${resultToBase}`}
                                    header="Formula"
                                >
                                    <p dangerouslySetInnerHTML={{ __html: calculationHtml || "" }} />
                                </Card>
                            </motion.div>
                            
                            {/* Explained card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3, ease: "easeInOut", delay: 0.3 }}
                            >
                                <Card 
                                    key={`${resultFromValue}-${result}-${resultFromBase}-${resultToBase}`}
                                    header="Explained"
                                >
                                    <p dangerouslySetInnerHTML={{ __html: description || "" }} />
                                </Card>
                            </motion.div>

                            {/* Other Results card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3, ease: "easeInOut", delay: 0.4 }}
                            >
                                <Card 
                                    key={`${resultFromValue}-${result}-${resultFromBase}-${resultToBase}`}
                                    header="Other Results"
                                >
                                    <div className="results-row">
                                        <div className="labeled-result">
                                            <AnimatePresence mode="wait">
                                                <motion.h1
                                                    initial={{ opacity: 0, y: 30 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 30 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
                                                >
                                                    {otherResult1}
                                                </motion.h1>
                                                <motion.label 
                                                    className="label-colored"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
                                                >
                                                    {otherResult1Label ? otherResult1Label : ""}
                                                </motion.label>
                                            </AnimatePresence>
                                        </div>
                                        <div className="labeled-result">
                                            <AnimatePresence mode="wait">
                                                <motion.h1
                                                    initial={{ opacity: 0, y: 30 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 30 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
                                                >
                                                    {otherResult2}
                                                </motion.h1>
                                                <motion.label 
                                                    className="label-colored"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
                                                >
                                                    {otherResult2Label ? otherResult2Label : ""}
                                                </motion.label>
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </motion.section>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default Home;