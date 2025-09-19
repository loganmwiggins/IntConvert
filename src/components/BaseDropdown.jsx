import React from 'react';

function BaseDropdown({ onSelect }) {
    return (
        <select defaultValue="" onChange={(e) => onSelect(e.target.value)}>
            <option disabled value="">Choose...</option>
            <option value="bin">Binary (base 2)</option>
            <option value="oct">Octal (base 8)</option>
            <option value="dec">Decimal (base 10)</option>
            <option value="hex">Hexadecimal (base 16)</option>
        </select>
    );
}

export default BaseDropdown;