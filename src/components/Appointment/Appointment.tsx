import React, {useState} from 'react';
import './Appointment.scss';
import {useNavigate} from "react-router-dom";

interface IProps {
    searchButtonClicked: () => void;
}

const Appointment: React.FC<IProps> = (props) => {
    const [tripType, setTripType] = useState('Tek Yön');
    const [destination, setDestination] = useState('Ankara');
    const [departure, setDeparture] = useState('İzmir');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    const handleRedirect = () => {
        const params = {
            tripType,
            destination,
            departure,
            date,
        };

        props.searchButtonClicked();
        console.log('Gidiş-Dönüş:', tripType);
        console.log('Nereden Gidecekleri:', departure);
        console.log('Gidecekleri Yer:', destination);
        console.log('Tarih:', date);

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
                            Gidiş Türü
                            <select value={tripType} onChange={(e) => setTripType(e.target.value)}>
                                <option value="Tek Yön"> {'\u21c0'} Tek Yön</option>
                                <option value="Gidiş-Dönüş">{'\u21CB'} Gidiş-Dönüş</option>
                            </select>
                        </label>
                    </div>

                    <div>
                        <label>
                            Nereden
                            <select value={departure} onChange={(e) => setDeparture(e.target.value)}>
                                <option value="Ankara">Ankara</option>
                                <option value="İstanbul">İstanbul</option>
                            </select>
                        </label>
                    </div>

                    <div>
                        <label>
                            Nereye
                            <select value={destination} onChange={(e) => setDestination(e.target.value)}>
                                <option value="İzmir">İzmir</option>
                                <option value="Muğla">Muğla</option>
                            </select>
                        </label>
                    </div>

                    <div>
                        <label>
                            Tarih
                            <input placeholder={'Gidiş'} type="date" value={date}
                                   onChange={(e) => setDate(e.target.value)}/>
                        </label>
                    </div>
                    <div className={'appointment-button'}>
                        <button onClick={handleRedirect} className={'apt-button'} type="submit">
                            Ara
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Appointment;