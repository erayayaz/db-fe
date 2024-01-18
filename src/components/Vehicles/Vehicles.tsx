import React from 'react';
import './Vehicles.scss';
import {useTranslation} from "react-i18next";
import Footer from "../Footer/Footer";
import passat from "../../img/vehicles/passat.png";
import vito from "../../img/vehicles/vito.png";
import sprinters from "../../img/vehicles/sprinters.png";
import person from "../../img/vehicles/person.svg";
import luggage from "../../img/vehicles/luggage.png";
import {Link} from "react-router-dom";

interface IProps {
    reservationButtonClicked: () => void;
}

const Vehicles: React.FC<IProps> = (props) => {
    const {t} = useTranslation();

    const images = [
        {id: 1, url: passat, person: 3, luggage: 3, type:t('sedan')},
        {id: 2, url: vito, person: 6, luggage: 6, type:t('vito')},
        {id: 3, url: sprinters, person: 10, luggage: 15, type:t('sprinter')},
    ];

    return (
        <>
            <div className={'vehicles'}>
                {images.map((vehicle) => (
                    <div key={vehicle.id} className="vehicle">
                        <div className="vehicle-img">
                            <img src={vehicle.url} alt={''} />
                        </div>
                        <div className="vehicle-info">
                            <h2>{vehicle.type}</h2>
                            <div className={'vehicle-info__person-size'}>
                                <img src={person} alt="Icon" width="24" height="24" />
                                <p className={'vehicle-info__person-size__info'}>{t('numberOfPersonLimit')}: {vehicle.person}</p>
                            </div>
                            <div className={'vehicle-info__person-size'}>
                                <img src={luggage} alt="Icon" width="24" height="24" />
                                <p className={'vehicle-info__person-size__info'}>{t('numberOfLuggageLimit')}: {vehicle.luggage}</p>
                            </div>
                        </div>
                        <div className={'vehicle-button'}>
                            <Link to={'/'}>
                                <button onClick={props.reservationButtonClicked}>{t('reservation')}</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </>

    );
};

export default Vehicles;