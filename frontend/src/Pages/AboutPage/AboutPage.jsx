import React from 'react';
import './AboutPage.css'

const AboutPage = () => {
    return (
        <div>
            <div className='aboutPage'>
                <h1>About</h1>
                <h2> Greek Tours Company </h2>
                <h3>This website was created by Nikolaos Panagiotis Panagopoulos</h3>
                <h4>Every tour that you see is guaranteed to be according to your outmost expectations. Our specialists will call you after you buy a tour and they will explain everything in detail. You can contact us 24/7 with any question or suggestion</h4>
                <h4 className='phone-numbers'>Our Call Center Numbers: 210 555-6978, 210 587-9854</h4>
                <h4>Email: greektours@company.gr</h4>
            </div>
        </div>
    );
}
 
export default AboutPage;