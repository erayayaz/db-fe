import React, {useEffect, useState} from 'react';
import './Sidebar.scss';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    menuButtonClicked: () => void;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
    const {t, i18n} = useTranslation();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('tr');

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
    //                    <Link to="/contacts" onClick={props.menuButtonClicked} className="menu-item">{t('contacts')}</Link>
    return (
        <div className={`sidebar ${props.isOpen ? 'open' : ''}`}>

            <div className="content">
                <div className="close-btn" onClick={props.onClose}>
                    X
                </div>
                <div className="sidebar-menu">
                    <Link to="/about-us" onClick={props.menuButtonClicked} className={'menu-item'}>{t('aboutUs')}</Link>
                    <Link to="/regions" onClick={props.menuButtonClicked} className="menu-item">{t('regions')}</Link>
                    <Link to="/media" onClick={props.menuButtonClicked} className="menu-item">{t('media')}</Link>
                    <Link to="/vehicles" onClick={props.menuButtonClicked} className="menu-item">{t('vehicles')}</Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
