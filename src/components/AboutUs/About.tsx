import React from 'react';
import './About.scss';
import {useTranslation} from "react-i18next";
import Footer from "../Footer/Footer";
import Payments from "../Payments/Payments";

const About: React.FC = () => {
    const {t} = useTranslation();

    return (
        <>
            <div className={'about-us'}>
                <p>{t('about-paragraph')}</p>
            </div>
            <Payments/>
            <Footer/>
        </>
    );
};

export default About;