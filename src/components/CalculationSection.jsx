import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Card from './Card';
import { labelMap } from '../utils/baseUtils';
import '../stylesheets/ss-components/CalculationSection.css';

function CalculationSection({
    result,
    resultFromBase,
    resultToBase,
    resultFromValue,
    calculationHtml,
    description,
    otherResult1,
    otherResult2,
    otherResult1Label,
    otherResult2Label,
}) {
    return (
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
    );
}

export default CalculationSection;