import React from 'react';
import './Navbar.scss';
import logo from '../../img/logo.png';
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

interface IProps {
    iconClicked: () => void;
    menuButtonClicked: () => void;
}

const Navbar: React.FC<IProps> = (props) => {
    const {i18n} = useTranslation();
    const handleLanguageChange = async (newLang: string) => {
        await i18n.changeLanguage(newLang);
    };

    return (
        <div>
            <nav className="navbar">
                <Link to="/" className="logo" onClick={props.iconClicked}>
                    <img src={logo} alt="DB Transfer"/>
                </Link>
                <div className="menu">
                    <Link to="/about-us" onClick={props.menuButtonClicked} className={'menu-item'}>Hakkımızda</Link>
                    <Link to="/regions" onClick={props.menuButtonClicked} className="menu-item">Bölgeler</Link>
                    <Link to="/media" onClick={props.menuButtonClicked} className="menu-item">Medya</Link>
                    <Link to="/vehicles" onClick={props.menuButtonClicked} className="menu-item">Araçlar</Link>
                    <Link to="/contacts" onClick={props.menuButtonClicked} className="menu-item">İletişim</Link>
                </div>
            </nav>
            {/* Diğer sayfa içeriği buraya gelecek */}
        </div>
    );
};

export default Navbar;