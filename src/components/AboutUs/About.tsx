import React from 'react';
import './About.scss';
import {useTranslation} from "react-i18next";
import about from "../../img/about.png";

import Footer from "../Footer/Footer";
import Payments from "../Payments/Payments";

const About: React.FC = () => {
    const {t} = useTranslation();

    return (
        <>
            <div className={'about'}>
                <div className={'about-us'}>
                    <p>{t('about-paragraph')}</p>

                </div>
                <div className={'about-img'}>
                    <img src={about} alt={''}/>
                </div>
            </div>

            <Payments/>
            <Footer/>
        </>
    );
};

export default About;