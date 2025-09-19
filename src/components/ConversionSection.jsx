import React from 'react';

import '../stylesheets/ss-components/ConversionSection.css';

function ConversionSection() {
    return (
        <>
            <div className="input-row">
                <div className="labeled-input">
                    <p>Convert from</p>
                    <input type="number" />
                </div>
                <div className="labeled-input">
                    <p>Convert to</p>
                    <input type="number" />
                </div>
            </div>

            <div className="labeled-input">
                <p>Enter value</p>
                <input type="number" />
            </div>
        </>
    );
}

export default ConversionSection;