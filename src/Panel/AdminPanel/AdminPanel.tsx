import React, {useState} from 'react';
import './AdminPanel.scss';
import ReservationPanel from "../ReservationPanel/ReservationPanel";
import Navbar from "../Navbar/Navbar";
import Pricing from "../Pricing/Pricing";
import User from "../User/User";

interface IProps {
    iconClicked: () => void;
}

const AdminPanel: React.FC<IProps> = (props) => {
    const [displayReservation, setDisplayReservation] = useState(true);
    const [displayPricing, setDisplayPricing] = useState(false);
    const [displayUser, setDisplayUser] = useState(false);


    const routeWebsite = () => {
        setDisplayReservation(false);
        props.iconClicked();
    }

    const routeReservation = () => {
        setDisplayReservation(true);
        setDisplayPricing(false);
        setDisplayUser(false);
    }

    const routePricing = () => {
        setDisplayReservation(false);
        setDisplayPricing(true);
        setDisplayUser(false);
    }

    const routeUser = () => {
        setDisplayReservation(false);
        setDisplayPricing(false);
        setDisplayUser(true);
    }

    return (
        <div>
            <Navbar iconClicked={routeWebsite}
                    reservationButton={routeReservation}
                    pricingButton={routePricing}
                    updateUser={routeUser}
            />
            {displayReservation && <ReservationPanel/>}
            {displayPricing && <Pricing/>}
            {displayUser && <User/>}
        </div>

    );
};

export default AdminPanel;