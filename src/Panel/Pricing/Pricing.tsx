import React, {useEffect, useState} from 'react';
import './Pricing.scss';
import axios from "axios";

interface Car {
    id: number;
    personLimit: number;
    luggageLimit: number;
    carType: string;
    price: number;
    doublePrice: number;
    priceEur: number;
    doublePriceEur: number;
    priceUsd: number;
    doublePriceUsd: number;
}

interface IProps {
}

const Pricing: React.FC<IProps> = (props) => {
    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/car')
            .then(response => setCars(response.data))
            .catch(error => console.error('Veri çekme hatası:', error));
    }, []);

    const handlePriceChange = (id: number, carType: string, personLimit: number, luggageLimit: number, newPrice: number,
                               newDoublePrice: number, newPriceEur: number, newDoubleEurPrice: number, newPriceUsd: number,
                               newDoublePriceUsd: number) => {
        const newCar = {
            id: id,
            carType: carType,
            personLimit: personLimit,
            luggageLimit: luggageLimit,
            price: newPrice,
            doublePrice: newDoublePrice,
            priceEur: newPriceEur,
            doublePriceEur: newDoubleEurPrice,
            priceUsd: newPriceUsd,
            doublePriceUsd: newDoublePriceUsd,
        };

        axios.put(`http://localhost:8080/api/car`, newCar)
            .then(response => {
                const cars: Car[] = response.data;
                setCars(cars);
            })
            .catch(error => console.error('Fiyat güncelleme hatası:', error));
    };

    return (
        <div className="pricing-container">
            <table className="pricing-table">
                <thead>
                <tr>
                    <th>Araç Tipi</th>
                    <th>Kişi Limiti</th>
                    <th>Bagaj Limiti</th>
                    <th>Gidiş Fiyat (TL)</th>
                    <th>Gidiş-Dönüş Fiyat (TL)</th>
                    <th>Gidiş Fiyat (Eur)</th>
                    <th>Gidiş-Dönüş Fiyat (Eur)</th>
                    <th>Gidiş Fiyat (Usd)</th>
                    <th>Gidiş-Dönüş Fiyat (Usd)</th>
                    <th>İşlemler</th>
                </tr>
                </thead>
                <tbody>
                {cars.map(car => (
                    <tr key={car.id}>
                        <td>{car.carType}</td>
                        <td>
                            <input
                                type="number"
                                value={car.personLimit}
                                onChange={(e) => {
                                    const personLimit2 = parseFloat(e.target.value);
                                    setCars(prevCars => prevCars.map(c => (c.id === car.id ? {
                                        ...c,
                                        personLimit: personLimit2
                                    } : c)));
                                }}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={car.luggageLimit}
                                onChange={(e) => {
                                    const luggageLimit2 = parseFloat(e.target.value);
                                    setCars(prevCars => prevCars.map(c => (c.id === car.id ? {
                                        ...c,
                                        luggageLimit: luggageLimit2
                                    } : c)));
                                }}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={car.price}
                                onChange={(e) => {
                                    const newPrice = parseFloat(e.target.value);
                                    setCars(prevCars => prevCars.map(c => (c.id === car.id ? {
                                        ...c,
                                        price: newPrice
                                    } : c)));
                                }}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={car.doublePrice}
                                onChange={(e) => {
                                    const newDoublePrice = parseFloat(e.target.value);
                                    setCars(prevCars => prevCars.map(c => (c.id === car.id ? {
                                        ...c,
                                        doublePrice: newDoublePrice
                                    } : c)));
                                }}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={car.priceEur}
                                onChange={(e) => {
                                    const newPrice = parseFloat(e.target.value);
                                    setCars(prevCars => prevCars.map(c => (c.id === car.id ? {
                                        ...c,
                                        priceEur: newPrice
                                    } : c)));
                                }}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={car.doublePriceEur}
                                onChange={(e) => {
                                    const newDoublePrice = parseFloat(e.target.value);
                                    setCars(prevCars => prevCars.map(c => (c.id === car.id ? {
                                        ...c,
                                        doublePriceEur: newDoublePrice
                                    } : c)));
                                }}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={car.priceUsd}
                                onChange={(e) => {
                                    const newPrice = parseFloat(e.target.value);
                                    setCars(prevCars => prevCars.map(c => (c.id === car.id ? {
                                        ...c,
                                        priceUsd: newPrice
                                    } : c)));
                                }}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={car.doublePriceUsd}
                                onChange={(e) => {
                                    const newDoublePrice = parseFloat(e.target.value);
                                    setCars(prevCars => prevCars.map(c => (c.id === car.id ? {
                                        ...c,
                                        doublePriceUsd: newDoublePrice
                                    } : c)));
                                }}
                            />
                        </td>
                        <td>
                            <button
                                onClick={() => handlePriceChange(car.id, car.carType, car.personLimit, car.luggageLimit, car.price, car.doublePrice, car.priceEur, car.doublePriceEur, car.priceUsd, car.doublePriceUsd)}>Kaydet
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
