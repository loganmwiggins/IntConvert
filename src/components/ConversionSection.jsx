import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import BaseDropdown from './BaseDropdown';
import {
    binToDec, octToDec, hexToDec,
    decToBin, decToOct, decToHex,
    binToOct, binToHex,
    octToBin, octToHex,
    hexToBin, hexToOct
} from '../utils/conversions';
import { labelMap, baseName, getBaseRegex } from '../utils/baseUtils';
import '../stylesheets/ss-components/ConversionSection.css';

function setAboutFromTo(from, to, setDescription) {
    if (from === "Binary" && to === "Decimal") {
        setDescription(
            "For binary number, b,  with n digits:<br> b<sub>n-1</sub> ... b<sub>3</sub> b<sub>2</sub> b<sub>1</sub> b<sub>0</sub><br><br> The decimal number is equal to the sum of binary digits (b<sub>n</sub>) times their power of 2 (2<sup>n</sup>):<br> Result<sub>(dec)</sub> = (b<sub>0</sub> * 2<sup>0</sup>) + (b<sub>1</sub> * 2<sup>1</sup>) + (b<sub>2</sub> * 2<sup>2</sup>) + ..."
        );
    } else if (from === "Octal" && to === "Decimal") {
        setDescription(
            "For octal number, c,  with n digits:<br> c<sub>n-1</sub> ... c<sub>3</sub> c<sub>2</sub> c<sub>1</sub> c<sub>0</sub><br><br> Multiply each digit of the octal number with its corresponding power of 8 and sum:<br> Result<sub>(dec)</sub> = (c<sub>n-1</sub> * 8<sup>n-1</sup>) + ... + (c<sub>3</sub> * 8<sup>3</sup>) + (c<sub>2</sub> * 8<sup>2</sup>) + (c<sub>1</sub> * 8<sup>1</sup>) + (c<sub>0</sub> * 8<sup>0</sup>)"
        );
    } else if (from === "Hexadecimal" && to === "Decimal") {
        setDescription(
            "For hexadecimal number, h,  with n digits:<br> h<sub>n-1</sub> ... h<sub>3</sub> h<sub>2</sub> h<sub>1</sub> h<sub>0</sub><br><br> Multiply each digit of the hex number with its corresponding power of 16 and sum:<br> Result<sub>(dec)</sub> = (h<sub>n-1</sub> * 16<sup>n-1</sup>) + ... + (h<sub>3</sub> * 16<sup>3</sup>) + (h<sub>2</sub> * 16<sup>2</sup>) + (h<sub>1</sub> * 16<sup>1</sup>) + (h<sub>0</sub> * 16<sup>0</sup>)"
        );
    } else if (from === "Decimal" && to === "Binary") {
        setDescription(
            "Divide the decimal number by the base 2 to get the binary digits from the remainders. Once you reach a quotient of zero, put the remainders together in reverse order to find your result."
        );
    } else if (from === "Decimal" && to === "Octal") {
        setDescription(
            "Divide the decimal number by the base 8 to get the octal digits from the remainders. Once you reach a quotient of zero, put the remainders together in reverse order to find your result."
        );
    } else if (from === "Decimal" && to === "Hexadecimal") {
        setDescription(
            "Divide the decimal number by the base 16 to get the hexadecimal digits from the remainders. Once you reach a quotient of zero, put the remainders together in reverse order to find your result.<br><br> Be sure to convert any remainders with a value of 10-15 with their corresponding hex letters, A-F."
        );
    } else if (from === "Binary" && to === "Octal") {
        setDescription(
            "Convert every 3 binary digits (start from bit 0) to 1 octal digit, with this table:<br><table class='about-table'><tr><td>Binary<sub>(2)</sub></td><td>Octal<sub>(8)</sub></td></tr><tr><td>000</td><td>0</td></tr><tr><td>001</td><td>1</td></tr><tr><td>010</td><td>2</td></tr><tr><td>011</td><td>3</td></tr><tr><td>100</td><td>4</td></tr><tr><td>101</td><td>5</td></tr><tr><td>110</td><td>6</td></tr><tr><td>111</td><td>7</td></tr></table>"
        );
    } else if (from === "Binary" && to === "Hexadecimal") {
        setDescription(
            "Convert every 4 binary digits (start from bit 0) to 1 hexadecimal digit, with this table:<br><table class='about-table'><tr><td>Binary<sub>(2)</sub></td><td>Hex<sub>(16)</sub></td></tr><tr><td>0000</td><td>0</td></tr><tr><td>0001</td><td>1</td></tr><tr><td>0010</td><td>2</td></tr><tr><td>0011</td><td>3</td></tr><tr><td>0100</td><td>4</td></tr><tr><td>0101</td><td>5</td></tr><tr><td>0110</td><td>6</td></tr><tr><td>0111</td><td>7</td></tr><tr><td>1000</td><td>8</td></tr><tr><td>1001</td><td>9</td></tr><tr><td>1010</td><td>A</td></tr><tr><td>1011</td><td>B</td></tr><tr><td>1100</td><td>C</td></tr><tr><td>1101</td><td>D</td></tr><tr><td>1110</td><td>E</td></tr><tr><td>1111</td><td>F</td></tr></table>"
        );
    } else if (from === "Octal" && to === "Binary") {
        setDescription(
            "Convert every octal digit (start with lowest digit) to 3 binary digits, with this table:<br><table class='about-table'><tr><td>Octal<sub>(8)</sub></td><td>Binary<sub>(2)</sub></td></tr><tr><td>0</td><td>000</td></tr><tr><td>1</td><td>001</td></tr><tr><td>2</td><td>010</td></tr><tr><td>3</td><td>011</td></tr><tr><td>4</td><td>100</td></tr><tr><td>5</td><td>101</td></tr><tr><td>6</td><td>110</td></tr><tr><td>7</td><td>111</td></tr></table>"
        );
    } else if (from === "Hexadecimal" && to === "Binary") {
        setDescription(
            "Convert every hex digit (start with lowest digit) to 4 binary digits, with this table:<br><table class='about-table'><tr><td>Hex<sub>(16)</sub></td><td>Binary<sub>(2)</sub></td></tr><tr><td>0</td><td>0000</td></tr><tr><td>1</td><td>0001</td></tr><tr><td>2</td><td>0010</td></tr><tr><td>3</td><td>0011</td></tr><tr><td>4</td><td>0100</td></tr><tr><td>5</td><td>0101</td></tr><tr><td>6</td><td>0110</td></tr><tr><td>7</td><td>0111</td></tr><tr><td>8</td><td>1000</td></tr><tr><td>9</td><td>1001</td></tr><tr><td>A</td><td>1010</td></tr><tr><td>B</td><td>1011</td></tr><tr><td>C</td><td>1100</td></tr><tr><td>D</td><td>1101</td></tr><tr><td>E</td><td>1110</td></tr><tr><td>F</td><td>1111</td></tr></table>"
        );
    } else if (from === "Octal" && to === "Hexadecimal") {
        setDescription(
            "Convert every octal digit to 3 binary digits, then convert every 4 binary digits to 1 hex digit (see conversion tables below).<br><br>Convert every octal digit to 3 binary digits, with this table:<br><table class='about-table'><tr><td>Octal<sub>(8)</sub></td><td>Binary<sub>(2)</sub></td></tr><tr><td>0</td><td>000</td></tr><tr><td>1</td><td>001</td></tr><tr><td>2</td><td>010</td></tr><tr><td>3</td><td>011</td></tr><tr><td>4</td><td>100</td></tr><tr><td>5</td><td>101</td></tr><tr><td>6</td><td>0110</td></tr><tr><td>7</td><td>111</td></tr></table><br>Then convert every 4 binary digits (from bit 0) to 1 hex digit, with this table:<br><table class='about-table'><tr><td>Binary<sub>(2)</sub></td><td>Hex<sub>(16)</sub></td></tr><tr><td>0000</td><td>0</td></tr><tr><td>0001</td><td>1</td></tr><tr><td>0010</td><td>2</td></tr><tr><td>0011</td><td>3</td></tr><tr><td>0100</td><td>4</td></tr><tr><td>0101</td><td>5</td></tr><tr><td>0110</td><td>6</td></tr><tr><td>0111</td><td>7</td></tr><tr><td>1000</td><td>8</td></tr><tr><td>1001</td><td>9</td></tr><tr><td>1010</td><td>A</td></tr><tr><td>1011</td><td>B</td></tr><tr><td>1100</td><td>C</td></tr><tr><td>1101</td><td>D</td></tr><tr><td>1110</td><td>E</td></tr><tr><td>1111</td><td>F</td></tr></table>"
        );
    } else if (from === "Hexadecimal" && to === "Octal") {
        setDescription(
            "Convert each hex digit to 4 binary digits and then convert each 3 binary digits to octal digits (see conversion tables below).<br><br>Convert every hex digit (start with lowest digit) to 4 binary digits, with this table:<br><table class='about-table'><tr><td>Hex<sub>(16)</sub></td><td>Binary<sub>(2)</sub></td></tr><tr><td>0</td><td>0000</td></tr><tr><td>1</td><td>0001</td></tr><tr><td>2</td><td>0010</td></tr><tr><td>3</td><td>0011</td></tr><tr><td>4</td><td>0100</td></tr><tr><td>5</td><td>0101</td></tr><tr><td>6</td><td>0110</td></tr><tr><td>7</td><td>0111</td></tr><tr><td>8</td><td>1000</td></tr><tr><td>9</td><td>1001</td></tr><tr><td>A</td><td>1010</td></tr><tr><td>B</td><td>1011</td></tr><tr><td>C</td><td>1100</td></tr><tr><td>D</td><td>1101</td></tr><tr><td>E</td><td>1110</td></tr><tr><td>F</td><td>1111</td></tr></table><br>Then convert every 3 binary digits (from bit 0) to 1 octal digit, with this table:<br><table class='about-table'><tr><td>Binary<sub>(2)</sub></td><td>Octal<sub>(8)</sub></td></tr><tr><td>000</td><td>0</td></tr><tr><td>001</td><td>1</td></tr><tr><td>010</td><td>2</td></tr><tr><td>011</td><td>3</td></tr><tr><td>100</td><td>4</td></tr><tr><td>101</td><td>5</td></tr><tr><td>110</td><td>6</td></tr><tr><td>111</td><td>7</td></tr></table>"
        );
    } else {
        setDescription("");
    }
}

