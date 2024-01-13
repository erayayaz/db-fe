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

interface IProps {
    reservationButtonClicked: () => void;
}

const Reservation: React.FC<IProps> = (props) => {
    const {i18n} = useTranslation();
    const handleLanguageChange = async (newLang: string) => {
        await i18n.changeLanguage(newLang);
    };
    const location = useLocation();
    const navigate = useNavigate();
    let { tripType, destination, departure, date } = location.state || {};

    const [tripType1, setTripType] = useState(tripType);
    const [destination1, setDestination] = useState(destination);
    const [departure1, setDeparture] = useState(departure);
    const [date1, setDate] = useState(date);

    useEffect(() => {
        console.log('Gidiş-Dönüş:', tripType1);
        console.log('Nereden Gidecekleri:', departure1);
        console.log('Gidecekleri Yer:', destination1);
        console.log('Tarih:', date1);
    }, []);

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

    const images = [
        {id: 0, url: passat, person: 3, luggage: 3, type:'Otomobil', price: 4500},
        {id: 1, url: vito, person: 6, luggage: 6, type:'Mercedes Vito', price: 5500},
        {id: 2, url: sprinters, person: 10, luggage: 15, type:'Mercedes Sprinter', price: 6500},
    ];

    return (
        <>
            <div className={'reservation'}>
                <div className={'reservation-dropdown'}>
                    {/* 1. Dropdown */}
                    <select value={tripType1} className={'reservation-dropdown-item'} onChange={(e) => setTripType(e.target.value)}>
                        <option value="Tek Yön"> {'\u21c0'} Tek Yön</option>
                        <option value="Gidiş-Dönüş">{'\u21CB'} Gidiş-Dönüş</option>
                        {/* ... */}
                    </select>

                    {/* 2. Dropdown */}
                    <select value={departure1} onChange={(e) => setDeparture(e.target.value)} className={'reservation-dropdown-item'}>
                        <option value="Ankara">Ankara</option>
                        <option value="İstanbul">İstanbul</option>
                        {/* ... */}
                    </select>

                    {/* 3. Dropdown */}
                    <select value={destination1} onChange={(e) => setDestination(e.target.value)} className={'reservation-dropdown-item'}>
                        <option value="İzmir">İzmir</option>
                        <option value="Muğla">Muğla</option>
                        {/* ... */}
                    </select>
                    <input className={'reservation-dropdown-item'} placeholder={'Gidiş'} type="date" value={date1}
                           onChange={(e) => setDate(e.target.value)}/>
                </div>
                <div className={'reservation-right'}>
                    {images.map((vehicle) => (
                        <div key={vehicle.id} className="reservation-vehicle">
                            <div className="reservation-vehicle-img">
                                <img src={vehicle.url} alt={''} />
                            </div>
                            <div className="reservation-vehicle-info">
                                <h2>{vehicle.type}</h2>
                                <div className={'reservation-vehicle-info__person-size'}>
                                    <img src={person} alt="Icon" width="24" height="24" />
                                    <p className={'reservation-vehicle-info__person-size__info'}>Kişi Kapasitesi: {vehicle.person}</p>
                                </div>
                                <div className={'reservation-vehicle-info__person-size'}>
                                    <img src={luggage} alt="Icon" width="24" height="24" />
                                    <p className={'reservation-vehicle-info__person-size__info'}>Valiz Kapasitesi: {vehicle.luggage}</p>
                                </div>
                            </div>
                            <div className={'reservation-vehicle-button'}>
                                <button onClick={() => handleRedirect(vehicle.id, vehicle.price, vehicle.type)}>Rezervasyon</button>
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