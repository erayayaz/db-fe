import React, {useEffect, useState} from 'react';
import './Form.scss';
import {useTranslation} from "react-i18next";
import Footer from "../Footer/Footer";
import logo from "../../img/logo.png";
import {useLocation} from "react-router-dom";
import {jsPDF} from 'jspdf';
import axios from 'axios';

interface IProps {
}

const Form: React.FC<IProps> = (props) => {
    const {t} = useTranslation();

    const location = useLocation();
    const {tripType, destination, departure, date, vehicleId, vehiclePrice, vehicleType, img} = location.state || {};
    const [time, setTime] = useState('12:00');
    const [numberOfPeople, setNumberOfPeople] = useState(0);
    const [numberOfChild, setNumberOfChild] = useState(0);
    const [childSeat, setChildSeat] = useState(false);
    const [isReservationSend, setIsReservationSend] = useState(false);

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
            travelDate: date,
            time: time,
            numberOfPeople: numberOfPeople,
            numberOfChild: numberOfChild,
            childSeat: childSeat,
            tripType: tripType,
            tripDestination: destination,
            tripDeparture: departure,
            vehicleType: vehicleType,
            vehiclePrice: vehiclePrice,
        };
        sendReservation(reservation);
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


    const handleDownloadPDF = () => {
        const pdf = new jsPDF();
        const pageWidth = pdf.internal.pageSize.getWidth();
        const middleX = pageWidth / 2;
        const logoWidth = 50;
        const logoHeight = 20;

        const logoX = middleX - logoWidth / 2;
        const logoY = 20;

        pdf.addImage(logo, 'PNG', logoX, logoY, logoWidth, logoHeight);
        pdf.text(`Ad-Soyad: ${formData.fullName}`, 20, logoY + logoHeight + 20);
        pdf.text(`Telefon: ${formData.phoneNumber}`, 20, logoY + logoHeight + 30);
        pdf.text(`Email: ${formData.email}`, 20, logoY + logoHeight + 40);
        pdf.text(`Uçak No: ${formData.flightNumber}`, 20, logoY + logoHeight + 50);
        pdf.text(`Ek Bilgi: ${formData.additionalInfo}`, 20, logoY + logoHeight + 60);

        pdf.text(`Araç Bilgileri`, 20, logoY + logoHeight + 80);
        pdf.text(`Araç Tipi: ${vehicleType}`, 20, logoY + logoHeight + 90);
        pdf.text(`Fiyat: ${vehiclePrice}`, 20, logoY + logoHeight + 100);

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
                                <p className={'form__left-side__details__sub-title'}>{t('date')}: </p>
                                <p className={'form__left-side__details__sub-body'}>{date}</p>
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
                                    <p className={'form__left-side__details__body-car__type'}>{vehiclePrice} TL</p>
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
                            <button disabled={!formValid || isReservationSend} className={'form__right-side__buttons'} type="submit">
                                {t('send')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Form;