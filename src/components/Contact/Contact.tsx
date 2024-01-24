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
                    <p>+90 123 456 7890</p>
                </div>
                <iframe
                    width="600"
                    height="450"
                    style={{border: 0}}
                    loading="lazy"
                    allowFullScreen
                    src="https://www.google.com/search?q=%3Ciframe+src%3D%22https%3A%2F%2Fwww.google.com%2Fmaps%2Fembed%3Fpb%3D!1m18!1m12!1m3!1d5322.269833068216!2d28.801741280498586!3d36.769241867139975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x407eab20ada58381%253A0xe8d5eab3aea1c0c1!2sAras%2520Kargo%2520Dalaman%2520%25C5%259Eubesi!5e0!3m2!1str!2str!4v1705792839850!5m2!1str!2str%22+width%3D%22800%22+height%3D%22600%22+style%3D%22border%3A0%3B%22+allowfullscreen%3D%22%22+loading%3D%22lazy%22+referrerpolicy%3D%22no-referrer-when-downgrade%22%3E%3C%2Fiframe%3E&rlz=1C5CHFA_enTR1021TR1021&oq=%3Ciframe+src%3D%22https%3A%2F%2Fwww.google.com%2Fmaps%2Fembed%3Fpb%3D!1m18!1m12!1m3!1d5322.269833068216!2d28.801741280498586!3d36.769241867139975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x407eab20ada58381%253A0xe8d5eab3aea1c0c1!2sAras%2520Kargo%2520Dalaman%2520%25C5%259Eubesi!5e0!3m2!1str!2str!4v1705792839850!5m2!1str!2str%22+width%3D%22800%22+height%3D%22600%22+style%3D%22border%3A0%3B%22+allowfullscreen%3D%22%22+loading%3D%22lazy%22+referrerpolicy%3D%22no-referrer-when-downgrade%22%3E%3C%2Fiframe%3E&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDE3MzFqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8"
                ></iframe>
            </div>
            <Payments/>
            <Footer/>
        </>
    );
};

export default Contacts;