import React, {useEffect, useState} from 'react';
import './ReservationPanel.scss';
import axios from "axios";

interface Reservation {
    id: number;
    fullName: string;
    phoneNumber: string;
    email: string;
    flightNumber: string;
    additionalInfo: string;
    departureDate: string;
    returnDate: string;
    time: string;
    numberOfPeople: number;
    numberOfChild: number;
    childSeat: boolean;
    tripType: string;
    tripDestination: string;
    tripDeparture: string;
    vehicleType: string;
    vehiclePrice: string;
    reservationStatus: string;
}

const ReservationPanel: React.FC = () => {

    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showPending, setShowPending] = useState(true);

    const ITEMS_PER_PAGE = 8;
    const MAX_PAGE_BUTTONS = 3;
    useEffect(() => {
        if (showPending) {
            axios.get('http://localhost:8080/api/reservation/pending')
                .then(response => {
                    const reservations: Reservation[] = response.data;
                    setReservations(reservations);
                })
                .catch(error => {
                    console.error('Veri çekme hatası:', error);
                });
        } else {
            axios.get('http://localhost:8080/api/reservation/approved')
                .then(response => {
                    const reservations: Reservation[] = response.data;
                    setReservations(reservations);
                })
                .catch(error => {
                    console.error('Veri çekme hatası:', error);
                });
        }
    }, [showPending]);

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentReservations = reservations.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const isPaginationNeed = reservations.length > ITEMS_PER_PAGE;
    const lastPage = Math.ceil(reservations.length / ITEMS_PER_PAGE);
    const maxButtons = Math.min(MAX_PAGE_BUTTONS, lastPage);

    const renderPaginationButtons = () => {
        const buttons: React.ReactNode[] = [];

        if (lastPage <= MAX_PAGE_BUTTONS) {
            for (let i = 1; i <= lastPage; i++) {
                buttons.push(
                    <button
                        key={i}
                        onClick={() => paginate(i)}
                        className={i === currentPage ? 'active' : ''}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            const leftOffset = Math.max(1, currentPage - Math.floor(maxButtons / 2));
            const rightOffset = Math.min(lastPage, leftOffset + maxButtons - 1);

            if (leftOffset > 1) {
                buttons.push(
                    <button key="first" onClick={() => paginate(1)}>
                        İlk
                    </button>
                );
            }

            for (let i = leftOffset; i <= rightOffset; i++) {
                buttons.push(
                    <button
                        key={i}
                        onClick={() => paginate(i)}
                        className={i === currentPage ? 'active' : ''}
                    >
                        {i}
                    </button>
                );
            }

            if (rightOffset < lastPage) {
                buttons.push(
                    <button key="last" onClick={() => paginate(lastPage)}>
                        Son
                    </button>
                );
            }
        }

        return buttons;
    };

    const handleApproval = async (reservationId: number) => {
        try {
            const response = await axios.patch(`http://localhost:8080/api/reservation/approved/${reservationId}`);
            setReservations(response.data);
        } catch (error) {

        }
    };

    const handleDenial = async (reservationId: number) => {
        try {
            const response = await axios.patch(`http://localhost:8080/api/reservation/denial/${reservationId}`);
            setReservations(response.data);
            setShowPending(false);
        } catch (error) {

        }
    };

    const handleDelete = async (reservationId: number) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/reservation/${reservationId}`);
            setReservations(response.data);
        } catch (error) {

        }
    };

    return (
        <div className={'reservation-panel'}>

            <div className={'reservation-panel__switch'}>
                <span>Bekleyen Rezervasyonlar</span>
                <label className="switch">
                    <input type="checkbox" onChange={() => setShowPending(!showPending)}/>
                    <span className="slider round"></span>
                </label>
                <span>Onaylanmış Rezervasyonlar</span>
            </div>

            <table className={'reservation-panel__table'}>
                <thead>
                <tr>
                    <th>Ad-Soyad</th>
                    <th>Telefon</th>
                    <th>Mail</th>
                    <th>Uçuş No</th>
                    <th>Ek Bilgi</th>
                    <th>Gidiş Tarihi</th>
                    <th>Dönüş Tarihi</th>
                    <th>Saat</th>
                    <th>Kişi Sayısı</th>
                    <th>Çocuk Sayısı</th>
                    <th>Çocuk Koltuğu</th>
                    <th>Gidiş Türü</th>
                    <th>Nereden</th>
                    <th>Nereye</th>
                    <th>Araç Tipi</th>
                    <th>Fiyat</th>
                    <th>Aksiyon</th>
                </tr>
                </thead>
                <tbody>
                {currentReservations.map(reservation => (
                    <tr key={reservation.id}>
                        <td>{reservation.fullName}</td>
                        <td>{reservation.phoneNumber}</td>
                        <td>{reservation.email}</td>
                        <td>{reservation.flightNumber}</td>
                        <td>{reservation.additionalInfo}</td>
                        <td>{reservation.departureDate}</td>
                        <td>{reservation.returnDate}</td>
                        <td>{reservation.time}</td>
                        <td>{reservation.numberOfPeople}</td>
                        <td>{reservation.numberOfChild}</td>
                        <td>{reservation.childSeat ? 'Evet' : ' Hayır'}</td>
                        <td>{reservation.tripType}</td>
                        <td>{reservation.tripDestination}</td>
                        <td>{reservation.tripDeparture}</td>
                        <td>{reservation.vehicleType}</td>
                        <td>{reservation.vehiclePrice}</td>
                        <td>
                            {showPending ?
                                <button onClick={() => handleApproval(reservation.id)}>
                                    <span role="img" aria-label="Onayla">
                                        ✔️
                                    </span>
                                </button> :
                                <button onClick={() => handleDenial(reservation.id)}>
                                    <span role="img" aria-label="Onayı Geri Çevir">
                                        ↩️
                                    </span>
                                </button>
                            }

                            <button onClick={() => handleDelete(reservation.id)}>
                              <span role="img" aria-label="Sil">
                                ❌
                              </span>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {isPaginationNeed &&
                <div className={'reservation-panel__pagination'}>
                    {renderPaginationButtons()}
                </div>
            }

        </div>
    );
};

export default ReservationPanel;