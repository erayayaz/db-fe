import React from 'react';
import './Navbar.scss';
import logo from '../../img/logo.png';
import {Link} from "react-router-dom";

interface IProps {
    iconClicked: () => void;
    reservationButton: () => void;
    reservationButton2: () => void;
}

const Navbar: React.FC<IProps> = (props) => {
    return (
        <div>
            <nav className="navbar">
                <Link to="/" className="logo" onClick={props.iconClicked}>
                    <img src={logo} alt="DB Transfer"/>
                </Link>
                <nav className="navbar__menu-items">
                    <ul>
                        <li onClick={props.reservationButton}>
                            Reservasyonlar
                        </li>
                        <li onClick={props.reservationButton2}>
                            Kullanıcı
                        </li>
                        <li onClick={props.reservationButton2}>
                            Fiyatlamalar
                        </li>
                        <li onClick={props.reservationButton2}>
                            Medya
                        </li>
                    </ul>
                </nav>
            </nav>
            {/* Diğer sayfa içeriği buraya gelecek */}
        </div>
    );
};

export default Navbar;