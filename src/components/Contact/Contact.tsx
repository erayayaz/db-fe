import React from 'react';
import './Contact.scss';
import {useTranslation} from "react-i18next";
import Footer from "../Footer/Footer";
import Payments from "../Payments/Payments";

const Contacts: React.FC = () => {
    const {t} = useTranslation();
    return (
        <>
            <div className={'contacts'}>
                <div className={'contacts-info'}>
                    <p className={'contacts-info__subtitle'}>{t('address')}:</p>
                    <p>{t('ourAddress')}</p>
                </div>
                <div className={'contacts-info'}>
                    <p className={'contacts-info__subtitle'}>{t('telephone')}:</p>
                    <p>+90 534 694 04 60</p>
                </div>
            </div>
            <Payments/>
            <Footer/>
        </>
    );
};

export default Contacts;