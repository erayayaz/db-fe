import React, {useEffect, useState} from 'react';
import './Appointment.scss';
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import CustomDropdown from "../Dropdown/CustomDropdown";
import bckg2 from "../../img/bckg2.png";
import bckg3 from "../../img/bckg3.png";
import dalaman from "../../img/dalaman4.png";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { enUS } from "date-fns/locale/en-US"; // English locale
import { ru } from "date-fns/locale/ru"; // Russian locale
import { ar } from "date-fns/locale/ar"; // Arabic locale
import { tr } from "date-fns/locale/tr"; // Turkish locale

interface IProps {
    searchButtonClicked: () => void;
    isMobile: boolean;
}

const Appointment: React.FC<IProps> = (props) => {
    const [tripType, setTripType] = useState('Tek Yön');
    const [destination, setDestination] = useState('');
    const [departure, setDeparture] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [returnDate, setReturnDate] = useState('');
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [isTripIncludeReturn, setIsTripIncludeReturn] = useState(false);
    const navigate = useNavigate();

    const {t, i18n} = useTranslation();
    const backgroundImages = [bckg2, bckg3];
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        cssEase: "linear",
        arrows: true,
    };

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
    const handleRedirect = () => {
        const params = {
            tripType,
            destination,
            departure,
            departureDate,
            returnDate,
            isTripIncludeReturn
        };

        props.searchButtonClicked();

        navigate('/reservation', {
            state: params,
        });
    }
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

    const isFormValid = tripType && departure && destination && departureDate;

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
            let newDateWithOneDayAdded = new Date(startDate);
            newDateWithOneDayAdded.setDate(startDate.getDate() + 1);
            const date = newDateWithOneDayAdded.toISOString();
            setDepartureDate(date.substring(0, date.indexOf('T')));
        }
    }, [startDate]);

    useEffect(() => {
        if (endDate) {
            let newDateWithOneDayAdded = new Date(endDate);
            newDateWithOneDayAdded.setDate(endDate.getDate() + 1);
            const date = newDateWithOneDayAdded.toISOString();
            setReturnDate(date.substring(0, date.indexOf('T')));
        }
    }, [endDate]);

    return (
        <div className={'appointment'}>
            {!props.isMobile ?
            <div className={'appointment-background'}>
                <Slider {...settings}>
                    {backgroundImages.map((image, index) => (
                        <div className={'appointment-background-i'} key={index}>
                            <img className={'appointment-background-img'} src={image} alt={''}/>
                        </div>
                    ))}
                </Slider>
            </div> :
                <div className={'appointment-background__mobile'}>
                    <img src={dalaman} alt={''}>

                    </img>
                </div>

            }
            <div className="appointment-form">
                <form onSubmit={handleRedirect}>
                    <div>
                        <CustomDropdown
                            options={trips}
                            placeholder={t('departureType')}
                            value={tripType}
                            onChange={(value) => handleTripType(value)}
                        />
                    </div>

                    <div>
                        <CustomDropdown
                            options={regions}
                            value={departure}
                            placeholder={t('fromWhere')}
                            onChange={(value) => setDeparture(value)}
                        />
                    </div>

                    <div>
                        <CustomDropdown
                            options={regions.filter((region) => region.name !== departure)}
                            value={destination}
                            placeholder={t('where')}
                            onChange={(value) => setDestination(value)}
                        />
                    </div>

                    <div className={'appointment-form_date-input'}>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            placeholderText={t('departureDate')}
                            locale={i18n.language.toString()}
                        />
                    </div>

                    {isTripIncludeReturn &&
                        <div className={'appointment-form_date-input'}>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                placeholderText={t('returnDate')}
                                locale={i18n.language.toString()}
                            />
                        </div>
                    }

                    <div className={'appointment-button'}>
                        <button disabled={!isFormValid} onClick={handleRedirect} className={'apt-button'} type="submit">
                            {t('search')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Appointment;