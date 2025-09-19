import React from 'react';
import ConversionSection from '../components/ConversionSection';
import CalculationSection from '../components/CalculationSection';

function Home() {
    return (
        <div className="page-wrapper">
            <ConversionSection />
            <CalculationSection />
        </div>
    );
}

export default Home;