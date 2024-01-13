import React from 'react';
import './Contact.scss';
import {useTranslation} from "react-i18next";
import Footer from "../Footer/Footer";
import Payments from "../Payments/Payments";

const Contacts: React.FC = () => {
    const {i18n} = useTranslation();
    const handleLanguageChange = async (newLang: string) => {
        await i18n.changeLanguage(newLang);
    };

    return (
        <>
            <div className={'contacts'}>
                <div className={'contacts-info'}>
                    <p className={'contacts-info__subtitle'}>Adres:</p>
                    <p>Barış Mah. Ali Çebi Caddesi Erguvan Sitesi B Blok Beylikdüzü/İstanbul</p>
                </div>
                <div className={'contacts-info'}>
                    <p className={'contacts-info__subtitle'}>Telefon:</p>
                    <p>0534 694 04 60</p>
                </div>
            </div>
            <Payments />
            <Footer />
        </>
    );
};

export default Contacts;