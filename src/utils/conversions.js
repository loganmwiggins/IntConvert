// CORE CONVERSION LOGIC WITH CALCULATION STEPS
// Each function takes a number and a setCalculationHtml function to update the UI with steps

export function binToDec(num, setCalculationHtml) {
    let binNum = num;
    let binNumLength = binNum.toString().length;
    let decNum = 0;
    let formula = "";

    for (let i = 0; i < binNumLength; i++) {
        let currDigit = binNum % 10;
        decNum += currDigit * Math.pow(2, i);
        binNum = Math.floor(binNum / 10);

        if (i === parseInt(binNumLength) - 1) {
            formula = "(" + currDigit + " * 2<sup>" + i + "</sup>)" + formula;
        } 
        else {
            formula = " + (" + currDigit + " * 2<sup>" + i + "</sup>)" + formula;
        }
    }

    setCalculationHtml(formula + " = " + decNum);
    return String(decNum);
}

export function octToDec(num, setCalculationHtml) {
    let octNum = num;
    let octNumLength = octNum.toString().length;
    let decNum = 0;
    let formula = "";

    for (let i = 0; i < octNumLength; i++) {
        let currDigit = octNum % 10;
        decNum += currDigit * Math.pow(8, i);
        octNum = Math.floor(octNum / 10);

        if (i === parseInt(octNumLength) - 1) {
            formula = "(" + currDigit + " * 8<sup>" + i + "</sup>)" + formula;
        } else {
            formula = " + (" + currDigit + " * 8<sup>" + i + "</sup>)" + formula;
        }
    }

    setCalculationHtml(formula + " = " + decNum);
    return String(decNum);
}

export function hexToDec(num, setCalculationHtml) {
    let hexNum = num.toString();
    let hexNumLength = hexNum.length;
    let decNum = 0;
    let formula = "";

    for (let i = 0; i < hexNumLength; i++) {
        let currDigit = hexNum[hexNumLength - i - 1];

        switch (currDigit) {
        case "A":
        case "a":
            currDigit = 10; break;
        case "B":
        case "b":
            currDigit = 11; break;
        case "C":
        case "c":
            currDigit = 12; break;
        case "D":
        case "d":
            currDigit = 13; break;
        case "E":
        case "e":
            currDigit = 14; break;
        case "F":
        case "f":
            currDigit = 15; break;
        }
        decNum += currDigit * Math.pow(16, i);

        if (i === parseInt(hexNumLength) - 1) {
            formula = "(" + currDigit + " * 16<sup>" + i + "</sup>)" + formula;
        } else {
            formula = " + (" + currDigit + " * 16<sup>" + i + "</sup>)" + formula;
        }
    }

    setCalculationHtml(formula + " = " + decNum);
    return String(decNum);
}

export function decToBin(num, setCalculationHtml) {
    let decNum = Number(num);
    let formula = "";
    let res = "";

    while (decNum !== 0) {
        formula += decNum + "/2 = " + Math.floor(decNum / 2) + " <sub>R</sub>" + (decNum % 2) + "<br>";
        res = (decNum % 2) + res;
        decNum = Math.floor(decNum / 2);
    }

    setCalculationHtml(formula);
    return res || "0";
}

export function decToOct(num, setCalculationHtml) {
    let decNum = Number(num);
    let formula = "";
    let res = "";

    while (decNum !== 0) {
        formula += decNum + "/8 = " + Math.floor(decNum / 8) + " <sub>R</sub>" + (decNum % 8) + "<br>";
        res = (decNum % 8) + res;
        decNum = Math.floor(decNum / 8);
    }

    setCalculationHtml(formula);
    return res || "0";
}

export function decToHex(num, setCalculationHtml) {
    let decNum = Number(num);
    let formula = "";
    let res = "";

    while (decNum !== 0) {
        let hexDigit = decNum % 16;
        const map = { 10: "A", 11: "B", 12: "C", 13: "D", 14: "E", 15: "F" };
        const shown = map[hexDigit] || hexDigit;
        formula += decNum + "/16 = " + Math.floor(decNum / 16) + " <sub>R</sub>" + (decNum % 16) + (map[hexDigit] ? "(" + map[hexDigit] + ")" : "") + "<br>";
        res = (map[hexDigit] || String(hexDigit)) + res;
        decNum = Math.floor(decNum / 16);
    }

    setCalculationHtml(formula);
    return res || "0";
}

export function binToOct(num, setCalculationHtml) {
    let binNum = num;
    let binLen = binNum.toString().length;
    let currBlock = "";
    let formula = binNum.toString() + "<br>= ";
    let chunks = "";
    let res = parseInt(binNum, 2).toString(8);

    let currLength = binLen;
    for (let i = 0; i < binLen; i += 3) {
        if (currLength >= 3) {
            currBlock = binNum.toString().slice(currLength - 3, currLength);
            binNum = binNum.toString().slice(0, currLength - 3);
            currLength -= 3;
        } else {
            currBlock = binNum.toString().slice(0, currLength);
        }

        chunks = currBlock + " " + chunks;
    }

    formula += chunks + "<br>= ";
    for (let i = 0; i < res.length; i++) formula += res[i] + " ";
    formula += "<br>= " + res;

    setCalculationHtml(formula);
    return res;
}

