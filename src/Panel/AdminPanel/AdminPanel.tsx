import React, {useState} from 'react';
import './AdminPanel.scss';
import ReservationPanel from "../ReservationPanel/ReservationPanel";
import Navbar from "../Navbar/Navbar";
import {useNavigate} from "react-router-dom";

interface IProps {
}

const AdminPanel: React.FC<IProps> = (props) => {
    const navigate = useNavigate();
    const [displayReservation, setDisplayReservation] = useState(true);

    const routeWebsite = () => {
        navigate('/');
        setDisplayReservation(false);
    }

    const routeReservation = () => {
        setDisplayReservation(true);
    }
    const routeReservation2 = () => {
        setDisplayReservation(false);
    }

    return (
        <div>
            <Navbar iconClicked={routeWebsite} reservationButton={routeReservation} reservationButton2={routeReservation2}/>
            {displayReservation && <ReservationPanel />}
        </div>

    );
};

export default AdminPanel;