function getOtherResults(from, to, value) {
    const run = (f, ...args) => f(...args, () => {});
    if (from === "Binary" && to === "Decimal") return [
        { label: "Octal",       value: run(binToOct, value) },
        { label: "Hexadecimal", value: run(binToHex, value) }
    ];
    if (from === "Octal" && to === "Decimal") return [
        { label: "Binary",      value: run(octToBin, value) },
        { label: "Hexadecimal", value: run(octToHex, value) }
    ];
    if (from === "Hexadecimal" && to === "Decimal") return [
        { label: "Binary", value: run(hexToBin, value) },
        { label: "Octal",  value: run(hexToOct, value) }
    ];

    if (from === "Decimal" && to === "Binary") return [
        { label: "Octal",       value: run(decToOct, value) },
        { label: "Hexadecimal", value: run(decToHex, value) }
    ];
    if (from === "Decimal" && to === "Octal") return [
        { label: "Binary",      value: run(decToBin, value) },
        { label: "Hexadecimal", value: run(decToHex, value) }
    ];
    if (from === "Decimal" && to === "Hexadecimal") return [
        { label: "Binary", value: run(decToBin, value) },
        { label: "Octal",  value: run(decToOct, value) }
    ];

    if (from === "Binary" && to === "Octal") return [
        { label: "Decimal",     value: run(binToDec, value) },
        { label: "Hexadecimal", value: run(binToHex, value) }
    ];
    if (from === "Binary" && to === "Hexadecimal") return [
        { label: "Octal",   value: run(binToOct, value) },
        { label: "Decimal", value: run(binToDec, value) }
    ];
    if (from === "Octal" && to === "Binary") return [
        { label: "Decimal",     value: run(octToDec, value) },
        { label: "Hexadecimal", value: run(octToHex, value) }
    ];
    if (from === "Hexadecimal" && to === "Binary") return [
        { label: "Octal",   value: run(hexToOct, value) },
        { label: "Decimal", value: run(hexToDec, value) }
    ];
    if (from === "Octal" && to === "Hexadecimal") return [
        { label: "Binary",  value: run(octToBin, value) },
        { label: "Decimal", value: run(octToDec, value) }
    ];
    if (from === "Hexadecimal" && to === "Octal") return [
        { label: "Binary",  value: run(hexToBin, value) },
        { label: "Decimal", value: run(hexToDec, value) }
    ];

    return [
        { label: baseName(from), value: String(value) },
        { label: baseName(from), value: String(value) }
    ];
}

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