export function binToHex(num, setCalculationHtml) {
    let binNum = num;
    let binLen = binNum.toString().length;
    let currBlock = "";
    let formula = binNum.toString() + "<br>= ";
    let chunks = "";
    let res = parseInt(binNum, 2).toString(16).toUpperCase();

    let currLength = binLen;
    for (let i = 0; i < binLen; i += 4) {
        if (currLength >= 4) {
            currBlock = binNum.toString().slice(currLength - 4, currLength);
            binNum = binNum.toString().slice(0, currLength - 4);
            currLength -= 4;
        } else {
            currBlock = binNum.toString().slice(0, currLength);
        }

        chunks = currBlock + " " + chunks;
    }

    formula += chunks + "<br>= ";
    for (let i = 0; i < res.length; i++) formula += res[i] + " ";
    formula += "<br>= " + res;

    setCalculationHtml(formula);
    return res;
}

export function octToBin(num, setCalculationHtml) {
    let octNum = num;
    let octLen = octNum.toString().length;
    let formula = "";
    let chunks = "";

    let res = octToDec(octNum, () => {}); // reuse steps but don’t overwrite calc
    res = decToBin(res, () => {});        // build res, then craft formula below

    formula += octNum + "<br>= ";
    for (let i = 0; i < octLen; i++) {
        let currDigit = octNum[i];
        formula += currDigit + " ";
    }

    let resLength = res.toString().length;
    let temp = res;
    for (let i = 0; i < res.toString().length; i += 3) {
        let currBlock;
        if (resLength >= 3) {
            currBlock = temp.toString().slice(resLength - 3, resLength);
            temp = temp.toString().slice(0, resLength - 3);
            resLength -= 3;
        } else {
            currBlock = temp.toString().slice(0, resLength);
        }

        chunks = currBlock + " " + chunks;
    }

    formula += "<br>= " + chunks;
    formula += "<br>= " + res;

    setCalculationHtml(formula);
    return res;
}

export function hexToBin(num, setCalculationHtml) {
    let hexNum = num;
    let hexLen = hexNum.toString().length;
    let formula = "";
    let chunks = "";

    let res = hexToDec(hexNum, () => {});
    res = decToBin(res, () => {});

    formula += hexNum + "<br>= ";
    for (let i = 0; i < hexLen; i++) {
        let currDigit = hexNum[i];
        formula += currDigit + " ";
    }

    let resLength = res.toString().length;
    let temp = res;
    for (let i = 0; i < res.toString().length; i += 4) {
        let currBlock;
        if (resLength >= 4) {
            currBlock = temp.toString().slice(resLength - 4, resLength);
            temp = temp.toString().slice(0, resLength - 4);
            resLength -= 4;
        } else {
            currBlock = temp.toString().slice(0, resLength);
        }

        chunks = currBlock + " " + chunks;
    }

    formula += "<br>= " + chunks;
    formula += "<br>= " + res;

    setCalculationHtml(formula);
    return res;
}

export function octToHex(num, setCalculationHtml) {
    let octNum = num;
    let octLen = octNum.toString().length;
    let formula = "";
    let chunks = "";
    let res = octToBin(octNum, () => {}); // oct -> bin

    // Build formula blocks (3-bit groups)
    formula += octNum + "<br>= ";
    for (let i = 0; i < octLen; i++) formula += octNum[i] + " ";

    let resLength = res.toString().length;
    let temp = res;
    for (let i = 0; i < res.toString().length; i += 3) {
        let currBlock;
        if (resLength >= 3) {
            currBlock = temp.toString().slice(resLength - 3, resLength);
            temp = temp.toString().slice(0, resLength - 3);
            resLength -= 3;
        } else {
            currBlock = temp.toString().slice(0, resLength);
        }

        chunks = currBlock + " " + chunks;
    }
    formula += "<br>= " + chunks;

    // 4-bit groups
    resLength = res.toString().length;
    temp = res;
    chunks = "";
    for (let i = 0; i < res.toString().length; i += 4) {
        let currBlock;
        if (resLength >= 4) {
            currBlock = temp.toString().slice(resLength - 4, resLength);
            temp = temp.toString().slice(0, resLength - 4);
            resLength -= 4;
        } else {
            currBlock = temp.toString().slice(0, resLength);
        }
        
        chunks = currBlock + " " + chunks;
    }
    formula += "<br>= " + chunks;

    // bin -> hex
    res = binToHex(res, () => {});
    // separated hex
    const separated = res.split("").join(" ");
    formula += "<br>= " + separated;
    formula += "<br>= " + res;

    setCalculationHtml(formula);
    return res;
}

export function hexToOct(num, setCalculationHtml) {
    // hex -> bin -> oct, with same style of formula as scripts.js
    const bin = hexToBin(num, () => {}); // already builds an A→bin block in its own function
    // Build 3-bit grouping presentation for final oct
    let res = parseInt(bin, 2).toString(8);

    let resLength = bin.toString().length;
    let temp = bin;
    let chunks = "";
    for (let i = 0; i < bin.toString().length; i += 3) {
        let currBlock;
        if (resLength >= 3) {
            currBlock = temp.toString().slice(resLength - 3, resLength);
            temp = temp.toString().slice(0, resLength - 3);
            resLength -= 3;
        } else {
            currBlock = temp.toString().slice(0, resLength);
        }
        chunks = currBlock + " " + chunks;
    }

    let formula = num + "<br>= " + chunks.split(" ").join(" ") + "<br>= " + res.split("").join(" ") + "<br>= " + res;
    setCalculationHtml(formula);
    return res;
}