import React, {useState} from 'react';
import './Form.scss';
import {useTranslation} from "react-i18next";
import Footer from "../Footer/Footer";
import logo from "../../img/logo.png";
import {useLocation} from "react-router-dom";
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import {fonts} from './Forms';

interface IProps {
    returnHome: () => void;
}

const Form: React.FC<IProps> = (props) => {
    const {t} = useTranslation();

    const location = useLocation();
    const {
        tripType,
        destination,
        departure,
        departureDate,
        returnDate,
        currencyIcon,
        vehiclePrice,
        vehicleType,
        img
    } = location.state || {};
    const [time, setTime] = useState('12:00');
    const [numberOfPeople, setNumberOfPeople] = useState(0);
    const [numberOfChild, setNumberOfChild] = useState(0);
    const [childSeat, setChildSeat] = useState(false);
    const [isReservationSend, setIsReservationSend] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);

    const isEmailValid = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        flightNumber: '',
        additionalInfo: '',
    });

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    let formValid = (numberOfPeople > 0) && formData.fullName && formData.phoneNumber && formData.email
        && formData.flightNumber && isEmailValid(formData.email);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        handleDownloadPDF();
        const reservation = {
            ...formData,
            departureDate: departureDate,
            returnDate: returnDate,
            time: time,
            numberOfPeople: numberOfPeople,
            numberOfChild: numberOfChild,
            childSeat: childSeat,
            tripType: tripType,
            tripDestination: destination,
            tripDeparture: departure,
            vehicleType: vehicleType,
            vehiclePrice: vehiclePrice,
            currency: currencyIcon === '₺' ? "TRY" : currencyIcon === '€' ? "EUR" : "USD",
        };
        sendReservation(reservation);
        showNotification(`${t('success')} \u2713`);
    };

    const sendReservation = (reservation: any) => {
        setIsReservationSend(true);
        axios.post('http://localhost:8080/api/reservation', reservation)
            .then(response => {

            })
            .catch(error => {
                console.error('API isteği başarısız:', error);
            });
    };

    const showNotification = (message: string) => {
        setNotification(message);
        setTimeout(() => {
            setNotification(null);
            props.returnHome();
        }, 3000);
    };

    const handleDownloadPDF = () => {
        const pdf = new jsPDF();
        const pageWidth = pdf.internal.pageSize.getWidth();
        const middleX = pageWidth / 2;
        const logoWidth = 50;
        const logoHeight = 20;

        const logoX = middleX - logoWidth / 2;
        const logoY = 20;
        pdf.addFileToVFS('Roboto-Medium-normal.ttf', fonts);
        pdf.addFont('Roboto-Medium-normal.ttf', 'Roboto-Medium', 'normal');
        pdf.setFont('Roboto-Medium');

        pdf.addImage(logo, 'PNG', logoX, logoY, logoWidth, logoHeight);
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        } as Intl.DateTimeFormatOptions;
        ;
        const currentDateTime = new Intl.DateTimeFormat('tr-TR', options).format(new Date());


        // Add the current date to the top-right corner
        pdf.setFontSize(10);
        pdf.text(currentDateTime, pageWidth - 25, logoY + 10, {align: 'right'});

        pdf.setFontSize(16);
        pdf.setDrawColor(255, 100, 102);
        pdf.setLineWidth(0.3);
        pdf.rect(15, logoY + logoHeight + 10, pageWidth - 30, logoY + logoHeight + 120);

        pdf.text(`${t('fullName')}: ${formData.fullName}`, 20, logoY + logoHeight + 20);
        pdf.text(`${t('telephone')}: ${formData.phoneNumber}`, 20, logoY + logoHeight + 30);
        pdf.text(`${t('email')}: ${formData.email}`, 20, logoY + logoHeight + 40);
        pdf.text(`${t('flightNumber')}: ${formData.flightNumber}`, 20, logoY + logoHeight + 50);
        pdf.text(`${t('extraInformation')}: ${formData.additionalInfo}`, 20, logoY + logoHeight + 60);

        pdf.text(`${t('departureType')}: ${tripType}`, 20, logoY + logoHeight + 80);
        pdf.text(`${t('fromWhere')}: ${destination}`, 20, logoY + logoHeight + 90);
        pdf.text(`${t('where')}: ${departure}`, 20, logoY + logoHeight + 100);
        pdf.text(`${t('departureDateString')}: ${departureDate}`, 20, logoY + logoHeight + 110);
        pdf.text(`${t('returnDateString')}: ${returnDate}`, 20, logoY + logoHeight + 120);
        pdf.text(`${t('hour')}: ${time}`, 20, logoY + logoHeight + 130);
        pdf.text(`${t('numberOfPerson')}: ${numberOfPeople}`, 20, logoY + logoHeight + 140);
        pdf.text(`${t('numberOfChild')}: ${numberOfChild}`, 20, logoY + logoHeight + 150);
        {
            childSeat && pdf.text(`${t('childSeat')}: \u2713`, 20, logoY + logoHeight + 160);
        }


        pdf.text(t('carInformation'), 20, logoY + logoHeight + 175);
        pdf.text(`${t('carType')}: ${vehicleType}`, 20, logoY + logoHeight + 185);
        pdf.text(`${t('allPrice')}: ${vehiclePrice} ${currencyIcon}`, 20, logoY + logoHeight + 195);

        const fileName = `${formData.fullName.replace(/\s+/g, '_')}_Reservation.pdf`;
        pdf.save(fileName);
    };

    return (
        <>
            <div className={'form'}>
                <div className={'form__left-side'}>
                    <img src={logo} alt="DB Transfer"/>
                    <div className={'form__left-side__details'}>
                        <div className={'form__left-side__details__part'}>
                            <p className={'form__left-side__details__title'}>{t('reservationDetail')}</p>
                            <div className={'form__left-side__details__body'}>
                                <p className={'form__left-side__details__sub-title'}>{t('departureType')}: </p>
                                <p className={'form__left-side__details__sub-body'}>{tripType}</p>
                            </div>
                            <div className={'form__left-side__details__body'}>
                                <p className={'form__left-side__details__sub-title'}>{t('fromWhere')}: </p>
                                <p className={'form__left-side__details__sub-body'}>{destination}</p>
                            </div>
                            <div className={'form__left-side__details__body'}>
                                <p className={'form__left-side__details__sub-title'}>{t('where')}: </p>
                                <p className={'form__left-side__details__sub-body'}>{departure}</p>
                            </div>
                            <div className={'form__left-side__details__body'}>
                                <p className={'form__left-side__details__sub-title'}>{t('departureDateString')}: </p>
                                <p className={'form__left-side__details__sub-body'}>{departureDate}</p>
                            </div>
                            <div className={'form__left-side__details__body'}>
                                <p className={'form__left-side__details__sub-title'}>{t('returnDateString')}: </p>
                                <p className={'form__left-side__details__sub-body'}>{returnDate}</p>
                            </div>
                            <div className={'form__left-side__details__body-inputs'}>
                                <label>
                                    {t('hour')}:
                                    <input className={'form__left-side__details__body-hour__input'}
                                           placeholder={'Saat'}
                                           type="time"
                                           value={time}
                                           step={1800}
                                           onChange={(e) => setTime(e.target.value)}/>
                                </label>
                            </div>
                            <div className={'form__left-side__details__body-inputs'}>
                                <label>
                                    {t('numberOfPerson')}:
                                    <input
                                        className={'form__left-side__details__body-hour__input'}
                                        placeholder={'Kişi Sayısı'}
                                        type="number"
                                        value={numberOfPeople}
                                        onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
                                        min={1}
                                    />
                                </label>
                            </div>
                            <div className={'form__left-side__details__body-inputs'}>
                                <label>
                                    {t('numberOfChild')}:
                                    <input
                                        className={'form__left-side__details__body-hour__input'}
                                        placeholder={'Çocuk Sayısı'}
                                        type="number"
                                        value={numberOfChild}
                                        onChange={(e) => setNumberOfChild(parseInt(e.target.value))}
                                        min={0}
                                    />
                                </label>
                            </div>
                            <div className={'form__left-side__details__body-inputs'}>
                                <label>
                                    {t('childSeat')}:
                                    <input
                                        type="checkbox"
                                        checked={childSeat}
                                        className={'form__left-side__details__body-hour__input'}
                                        onChange={(e) => setChildSeat(e.target.checked)}
                                    />
                                </label>
                            </div>
                            <div className={'form__left-side__details__body-inputs'}>
                                <label>
                                    {t('carInformation')}:
                                </label>
                            </div>
                            <div className={'form__left-side__details__body-car'}>
                                <img src={img} alt="chosen-vehicle"/>
                                <div className={'form__left-side__details__body-car__attr'}>
                                    <p className={'form__left-side__details__body-car__type'}>{vehicleType}</p>
                                    <p className={'form__left-side__details__body-car__type'}>{vehiclePrice} {currencyIcon}</p>
                                    <p className={'form__left-side__details__body-car__price'}>{t('allPrice')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'form__right-side'}>
                    <form onSubmit={handleSubmit}>
                        <div className={'form__right-side__inputs'}>
                            <label>
                                {t('fullName')}*
                            </label>
                            <input placeholder={'Ad-Soyad'} type="text" name="fullName" value={formData.fullName}
                                   onChange={handleChange}/>
                        </div>
                        <div className={'form__right-side__inputs'}>
                            <label>
                                {t('telephone')}*
                            </label>
                            <input placeholder={'Telefon Numarası'} type="tel" name="phoneNumber"
                                   value={formData.phoneNumber} onChange={handleChange}/>
                        </div>
                        <div className={'form__right-side__inputs'}>
                            <label>
                                {t('email')}*
                            </label>
                            <input placeholder={'Email'} type="email" name="email" value={formData.email}
                                   onChange={handleChange}/>
                        </div>
                        <div className={'form__right-side__inputs'}>
                            <label>
                                {t('flightNumber')}*
                            </label>
                            <input placeholder={'Uçak No'} type="text" name="flightNumber" value={formData.flightNumber}
                                   onChange={handleChange}/>
                        </div>
                        <div className={'form__right-side__inputs'}>
                            <label>
                                {t('extraInformation')}:
                            </label>
                            <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange}/>
                        </div>
                        <div className={'form__right-side__button'}>
                            <button disabled={!formValid || isReservationSend} className={'form__right-side__buttons'}
                                    type="submit">
                                {t('send')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {notification && (
                <div className={`notification ${notification ? 'show' : ''}`}>
                    <p>{notification}</p>
                </div>
            )}
            <Footer/>
        </>
    );
};

export default Form;