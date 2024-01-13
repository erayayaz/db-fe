import React from 'react';
import './Sidebar.scss';
import {Link} from "react-router-dom";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    menuButtonClicked: () => void;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
    return (
        <div className={`sidebar ${props.isOpen ? 'open' : ''}`}>

            <div className="content">
                <div className="close-btn" onClick={props.onClose}>
                    X
                </div>
                <div className="sidebar-menu">
                    <Link to="/about-us" onClick={props.menuButtonClicked} className={'menu-item'}>Hakkımızda</Link>
                    <Link to="/regions" onClick={props.menuButtonClicked} className="menu-item">Bölgeler</Link>
                    <Link to="/media" onClick={props.menuButtonClicked} className="menu-item">Medya</Link>
                    <Link to="/vehicles" onClick={props.menuButtonClicked} className="menu-item">Araçlar</Link>
                    <Link to="/contacts" onClick={props.menuButtonClicked} className="menu-item">İletişim</Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
