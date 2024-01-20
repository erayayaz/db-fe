import React, {useState} from 'react';
import './Appointment.scss';
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import CustomDropdown from "../Dropdown/CustomDropdown";

interface IProps {
    searchButtonClicked: () => void;
}

const Appointment: React.FC<IProps> = (props) => {
    const [tripType, setTripType] = useState('Tek Yön');
    const [destination, setDestination] = useState('');
    const [departure, setDeparture] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();
    const {t} = useTranslation();

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
        {id: 21, name: 'Datça'},
        {id: 22, name: 'Hisarönü'},
        {id: 23, name: 'Ölüdeniz'},
        {id: 24, name: 'Söğüt'},
        {id: 25, name: 'Turunç'},
        {id: 26, name: 'İstanbul'},
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
            date,
        };

        props.searchButtonClicked();

        navigate('/reservation', {
            state: params,
        });
    }

    const isFormValid = tripType && departure && destination && date;
    return (
        <div className={'appointment'}>
            <div className="appointment-form">
                <form onSubmit={handleRedirect}>
                    <div>
                        <CustomDropdown
                            options={[
                                {id: 1, name: 'Tek Yön'},
                                {id: 2, name: 'Gidiş-Dönüş'},
                            ]}
                            placeholder={t('departureType')}
                            value={tripType}
                            onChange={(value) => setTripType(value)}
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

                    <div>
                        <label>
                            <input placeholder={'Gidiş'} type="date" value={date}
                                   onChange={(e) => setDate(e.target.value)}/>
                        </label>
                    </div>
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