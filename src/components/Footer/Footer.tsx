import React from 'react';
import './Footer.scss';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

interface IProps {
    menuButtonClicked?: () => void;
}

const Footer : React.FC<IProps> = (props) => {
    const {t} = useTranslation();

    const defaultProps = {menuButtonClicked:{}}
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">

                    <div className="footer-section">
                        <h2>{t('aboutUs')}</h2>
                        <p>{t('footerAbout')}</p>
                    </div>

                    <div className="footer-section">
                        <ul>
                            <li><Link to="/about-us" onClick={props.menuButtonClicked}>{t('aboutUs')}</Link></li>
                            <li><Link to="/regions" onClick={props.menuButtonClicked} >{t('regions')}</Link></li>
                            <li><Link to="/media" onClick={props.menuButtonClicked} >{t('media')}</Link></li>
                            <li><Link to="/vehicles" onClick={props.menuButtonClicked} >{t('vehicles')}</Link></li>
                            <li><Link to="/contacts" onClick={props.menuButtonClicked}>{t('contacts')}</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h2>{t('contacts')}</h2>
                        <p>{t('address')}: {t('ourAddress')}</p>
                        <p>{t('telephone')}: +90 123 456 7890</p>
                        <p>{t('email')}: info@turacentasi.com</p>
                    </div>

                </div>

                <div className="footer-bottom">
                    <p>&copy; {t('copyRight')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
