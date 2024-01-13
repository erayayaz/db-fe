import React from 'react';
import './Payments.scss';
import {useTranslation} from "react-i18next";
import d2 from "../../img/payments/1f.png";
import tursab from "../../img/payments/f2.png";
import visa from "../../img/payments/f3.png";
import ssl from "../../img/payments/f5.png";


const Payments: React.FC = () => {
    const {i18n} = useTranslation();
    const handleLanguageChange = async (newLang: string) => {
        await i18n.changeLanguage(newLang);
    };

    return (
        <div className={'payments'}>
            <div className={'payments-item'}>
                <img src={d2} alt="" />
            </div>
            <div className={'payments-item'}>
                <img src={tursab} alt="" />
            </div>
            <div className={'payments-item'}>
                <img src={visa} alt="" />
            </div>
            <div className={'payments-item'}>
                <img src={ssl} alt="" />
            </div>
        </div>
    );
};

export default Payments;