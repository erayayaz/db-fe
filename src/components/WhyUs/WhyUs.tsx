import React from 'react';
import './WhyUs.scss';
import {useTranslation} from "react-i18next";
import logo from "../../img/logo.png";

const WhyUs: React.FC = () => {
    const {t} = useTranslation();

    return (
        <div className={'whyus'}>
            <div className={'whyus-section'}>
                <img className={'whyus-section__img'} src={logo} alt=""/>
                <p className={'whyus__title-brand'}>DB VIP Transfer</p>
                <p className={'whyus__title-guest'}>{t('guests')}</p>
                <p className={'whyus__title-why'}>{t('whyUs')}</p>
                <p className={'whyus-__reason'}>{t('whyMessage')}</p>

                <div className={'whyus__list'}>
                    <div className={'whyus__list-first'}>
                        <ul className={'whyus__list-ul'}>
                            <p>👍 {t('luxCars')}</p>
                            <p>👍 {t('easyPay')}</p>
                            <p>👍 {t('easyReservation')}</p>
                            <p>👍 {t('vip')}</p>
                        </ul>
                    </div>
                    <div className={'whyus__list-second'}>
                        <ul className={'whyus__list-ul'}>
                            <p>👍 {t('allTime')}</p>
                            <p>👍 {t('smile')}</p>
                            <p>👍 {t('safety')}</p>
                            <p>👍 {t('affordable')}</p>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyUs;