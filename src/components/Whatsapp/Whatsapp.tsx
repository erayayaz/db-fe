import React from 'react';
import './Whatsapp.scss';
import wp from "../../img/wp.png";

const Whatsapp: React.FC = () => {

    const openWhatsApp = () => {
        // Replace '123456789' with the actual phone number (including country code) you want to open in WhatsApp
        const phoneNumber = '905388220883';

        // Create a WhatsApp URL
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}`;

        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className={'whatsapp'} onClick={openWhatsApp}>
            <img src={wp} alt="WhatsApp" />
        </div>
    );
};

export default Whatsapp;