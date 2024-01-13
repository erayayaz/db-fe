import React from 'react';
import './Facetime.scss';
import phone from "../../img/phone.png";

const Facetime: React.FC = () => {
    const handleFacetimeClick = () => {
        window.location.href = 'facetime:05388220883';
    };

    return (
        <div className="facetime" onClick={handleFacetimeClick}>
            <img src={phone} width="60" height="60" alt="FaceTime Başlat" />
        </div>
    );
};

export default Facetime;