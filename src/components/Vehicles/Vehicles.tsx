import React, {useEffect, useState} from 'react';
import './Vehicles.scss';
import {useTranslation} from "react-i18next";
import Footer from "../Footer/Footer";
import sedan from "../../img/vehicles/sedan.png";
import vito from "../../img/vehicles/vitowithout.png";
import sprinters from "../../img/vehicles/sprinterwithout.png";
import person from "../../img/vehicles/person.svg";
import luggage from "../../img/vehicles/luggage.png";
import photo from "../../img/photo.png";

import {Link} from "react-router-dom";
import VehicleGallery from "../VehicleGallery/VehicleGallery";

interface IProps {
    reservationButtonClicked: () => void;
}

const Vehicles: React.FC<IProps> = (props) => {
    const {t} = useTranslation();
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleClick = (id: number) => {
        setCurrentImageIndex((id - 1));
        setIsGalleryOpen(true);
    }

    const handleClose = () => {
        setIsGalleryOpen(false);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const images = [
        {id: 1, url: sedan, person: 3, luggage: 3, type: t('sedan')},
        {id: 2, url: vito, person: 6, luggage: 6, type: t('vito')},
        {id: 3, url: sprinters, person: 10, luggage: 15, type: t('sprinter')},
    ];

    return (
        <>
            <div className={'vehicles'}>
                {images.map((vehicle) => (
                    <div key={vehicle.id} className="vehicle">
                        <div className="vehicle-img">
                            <img src={vehicle.url} alt={''}/>
                            <button className={'vehicle-img__gallery'} onClick={() => handleClick(vehicle.id)}>
                                <img src={photo} alt={'photo-icon'}/>
                            </button>
                        </div>
                        <div className="vehicle-info">
                            <h2>{vehicle.type}</h2>
                            <div className={'vehicle-info__person-size'}>
                                <img src={person} alt="Icon" width="24" height="24"/>
                                <p className={'vehicle-info__person-size__info'}>{t('numberOfPersonLimit')}: {vehicle.person}</p>
                            </div>
                            <div className={'vehicle-info__person-size'}>
                                <img src={luggage} alt="Icon" width="24" height="24"/>
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
            <Footer/>
            {isGalleryOpen && <VehicleGallery vehicleId={currentImageIndex} onClose={handleClose}/>}
        </>

    );
};

export default Vehicles;