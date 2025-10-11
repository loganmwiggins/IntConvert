import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import BaseDropdown from './BaseDropdown';
import {
    binToDec, octToDec, hexToDec,
    decToBin, decToOct, decToHex,
    binToOct, binToHex,
    octToBin, octToHex,
    hexToBin, hexToOct
} from '../utils/baseConversions';
import { baseName, getBaseRegex } from '../utils/baseUtils';
import { setAboutFromTo, getOtherResults } from '../utils/conversionUtils';
import '../stylesheets/ss-components/ConversionSection.css';

function ConversionSection({ onConvert, onClear }) {
    const [fromBase, setFromBase] = useState(null);
    const [toBase, setToBase] = useState(null);
    const [fromValue, setFromValue] = useState("");
    const [inputError, setInputError] = useState(null);

    // If both end up the same, clear the "to" side
    useEffect(() => {
        if (fromBase && toBase && fromBase === toBase) {
            setToBase(null);
        }
    }, [fromBase, toBase]);

    const handleInputChange = (e) => {
        const val = e.target.value.toUpperCase();
        const regex = getBaseRegex(fromBase);
        
        if (regex.test(val)) {
            setFromValue(val);
            setInputError(null);
        } else {
            setInputError("Invalid character for selected base.");
        }
    };

    const runConvert = () => {
        if (!fromBase || !toBase || fromValue === "" || fromValue == null) return;

        const regex = getBaseRegex(fromBase);
        if (!regex.test(fromValue)) {
            setInputError("Input contains invalid characters for the selected base.");
            return;
        }
        setInputError(null);

        const from = baseName(fromBase);
        const to = baseName(toBase);

        let out = "";
        let calcHtml = "";
        let desc = "";

        const setCalculationHtml = (html) => { calcHtml = html; };
        const setDescriptionLocal = (html) => { desc = html; };
        const run = (f, ...args) => f(...args, setCalculationHtml);

        if (from === "Binary" && to === "Decimal") out = run(binToDec, fromValue);
        else if (from === "Octal" && to === "Decimal") out = run(octToDec, fromValue);
        else if (from === "Hexadecimal" && to === "Decimal") out = run(hexToDec, fromValue);

        else if (from === "Decimal" && to === "Binary") out = run(decToBin, fromValue);
        else if (from === "Decimal" && to === "Octal") out = run(decToOct, fromValue);
        else if (from === "Decimal" && to === "Hexadecimal") out = run(decToHex, fromValue);

        else if (from === "Binary" && to === "Octal") out = run(binToOct, fromValue);
        else if (from === "Binary" && to === "Hexadecimal") out = run(binToHex, fromValue);
        else if (from === "Octal" && to === "Binary") out = run(octToBin, fromValue);
        else if (from === "Hexadecimal" && to === "Binary") out = run(hexToBin, fromValue);
        else if (from === "Octal" && to === "Hexadecimal") out = run(octToHex, fromValue);
        else if (from === "Hexadecimal" && to === "Octal") out = run(hexToOct, fromValue);
        else out = String(fromValue);

        setAboutFromTo(from, to, setDescriptionLocal);
        const [o1, o2] = getOtherResults(from, to, fromValue);

        onConvert?.({
            result: out,
            resultFromBase: fromBase,
            resultToBase: toBase,
            resultFromValue: fromValue,
            calculationHtml: calcHtml,
            description: desc,
            otherResult1: o1.value,
            otherResult2: o2.value,
            otherResult1Label: o1.label,
            otherResult2Label: o2.label,
        });
    };

    const handleClear = () => {
        setFromBase(null);
        setToBase(null);
        setFromValue("");
        setInputError(null);
    };

    const handleSwap = () => {
        setToBase(fromBase);
        setFromBase(toBase);
        setFromValue("");
        setInputError(null);
    };

    return (
        <section className="conversion-section">
            <div className="card">
                <div className="input-ctnr">
                    <div className="input-row">
                        <div className="labeled-input">
                            <p>Convert from</p>
                            <BaseDropdown
                                value={fromBase}
                                onSelect={setFromBase}
                                exclude={toBase}
                                onClear={() => setFromBase(null)}
                            />
                        </div>
                        <div className="labeled-input">
                            <p>Convert to</p>
                            <BaseDropdown
                                value={toBase}
                                onSelect={setToBase}
                                exclude={fromBase}
                                onClear={() => setToBase(null)}
                            />
                        </div>
                    </div>

                    <div className="labeled-input" style={{ position: "relative" }}>
                        <p>Enter value</p>
                        <input
                            type="text"
                            value={fromValue ?? ""}
                            onChange={handleInputChange}
                            disabled={!fromBase || !toBase}
                            style={{ paddingRight: "2.5rem" }}
                            onKeyDown={e => {
                                if (
                                    e.key === "Enter" &&
                                    fromBase &&
                                    toBase &&
                                    fromValue &&
                                    !inputError
                                ) {
                                    runConvert();
                                }
                            }}
                        />
                        {fromValue && (
                            <button
                                type="button"
                                className="input-clear-btn"
                                onClick={() => setFromValue("")}
                                tabIndex={-1}
                                aria-label="Clear input"
                            >
                                <img src="/assets/icons/cross-small.svg" draggable="false" />
                            </button>
                        )}
                        <AnimatePresence>
                            {inputError && (
                                <motion.label 
                                    className="error"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                >
                                    {inputError}
                                </motion.label>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="button-row">
                        <button 
                            className="btn-secondary"
                            style={{ flex: 1 }}
                            onClick={handleClear}
                            disabled={!fromBase && !toBase}
                        >
                            <img src="/assets/icons/eraser.svg" draggable="false" />
                            <span>Clear</span>
                        </button>
                        <button 
                            className="btn-secondary"
                            style={{ flex: 1 }}
                            onClick={handleSwap}
                            disabled={!fromBase && !toBase}
                        >
                            <img src="/assets/icons/shuffle.svg" draggable="false" />
                            <span>Swap</span>
                        </button>
                        <button 
                            className="btn-primary"
                            style={{ flex: 1 }}
                            disabled={
                                !fromBase ||
                                !toBase ||
                                !fromValue ||
                                !!inputError
                            }
                            onClick={runConvert}
                        >
                            <img src="/assets/icons/arrow-turn-down-right.svg" draggable="false" />
                            <span>Convert</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ConversionSection;