import React, { useState } from 'react';

import BaseDropdown from './BaseDropdown';
import '../stylesheets/ss-components/ConversionSection.css';

function ConversionSection() {
    const [fromBase, setFromBase] = useState(null);
    const [toBase, setToBase] = useState(null);
    const [fromValue, setFromValue] = useState(null);

    return (
        <div className="conversion-section">
            <div className="input-row">
                <div className="labeled-input">
                    <p>Convert from</p>
                    <BaseDropdown 
                        onSelect={setFromBase}
                    />
                </div>
                <div className="labeled-input">
                    <p>Convert to</p>
                    <BaseDropdown 
                        onSelect={setToBase}
                    />
                </div>
            </div>

            <div className="labeled-input">
                <p>Enter value</p>
                <input type="number" value={fromValue} />
            </div>

            <div>
                {fromBase}
                <br />
                {toBase}
                <br />
                {fromValue}
            </div>
        </div>
    );
}

export default ConversionSection;