import React, {useEffect, useRef, useState} from 'react';
import './Navbar.scss';
import logo from '../../img/logo.png';
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

interface IProps {
    iconClicked: () => void;
    menuButtonClicked: () => void;
}

const Navbar: React.FC<IProps> = (props) => {
    const {t, i18n} = useTranslation();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('tr');
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handleLanguageChange = async (newLang: string) => {
        setSelectedLanguage(newLang);
        setDropdownVisible(false);
        await i18n.changeLanguage(newLang);
    };

    const toggleLanguageDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    useEffect(() => {
        const changeLanguage = async () => {
            await i18n.changeLanguage(selectedLanguage);
        };
        changeLanguage();

    }, []);

    const languages = [
        {id: 0, language: 'tr'},
        {id: 1, language: 'en'},
        {id: 2, language: 'ru'},
        {id: 3, language: 'ar'},
    ];

    return (
        <div>
            <nav className="navbar">
                <Link to="/" className="logo" onClick={props.iconClicked}>
                    <img src={logo} alt="DB Transfer"/>
                </Link>
                <div className="menu">
                    <Link to="/about-us" onClick={props.menuButtonClicked} className={'menu-item'}>{t('aboutUs')}</Link>
                    <Link to="/regions" onClick={props.menuButtonClicked} className="menu-item">{t('regions')}</Link>
                    <Link to="/media" onClick={props.menuButtonClicked} className="menu-item">{t('media')}</Link>
                    <Link to="/vehicles" onClick={props.menuButtonClicked} className="menu-item">{t('vehicles')}</Link>
                    <Link to="/contacts" onClick={props.menuButtonClicked} className="menu-item">{t('contacts')}</Link>
                </div>
                <div className="language-dropdown">
                    <button onClick={toggleLanguageDropdown} className="language-button">
                        {selectedLanguage.toUpperCase()}
                    </button>
                    {dropdownVisible && (
                        <div className="dropdown-content">
                            {languages.map((lang) => lang.language !== selectedLanguage && (
                                <button key={lang.id} onClick={() => handleLanguageChange(lang.language)}>
                                    {lang.language.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;