import React, {useEffect, useState} from 'react';
import './Reservation.scss';
import {useTranslation} from "react-i18next";
import Footer from "../Footer/Footer";
import passat from "../../img/vehicles/passat.png";
import vito from "../../img/vehicles/vito.png";
import sprinters from "../../img/vehicles/sprinters.png";
import person from "../../img/vehicles/person.svg";
import luggage from "../../img/vehicles/luggage.png";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

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
    let { tripType, destination, departure, date } = location.state || {};

    const [tripType1, setTripType] = useState(tripType);
    const [destination1, setDestination] = useState(destination);
    const [departure1, setDeparture] = useState(departure);
    const [date1, setDate] = useState(date);
    const [carInfo, setCarInfo] = useState<Car[]>([]);

    const handleRedirect = (vehicleId: number, vehiclePrice: number, vehicleType: string) => {
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
        };
        props.reservationButtonClicked();
        navigate('/form', {
            state: params,
        });
    }

    const carInfos = [
        {id: 1, url: passat},
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
                    {/* 1. Dropdown */}
                    <select value={tripType1} className={'reservation-dropdown-item'} onChange={(e) => setTripType(e.target.value)}>
                        <option value="Tek Yön"> {'\u21c0'} {t('oneWay')}</option>
                        <option value="Gidiş-Dönüş">{'\u21CB'} {t('ways')}</option>
                    </select>

                    <select value={departure1} onChange={(e) => setDeparture(e.target.value)} className={'reservation-dropdown-item'}>
                        <option value="Ankara">Ankara</option>
                        <option value="İstanbul">İstanbul</option>
                    </select>

                    <select value={destination1} onChange={(e) => setDestination(e.target.value)} className={'reservation-dropdown-item'}>
                        <option value="İzmir">İzmir</option>
                        <option value="Muğla">Muğla</option>
                    </select>
                    <input className={'reservation-dropdown-item'} placeholder={t('go')} type="date" value={date1}
                           onChange={(e) => setDate(e.target.value)}/>
                </div>
                <div className={'reservation-right'}>
                    {carInfo.map((vehicle, index) => (
                        <div key={vehicle.id} className="reservation-vehicle">
                            <div className="reservation-vehicle-img">
                                <img src={carInfos.find(info => info.id === vehicle.id)?.url} alt={''} />
                            </div>
                            <div className="reservation-vehicle-info">
                                <h2>{vehicle.carType}</h2>
                                <div className={'reservation-vehicle-info__person-size'}>
                                    <img src={person} alt="Icon" width="24" height="24" />
                                    <p className={'reservation-vehicle-info__person-size__info'}>{t('numberOfPersonLimit')}: {vehicle.personLimit}</p>
                                </div>
                                <div className={'reservation-vehicle-info__person-size'}>
                                    <img src={luggage} alt="Icon" width="24" height="24" />
                                    <p className={'reservation-vehicle-info__person-size__info'}>{t('numberOfLuggageLimit')}: {vehicle.luggageLimit}</p>
                                </div>
                            </div>
                            <div className={'reservation-vehicle-button'}>
                                <p>{t('totalPrice')}: {vehicle.price} TL</p>
                                <button onClick={() => handleRedirect(vehicle.id, vehicle.price, vehicle.carType)}>{t('reservation')}</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Reservation;