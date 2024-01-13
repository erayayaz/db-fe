import React from 'react';
import './TravelRoutes.scss';
import {useTranslation} from "react-i18next";
import alanya from "../../img/routes/alanya.png";
import antalya from "../../img/routes/antalya.png";
import bozburun from "../../img/routes/bozburun.png";
import fethiye from "../../img/routes/fethiye.png";
import marmaris from "../../img/routes/marmaris.png";
import {Link} from "react-router-dom";

interface IProps {
    toggleRegions: () => void;
}

const TravelRoutes: React.FC<IProps> = (props) => {
    const {i18n} = useTranslation();
    const handleLanguageChange = async (newLang: string) => {
        await i18n.changeLanguage(newLang);
    };

    return (
        <div className="travel">
            <div className={'travel-titles'}>
                <p className={'travel__title'}>Güzergahlarımız</p>
                <p className={'travel__sub-title'}>Rotamızda yer alan bazı güzergahları sizler için derledik</p>
            </div>
            <div className={'travel-route'}>
                <div className="big-image">
                    <Link to="/regions" onClick={props.toggleRegions}>
                        <img src={marmaris} alt={'marmaris'}/>
                    </Link>
                    <div className={'travel-route__overlay-img'}>
                        <h3 className={'travel-route__overlay-text'}>Marmaris</h3>
                    </div>
                </div>
                <div className="small-images">
                    <div className="small-image">
                        <Link to="/regions" onClick={props.toggleRegions}>
                            <img src={alanya} alt="Alanya"/>
                        </Link>
                        <div className={'travel-route__overlay-img'}>
                            <h3 className={'travel-route__overlay-text'}>Alanya</h3>
                        </div>
                        <Link to="/regions" onClick={props.toggleRegions}>
                            <img src={antalya} alt="Antalya"/>
                        </Link>
                        <div className={'travel-route__overlay-img'}>
                            <h3 className={'travel-route__overlay-text'}>Antalya</h3>
                        </div>
                    </div>
                    <div className="small-image">
                        <Link to="/regions" onClick={props.toggleRegions}>
                            <img src={bozburun} alt="Bozburun"/>
                        </Link>
                        <div className={'travel-route__overlay-img'}>
                            <h3 className={'travel-route__overlay-text'}>Bozburun</h3>
                        </div>
                        <Link to="/regions" onClick={props.toggleRegions}>
                            <img src={fethiye} alt="Fethiye"/>
                        </Link>
                        <div className={'travel-route__overlay-img'}>
                            <h3 className={'travel-route__overlay-text'}>Fethiye</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelRoutes;