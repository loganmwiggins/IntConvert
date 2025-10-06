import React from 'react';
import Card from '../components/Card';

import '../stylesheets/Info.css';

function Info() {
    return (
        <div className="page-wrapper">
            <Card header="App Information" canCollapse={false}>
                <p>
                    IntConvert was developed with the goal of creating a simple, intuitive, and well-designed application for converting integers with different bases. As a result, with this app, users are able to easily make accurate conversions between the binary, octal, decimal, and hexadecimal number systems.
                </p>  
            </Card>
        </div>
    );
}

export default Info;