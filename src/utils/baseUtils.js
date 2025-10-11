export const labelMap = {
    bin: "Binary",
    oct: "Octal",
    dec: "Decimal",
    hex: "Hexadecimal",
};

export const baseName = (k) => labelMap[k] || "";

export function getBaseRegex(base) {
    switch (base) {
        case "bin": return /^[01]*$/i;
        case "oct": return /^[0-7]*$/i;
        case "dec": return /^[0-9]*$/i;
        case "hex": return /^[0-9a-f]*$/i;
        default: return /^.*$/;
    }
}