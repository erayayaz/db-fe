import React, {useState} from 'react';
import './Appointment.scss';
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

interface IProps {
    searchButtonClicked: () => void;
}

const Appointment: React.FC<IProps> = (props) => {
    const [tripType, setTripType] = useState('Tek Yön');
    const [destination, setDestination] = useState('Ankara');
    const [departure, setDeparture] = useState('İzmir');
    const [date, setDate] = useState('');
    const navigate = useNavigate();
    const {t} = useTranslation();

    const handleRedirect = () => {
        const params = {
            tripType,
            destination,
            departure,
            date,
        };

        props.searchButtonClicked();

        navigate('/reservation', {
            state: params,
        });
    }

    return (
        <div className={'appointment'}>
            <div className="appointment-form">
                <form onSubmit={handleRedirect}>
                    <div>
                        <label>
                            {t('departureType')}
                            <select value={tripType} onChange={(e) => setTripType(e.target.value)}>
                                <option value="Tek Yön"> {'\u21c0'} {t('oneWay')}</option>
                                <option value="Gidiş-Dönüş">{'\u21CB'} {t('ways')}</option>
                            </select>
                        </label>
                    </div>

                    <div>
                        <label>
                            {t('fromWhere')}
                            <select value={departure} onChange={(e) => setDeparture(e.target.value)}>
                                <option value="Ankara">Ankara</option>
                                <option value="İstanbul">İstanbul</option>
                            </select>
                        </label>
                    </div>

                    <div>
                        <label>
                            {t('where')}
                            <select value={destination} onChange={(e) => setDestination(e.target.value)}>
                                <option value="İzmir">İzmir</option>
                                <option value="Muğla">Muğla</option>
                            </select>
                        </label>
                    </div>

                    <div>
                        <label>
                            {t('date')}
                            <input placeholder={'Gidiş'} type="date" value={date}
                                   onChange={(e) => setDate(e.target.value)}/>
                        </label>
                    </div>
                    <div className={'appointment-button'}>
                        <button onClick={handleRedirect} className={'apt-button'} type="submit">
                            {t('search')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Appointment;