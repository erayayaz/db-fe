import React, { useEffect, useState } from 'react';
import './Animation.scss';
import logo from "../../img/logo.png";


const Animation: React.FC = () => {
    const [showMainScreen, setShowMainScreen] = useState(false);

    useEffect(() => {
        // Simüle edilmiş animasyon süresi (örneğin, 3000 ms = 3 saniye)
        const animationDuration = 2000;

        // Animasyon bitiminde ana ekranı göster
        const timeoutId = setTimeout(() => {
            setShowMainScreen(true);
        }, animationDuration);

        // Komponent unmount olduğunda clearTimeout çağrılmalı
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className={`animation-container ${showMainScreen ? 'hide' : ''}`}>
            <div className="logo-animation">
                <img src={logo} alt="DB Transfer"/>
            </div>
        </div>
    );
};

export default Animation;
