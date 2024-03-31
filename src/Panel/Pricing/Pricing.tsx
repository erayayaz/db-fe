import React, {useEffect, useState} from 'react';
import './Pricing.scss';
import axios from "axios";
import CustomDropdown from "../../components/Dropdown/CustomDropdown";

interface Offer {
    id: number;
    startPointId: number;
    endPointId: number;
    sedanTrPrice: number;
    vitoTrPrice: number;
    sprinterTrPrice: number;
}

interface IProps {
}

const Pricing: React.FC<IProps> = (props) => {
    const [offers, setOffer] = useState<Offer[]>([]);
    const [departure, setDeparture] = useState('');

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

    const sortOffer = (offers : Offer[]) => {
        return [...offers].sort((a,b) => a.endPointId - b.endPointId)
    }
    useEffect(() => {
        if (departure.length > 1) {
            const departureRegion = notSortedRegions.find(region => region.name === departure);
            const startId = departureRegion?.id;
            axios.get(`https://db-be-d85969a6a61b.herokuapp.com/api/offer/${startId}`)
                .then(response => {
                    const cars: Offer[] = response.data;
                    const sortedOffers = sortOffer(cars);
                    setOffer(sortedOffers);
                })
                .catch(error => console.error('Veri çekme hatası:', error));
        }
    }, [departure]);

    const handlePriceChange = (id: number, startPointId: number, endPointId: number, sedanTrPrice: number,
                               vitoTrPrice: number, sprinterTrPrice: number) => {
        const newCar = {
            id: id,
            startPointId: startPointId,
            endPointId: endPointId,
            sedanTrPrice: sedanTrPrice,
            vitoTrPrice: vitoTrPrice,
            sprinterTrPrice: sprinterTrPrice,
        };

        axios.put(`https://db-be-d85969a6a61b.herokuapp.com/api/offer`, newCar)
            .then(response => {
                const cars: Offer[] = response.data;
                const sortedOffers = sortOffer(cars);
                setOffer(sortedOffers);
            })
            .catch(error => console.error('Fiyat güncelleme hatası:', error));
    };

    const returnEndPointName = (endPointId: number) => {
        const destinationRegion = notSortedRegions.find(region => region.id === endPointId);
        const destinationName = destinationRegion?.name;
        return destinationName;
    }

    return (
        <div className="pricing-container">
            <div className={'pricing-container__departure'}>
                <CustomDropdown
                    options={regions}
                    value={departure}
                    placeholder={'Kalkış'}
                    onChange={(value) => setDeparture(value)}
                />
            </div>
            <table className="pricing-table">
                <thead>
                <tr>
                    <th>Gidiş Yeri</th>
                    <th>Gidiş Fiyat - Sedan (Pound)</th>
                    <th>Gidiş Fiyat - Vito (Pound)</th>
                    <th>Gidiş Fiyat - Sprinter (Pound)</th>
                    <th>İşlemler</th>
                </tr>
                </thead>
                <tbody>
                {offers.map(offer => (
                    <tr key={offer.id}>
                        <td>{returnEndPointName(offer.endPointId)}</td>
                        <td>
                            <input
                                type="number"
                                value={offer.sedanTrPrice}
                                onChange={(e) => {
                                    const personLimit2 = parseFloat(e.target.value);
                                    setOffer(prevOffers => prevOffers.map(c => (c.id === offer.id ? {
                                        ...c,
                                        sedanTrPrice: personLimit2
                                    } : c)));
                                }}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={offer.vitoTrPrice}
                                onChange={(e) => {
                                    const luggageLimit2 = parseFloat(e.target.value);
                                    setOffer(prevCars => prevCars.map(c => (c.id === offer.id ? {
                                        ...c,
                                        vitoTrPrice: luggageLimit2
                                    } : c)));
                                }}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={offer.sprinterTrPrice}
                                onChange={(e) => {
                                    const newPrice = parseFloat(e.target.value);
                                    setOffer(prevCars => prevCars.map(c => (c.id === offer.id ? {
                                        ...c,
                                        sprinterTrPrice: newPrice
                                    } : c)));
                                }}
                            />
                        </td>
                        <td>
                            <button
                                onClick={() => handlePriceChange(offer.id, offer.startPointId, offer.endPointId, offer.sedanTrPrice, offer.vitoTrPrice, offer.sprinterTrPrice)}>Kaydet
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Pricing;
