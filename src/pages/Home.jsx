import React, {useState} from 'react';

import ConversionSection from '../components/ConversionSection';
import CalculationSection from '../components/CalculationSection';
import BaseDropdown from '../components/BaseDropdown';
import '../stylesheets/Home.css';

function Home() {
    const [fromBase, setFromBase] = useState(null);
    const [toBase, setToBase] = useState(null);
    const [fromValue, setFromValue] = useState(null);
    const [result, setResult] = useState(null);
    const [calculationHtml, setCalculationHtml] = useState(null);
    const [description, setDescription] = useState(null);
    const [otherResult1, setOtherResult1] = useState(null);
    const [otherResult2, setOtherResult2] = useState(null);

    return (
        <div className="page-wrapper">
            <div className="home-layout">
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

                    <div className="input-row">
                        <button>Clear</button>
                        <button>Swap</button>
                        <button>Convert</button>
                    </div>
                </div>

                <div className="calculation-section">
                    <div>
                        From: {fromBase}
                        <br />
                        
                        To: {toBase}
                        <br />
                        Input: {fromValue}
                        <br />
                        Result: {result}
                        <br />

                        Formula:<br/>
                        {calculationHtml}

                        About this conversion:
                        {description}
                        <br />

                        Other result 1: {otherResult1}
                        <br/>
                        Other result 2: {otherResult2}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;