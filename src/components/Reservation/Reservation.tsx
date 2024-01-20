import React, {useEffect, useState} from 'react';
import './Reservation.scss';
import {useTranslation} from "react-i18next";
import Footer from "../Footer/Footer";
import sedan from "../../img/sedan.png";
import vito from "../../img/vehicles/vitowithout.png";
import sprinters from "../../img/vehicles/sprinterwithout.png";
import person from "../../img/vehicles/person.svg";
import luggage from "../../img/vehicles/luggage.png";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import CustomDropdown from "../Dropdown/CustomDropdown";
import VehicleGallery from "../VehicleGallery/VehicleGallery";
import photo from "../../img/photo.png";

interface Car {
    id: number;
    personLimit: number;
    luggageLimit: number;
    carType: string;
    price: number;
}

interface IProps {
    reservationButtonClicked: () => void;
}

const Reservation: React.FC<IProps> = (props) => {
    const {t} = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    let {tripType, destination, departure, date} = location.state || {};
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const [tripType1, setTripType] = useState(tripType);
    const [destination1, setDestination] = useState(destination);
    const [departure1, setDeparture] = useState(departure);
    const [date1, setDate] = useState(date);
    const [carInfo, setCarInfo] = useState<Car[]>([]);

    const handleClick = (id: number) => {
        setCurrentImageIndex((id-1));
        setIsGalleryOpen(true);
    }

    const handleClose = () => {
        setIsGalleryOpen(false);
    }
    const notSortedRegions = [
        {id: 1, name: 'Alanya'},
        {id: 2, name: 'Antalya'},
        {id: 3, name: 'Bozburun'},
        {id: 4, name: 'Fethiye'},
        {id: 5, name: 'Marmaris'},
        {id: 6, name: 'İzmir'},
        {id: 7, name: 'İçmeler'},
        {id: 8, name: 'Orhaniye'},
        {id: 9, name: 'Selimiye'},
        {id: 10, name: 'Angels Marmaris'},
        {id: 11, name: 'Göcek'},
        {id: 12, name: 'Hillside Beach'},
        {id: 13, name: 'Liberty Hotels'},
        {id: 14, name: 'Marmaris Netsel Marina'},
        {id: 15, name: 'Marmaris Yatch Marina'},
        {id: 16, name: 'Rixos Premium Göcek'},
        {id: 17, name: 'Hilton Sarıgerme'},
        {id: 18, name: 'Akyaka'},
        {id: 19, name: 'D-Marin'},
        {id: 20, name: 'D-Maris Bay'},
        {id: 21, name: 'Akdeniz'},
        {id: 22, name: 'Datça'},
        {id: 23, name: 'Hisarönü'},
        {id: 24, name: 'Ölüdeniz'},
        {id: 25, name: 'Söğüt'},
        {id: 26, name: 'Turunç'},
        {id: 27, name: 'İstanbul'},
    ];

    const sortRegions = () => {
        return [...notSortedRegions].sort((a, b) => a.name.localeCompare(b.name));
    };

    const regions = sortRegions();

    const handleRedirect = (vehicleId: number, vehiclePrice: number, vehicleType: string, img: any) => {
        tripType = tripType1;
        destination = destination1;
        departure = departure1;
        date = date1;
        const params = {
            tripType,
            destination,
            departure,
            date,
            vehicleId,
            vehiclePrice,
            vehicleType,
            img
        };
        props.reservationButtonClicked();
        navigate('/form', {
            state: params,
        });
    }

    const carInfos = [
        {id: 1, url: sedan},
        {id: 2, url: vito},
        {id: 3, url: sprinters},
    ];

    useEffect(() => {
        axios.get('http://localhost:8080/api/car')
            .then(response => {
                const carInfo: Car[] = response.data;
                setCarInfo(carInfo);
            })
            .catch(error => {
                console.error('Veri çekme hatası:', error);
            });
    }, []);

    return (
        <>
            <div className={'reservation'}>
                <div className={'reservation-dropdown'}>
                    <CustomDropdown
                        options={[
                            {id: 1, name: 'Tek Yön'},
                            {id: 2, name: 'Gidiş-Dönüş'},
                        ]}
                        value={tripType1}
                        onChange={(value) => setTripType(value)}
                    />

                    <CustomDropdown
                        options={regions}
                        value={departure1}
                        onChange={(value) => setDeparture(value)}
                    />

                    <CustomDropdown
                        options={regions.filter((region) => region.name !== departure)}
                        value={destination1}
                        onChange={(value) => setDestination(value)}
                    />
                    <input className={'reservation-dropdown-item'} placeholder={t('go')} type="date" value={date1}
                           onChange={(e) => setDate(e.target.value)}/>
                </div>
                <div className={'reservation-right'}>
                    {carInfo.map((vehicle, index) => (
                        <div key={vehicle.id} className="reservation-vehicle">
                            <div className="reservation-vehicle-img">
                                <img src={carInfos.find(info => info.id === vehicle.id)?.url} alt={''}/>
                                <button className={'reservation-vehicle__gallery'} onClick={() => handleClick(vehicle.id)}>
                                    <img src={photo} alt={''}/>
                                </button>
                            </div>
                            <div className="reservation-vehicle-info">
                                <h2>{vehicle.carType}</h2>
                                <div className={'reservation-vehicle-info__person-size'}>
                                    <img src={person} alt="Icon" width="24" height="24"/>
                                    <p className={'reservation-vehicle-info__person-size__info'}>{t('numberOfPersonLimit')}: {vehicle.personLimit}</p>
                                </div>
                                <div className={'reservation-vehicle-info__person-size'}>
                                    <img src={luggage} alt="Icon" width="24" height="24"/>
                                    <p className={'reservation-vehicle-info__person-size__info'}>{t('numberOfLuggageLimit')}: {vehicle.luggageLimit}</p>
                                </div>
                            </div>
                            <div className={'reservation-vehicle-button'}>
                                <p>{t('totalPrice')}: {vehicle.price} TL</p>
                                <button
                                    onClick={() => handleRedirect(vehicle.id, vehicle.price, vehicle.carType, carInfos.find(info => info.id === vehicle.id)?.url)}>{t('reservation')}</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
            {isGalleryOpen && <VehicleGallery vehicleId={currentImageIndex} onClose={handleClose} />}
        </>
    );
};

export default Reservation;