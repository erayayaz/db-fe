import React, {useEffect, useState} from 'react';
import './Reservation.scss';
import {useTranslation} from "react-i18next";
import Footer from "../Footer/Footer";
import sedan from "../../img/vehicles/sedan.png";
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
    doublePrice: number;
    priceEur: number;
    doublePriceEur: number;
    priceUsd: number;
    doublePriceUsd: number;
}

interface IProps {
    reservationButtonClicked: () => void;
}

const Reservation: React.FC<IProps> = (props) => {
    const {t} = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    let {tripType, destination, departure, departureDate, returnDate, currency, currencyIcon, isTripIncludeReturn} = location.state || {};

    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const [tripType1, setTripType] = useState(tripType);
    const [destination1, setDestination] = useState(destination);
    const [departure1, setDeparture] = useState(departure);
    const [departureDate1, setDepartureDate] = useState(departureDate);
    const [returnDate1, setReturnDate] = useState(returnDate);
    const [currency1, setCurrency] = useState(currency);
    const [currencyIcon1, setCurrencyIcon] = useState(currencyIcon);
    const [isTripIncludeReturn1, setIsTripIncludeReturn] = useState(isTripIncludeReturn);
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
        departureDate = departureDate1;
        returnDate = returnDate1;
        currency = currency1;
        currencyIcon = currencyIcon1;
        const params = {
            tripType,
            destination,
            departure,
            departureDate,
            returnDate,
            currencyIcon,
            vehiclePrice,
            vehicleType,
            img
        };

        console.log(params);
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

    const currencies = [
        {id: 1, name: '₺ TRY', icon: '₺'},
        {id: 2, name: '€ EUR', icon: '€'},
        {id: 3, name: '$ USD', icon: '$'},
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

    const trips = [
        {id: 1, name: t('oneWay')},
        {id: 2, name: t('ways')},
    ];

    const handleTripType = (value: string) => {
        const selectedTrip = trips.find(cur => cur.name === value);

        if (selectedTrip) {
            setTripType(value);
            setIsTripIncludeReturn(selectedTrip.id % 2 === 0);
        }
    }

    const handleCurrency = (value: string) => {
        const selectedCurrency = currencies.find(cur => cur.name === value);

        if (selectedCurrency) {
            setCurrency(value);
            setCurrencyIcon(selectedCurrency.icon);
        }
    }

    return (
        <>
            <div className={'reservation'}>
                <div className={'reservation-dropdown'}>
                    <CustomDropdown
                        options={trips}
                        value={tripType1}
                        onChange={(value) => handleTripType(value)}
                    />

                    <CustomDropdown
                        options={regions}
                        value={departure1}
                        onChange={(value) => setDeparture(value)}
                    />

                    <CustomDropdown
                        options={regions.filter((region) => region.name !== departure1)}
                        value={destination1}
                        onChange={(value) => setDestination(value)}
                    />
                    <input className={'reservation-dropdown-item'} type="date" value={departureDate1}
                           onChange={(e) => setDepartureDate(e.target.value)}/>

                    { isTripIncludeReturn1 &&
                        <input className={'reservation-dropdown-item'} type="date" value={returnDate1}
                               onChange={(e) => setReturnDate(e.target.value)}/>
                    }

                    <div>
                        <CustomDropdown
                            options={currencies.filter((currency2) => currency2.name !== currency1) }
                            value={currency1}
                            placeholder={currency1}
                            onChange={(value) => handleCurrency(value)}
                        />
                    </div>
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
                                {currencyIcon1 === '₺' ?
                                    !isTripIncludeReturn1 ?
                                        <p>{t('totalPrice')}: {vehicle.price} ₺</p>
                                        : <p>{t('totalPrice')}: {vehicle.doublePrice} ₺</p>
                                 : currencyIcon1 === '€' ?
                                        !isTripIncludeReturn1 ?
                                            <p>{t('totalPrice')}: {vehicle.priceEur} €</p>
                                            : <p>{t('totalPrice')}: {vehicle.doublePriceEur} €</p>
                                        :
                                        !isTripIncludeReturn1 ?
                                            <p>{t('totalPrice')}: {vehicle.priceUsd} $</p>
                                            : <p>{t('totalPrice')}: {vehicle.doublePriceUsd} $</p>
                                }
                                <button
                                    onClick={() => handleRedirect(vehicle.id, currencyIcon1 === '₺' ? tripType1 !== t('ways') ? vehicle.price : vehicle.doublePrice : currencyIcon1 === '€' ? tripType1 !== t('ways') ? vehicle.priceEur : vehicle.doublePriceEur : tripType1 !== t('ways') ? vehicle.priceUsd : vehicle.doublePriceUsd, vehicle.carType, carInfos.find(info => info.id === vehicle.id)?.url)}>{t('reservation')}</button>
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