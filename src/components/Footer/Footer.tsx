import React from 'react';
import './Footer.scss';
import {Link} from "react-router-dom";

interface IProps {
    menuButtonClicked?: () => void;
}

const Footer : React.FC<IProps> = (props) => {
    const defaultProps = {menuButtonClicked:{}}
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">

                    <div className="footer-section">
                        <h2>Hakkımızda</h2>
                        <p>2023'te kurulan DB Transfer, güvenilir ve düzenli taşımacılık hizmeti sunar. Geniş araç filomuzla müşterilerimize güvenli ve konforlu seyahat imkânı sağlıyoruz. Seyahat deneyiminizi özel kılmak için buradayız!</p>
                    </div>

                    <div className="footer-section">
                        <ul>
                            <li><Link to="/about-us" onClick={props.menuButtonClicked}>Hakkımızda</Link></li>
                            <li><Link to="/regions" onClick={props.menuButtonClicked} >Bölgeler</Link></li>
                            <li><Link to="/media" onClick={props.menuButtonClicked} >Medya</Link></li>
                            <li><Link to="/vehicles" onClick={props.menuButtonClicked} >Araçlar</Link></li>
                            <li><Link to="/contacts" onClick={props.menuButtonClicked}>İletişim</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h2>İletişim</h2>
                        <p>Adres: Tur Caddesi No: 123, Şehir, Ülke</p>
                        <p>Telefon: +90 123 456 7890</p>
                        <p>E-posta: info@turacentasi.com</p>
                    </div>

                </div>

                <div className="footer-bottom">
                    <p>&copy; 2024 DB Transfer. Tüm hakları saklıdır.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
