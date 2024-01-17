import React, { useEffect, useState } from 'react';
import './Pricing.scss';
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Car {
    id: number;
    personLimit: number;
    luggageLimit: number;
    carType: string;
    price: number;
}

interface IProps {
}

const Pricing: React.FC<IProps> = (props) => {
    const [cars, setCars] = useState<Car[]>([]);

    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:8080/api/car')
            .then(response => setCars(response.data))
            .catch(error => console.error('Veri çekme hatası:', error));
    }, []);

    const handlePriceChange = (id: number, carType:string, personLimit:number, luggageLimit:number, newPrice: number) => {
        const newCar = {
            id: id,
            carType: carType,
            personLimit: personLimit,
            luggageLimit: luggageLimit,
            price: newPrice,
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
                    <th>Fiyat (TL)</th>
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
                                    setCars(prevCars => prevCars.map(c => (c.id === car.id ? { ...c, personLimit: personLimit2 } : c)));
                                }}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={car.luggageLimit}
                                onChange={(e) => {
                                    const luggageLimit2 = parseFloat(e.target.value);
                                    setCars(prevCars => prevCars.map(c => (c.id === car.id ? { ...c, luggageLimit: luggageLimit2 } : c)));
                                }}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={car.price}
                                onChange={(e) => {
                                    const newPrice = parseFloat(e.target.value);
                                    setCars(prevCars => prevCars.map(c => (c.id === car.id ? { ...c, price: newPrice } : c)));
                                }}
                            />
                        </td>
                        <td>
                            <button onClick={() => handlePriceChange(car.id, car.carType, car.personLimit, car.luggageLimit, car.price)}>Kaydet</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Pricing;
