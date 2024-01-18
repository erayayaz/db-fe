import React from 'react';
import './Sidebar.scss';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    menuButtonClicked: () => void;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
    const {t} = useTranslation();

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
                    <Link to="/contacts" onClick={props.menuButtonClicked} className="menu-item">{t('contacts')}</Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
