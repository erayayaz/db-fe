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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { enUS } from "date-fns/locale/en-US"; // English locale
import { ru } from "date-fns/locale/ru"; // Russian locale
import { ar } from "date-fns/locale/ar"; // Arabic locale
import { tr } from "date-fns/locale/tr"; // Turkish locale

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
    const {t, i18n} = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    let {
        tripType,
        destination,
        departure,
        departureDate,
        returnDate,
        isTripIncludeReturn
    } = location.state || {};

    if (returnDate === undefined || returnDate === null) {
        returnDate = "";
    }

    if (departureDate === undefined || departureDate === null) {
        departureDate = "";
    }

    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const [tripType1, setTripType] = useState(tripType);
    const [destination1, setDestination] = useState(destination);
    const [departure1, setDeparture] = useState(departure);
    const [departureDate1, setDepartureDate] = useState(departureDate);
    const [startDate, setStartDate] = useState<Date | null>(departureDate.length > 1 ? new Date(departureDate) : null);
    const [returnDate1, setReturnDate] = useState(returnDate);
    const [endDate, setEndDate] = useState<Date | null>(returnDate.length > 1 ? new Date(returnDate) : null);
    const [isTripIncludeReturn1, setIsTripIncludeReturn] = useState(isTripIncludeReturn);
    const [carInfo, setCarInfo] = useState<Car[]>([]);

    const handleClick = (id: number) => {
        setCurrentImageIndex((id - 1));
        setIsGalleryOpen(true);
    }

    const handleClose = () => {
        setIsGalleryOpen(false);
    }
    const notSortedRegions = [
        {id: 1, name: 'Alanya'},
        {id: 3, name: 'Antalya'},
        {id: 5, name: 'Bozburun'},
        {id: 10, name: 'Fethiye'},
        {id: 19, name: 'Marmaris'},
        {id: 17, name: 'İzmir'},
        {id: 15, name: 'İçmeler'},
        {id: 23, name: 'Orhaniye'},
        {id: 26, name: 'Selimiye'},
        {id: 2, name: 'Angels Marmaris'},
        {id: 11, name: 'Göcek'},
        {id: 12, name: 'Hillside Beach'},
        {id: 18, name: 'Liberty Hotels'},
        {id: 20, name: 'Marmaris Netsel Marina'},
        {id: 21, name: 'Marmaris Yatch Marina'},
        {id: 25, name: 'Rixos Premium Göcek'},
        {id: 13, name: 'Hilton Sarıgerme'},
        {id: 0, name: 'Akyaka'},
        {id: 6, name: 'D-Marin'},
        {id: 7, name: 'D-Maris Bay'},
        {id: 9, name: 'Datça'},
        {id: 14, name: 'Hisarönü'},
        {id: 24, name: 'Ölüdeniz'},
        {id: 27, name: 'Söğüt'},
        {id: 28, name: 'Turunç'},
        {id: 16, name: 'İstanbul'},
        {id: 8, name: 'Dalaman Havalimanı'},
        {id: 22, name: 'Milas-Bodrum Havalimanı'},
        {id: 4, name: 'Antalya Havalimanı'},
    ];

    const sortRegions = () => {
        return [...notSortedRegions].sort((a, b) => a.name.localeCompare(b.name));
    };

    const regions = sortRegions();

    const handleRedirect = (vehiclePrice: number, vehicleType: string, img: any) => {
        tripType = tripType1;
        destination = destination1;
        departure = departure1;
        departureDate = departureDate1;
        returnDate = returnDate1;
        const params = {
            tripType,
            destination,
            departure,
            departureDate,
            returnDate,
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
        const departureRegion = notSortedRegions.find(region => region.name === departure1);
        const destinationRegion = notSortedRegions.find(region => region.name === destination1);
        const startId = departureRegion?.id;
        const endId = destinationRegion?.id;

        axios.get(`https://db-be-d85969a6a61b.herokuapp.com/api/car/${startId}/${endId}`)
            .then(response => {
                const carInfo: Car[] = response.data;
                const filteredCars = carInfo.filter(car => car.price !== 0);
                setCarInfo(filteredCars);
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

    useEffect(() => {
        const currentLanguage = i18n.language.toString();
        switch (currentLanguage) {
            case "en":
                registerLocale("en-US", enUS);
                break;
            case "ru":
                registerLocale("ru", ru);
                break;
            case "ar":
                registerLocale("ar", ar);
                break;
            case "tr":
                registerLocale("tr", tr);
                break;
            default:
                registerLocale("tr", tr);
                break;
        }
    }, [i18n.language]);
    useEffect(() => {
        if (startDate) {
            const date = startDate.toISOString();
            setDepartureDate(date.substring(0, date.indexOf('T')));
        }
    }, [startDate]);

    useEffect(() => {
        if (endDate) {
            const date = endDate.toISOString();
            setReturnDate(date.substring(0, date.indexOf('T')));
        }
    }, [endDate]);
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

                    <div className={'reservation-dropdown_date-input'}>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            locale={i18n.language.toString()}
                        />
                    </div>

                    {isTripIncludeReturn1 &&
                        <div className={'reservation-dropdown_date-input'}>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                locale={i18n.language.toString()}
                            />
                        </div>
                    }
                </div>
                <div className={'reservation-right'}>
                    {carInfo.map((vehicle, index) => (
                        <div key={vehicle.id} className="reservation-vehicle">
                            <div className="reservation-vehicle-img">
                                <img src={carInfos.find(info => info.id === vehicle.id)?.url} alt={''}/>
                                <button className={'reservation-vehicle__gallery'}
                                        onClick={() => handleClick(vehicle.id)}>
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
                                {!isTripIncludeReturn1 ?
                                        <p>{t('totalPrice')}: {vehicle.price} £</p>
                                        : <p>{t('totalPrice')}: {vehicle.doublePrice} £</p>
                                }
                                <button
                                    onClick={() => handleRedirect(tripType1 !== t('ways') ? vehicle.price : vehicle.doublePrice, vehicle.carType, carInfos.find(info => info.id === vehicle.id)?.url)}>{t('reservation')}</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
            {isGalleryOpen && <VehicleGallery vehicleId={currentImageIndex} onClose={handleClose}/>}
        </>
    );
};

export default Reservation;