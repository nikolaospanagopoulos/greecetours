import React from 'react';
import './ServicesPage.css'
import services2 from '../../pictures/service2.jpg'
import services3 from '../../pictures/service3.jpg'

const ServicesPage = () => {
    return (
        <div className='services-grid'>
            <h1 className='grid-title'>Touch on a card to know more</h1>
            <div className='flip-card'>
                <div className='flip-card-inner'>
                    <div className='flip-card-front'>
                    <img src={services2} alt=""/>
               
                    </div>
                    <div className='flip-card-back'>
                        <h3>We offer our clients the possibility to create their own tour completely from scratch</h3>
                        <p>Want to visit museums of your choice? Want to visit theaters and monuments?</p>
                        <p>Want to live in a hotel of your choice? </p>
                        <p>Contact now our call center and our specialists will make your dream come true!</p>
                    </div>
                   
                </div>
            </div>
            <div className='choice-item1'>
               <h2>Hover your mouse on these cards and you will know more!</h2>
            </div>
            <div className='choice-item'>
                
            </div>
            <div className='flip-card'>
                <div className='flip-card-inner'>
                    <div className='flip-card-front'>
                    <img src={services3} alt=""/>
               
                    </div>
                    <div className='flip-card-back'>
                        <h3>You want to do hiking or other similar activities?</h3>
                        <p>We provide for you the best equipment </p>
                        <p>If you want a guide, our people are contantly trained to keep you safe! </p>
                        <p>We also rent fishing and climbing equipment for you!</p>
                    </div>
                   
                </div>
            </div>
            <div className='choice-item2'>
               <h2>We are here to show you the amazing parts of Greece!</h2>
            </div>
            <div className='choice-item'>
                
            </div>
        </div>
    );
}
 
export default ServicesPage;