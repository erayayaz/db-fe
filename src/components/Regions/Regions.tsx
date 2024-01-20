import React, {useEffect} from 'react';
import './Regions.scss';
import alanya from "../../img/routes/alanya.png";
import antalya from "../../img/routes/antalya.png";
import bozburun from "../../img/routes/bozburun.png";
import fethiye from "../../img/routes/fethiye.png";
import marmaris from "../../img/routes/marmaris.png";
import izmir from "../../img/routes/izmir.png";
import icmeler from "../../img/routes/içmeler.png";
import orhaniye from "../../img/routes/orhaniye.png";
import selimiye from "../../img/routes/selimiye.png";
import angelsMarmaris from "../../img/routes/angelsMarmaris.png";
import Dmarin from "../../img/routes/D-marin.png";
import Dmaris from "../../img/routes/D-maris.png";
import datca from "../../img/routes/datça.png";
import gocek from "../../img/routes/göcek.png";
import hillsideBeach from "../../img/routes/hillsideBeach.png";
import hiltonSarigerme from "../../img/routes/hiltonSarıgerme.png";
import hisaronu from "../../img/routes/hisarönü.png";
import marmarisNetselMarina from "../../img/routes/marmarisNetselMarina.png";
import marmarisYatchMarina from "../../img/routes/marmarisYatchMarina.png";
import sogut from "../../img/routes/söğüt.png";
import oludeniz from "../../img/routes/ölüdeniz.png";
import turunc from "../../img/routes/Turunc.png";
import rixosPremiumGocek from "../../img/routes/rixosPremiumGöcek.png";
import akyaka from "../../img/routes/akyaka.png";
import libertyHotels from "../../img/routes/libertyHotels.png";
import istanbul from "../../img/routes/istanbul.png";

import Footer from "../Footer/Footer";

const Regions: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0); // Sayfanın en üstüne scroll yap
    }, []); // Component mount olduğunda bir kez çalıştır

    const regionsData = [
        {id: 1, name: 'Alanya', image: alanya},
        {id: 2, name: 'Antalya', image: antalya},
        {id: 3, name: 'Bozburun', image: bozburun},
        {id: 4, name: 'Fethiye', image: fethiye},
        {id: 5, name: 'Marmaris', image: marmaris},
        {id: 6, name: 'İzmir', image: izmir},
        {id: 7, name: 'İçmeler', image: icmeler},
        {id: 8, name: 'Orhaniye', image: orhaniye},
        {id: 9, name: 'Selimiye', image: selimiye},
        {id: 10, name: 'Angels Marmaris', image: angelsMarmaris},
        {id: 11, name: 'Göcek', image: gocek},
        {id: 12, name: 'Hillside Beach', image: hillsideBeach},
        {id: 13, name: 'Liberty Hotels', image: libertyHotels},
        {id: 14, name: 'Marmaris Netsel Marina', image: marmarisNetselMarina},
        {id: 15, name: 'Marmaris Yatch Marina', image: marmarisYatchMarina},
        {id: 16, name: 'Rixos Premium Göcek', image: rixosPremiumGocek},
        {id: 17, name: 'Hilton Sarıgerme', image: hiltonSarigerme},
        {id: 18, name: 'Akyaka', image: akyaka},
        {id: 19, name: 'D-Marin', image: Dmarin},
        {id: 20, name: 'D-Maris Bay', image: Dmaris},
        {id: 21, name: 'Datça', image: datca},
        {id: 22, name: 'Hisarönü', image: hisaronu},
        {id: 23, name: 'Ölüdeniz', image: oludeniz},
        {id: 24, name: 'Söğüt', image: sogut},
        {id: 25, name: 'Turunç', image: turunc},
        {id: 26, name: 'İstanbul', image: istanbul},
    ];

    const sortRegions = () => {
        return [...regionsData].sort((a, b) => a.name.localeCompare(b.name));
    };

    const regions = sortRegions();

    return (
        <>
            <div className="regions">
                {regions.map(region => (
                    <div key={region.id} className="region">
                        <img src={region.image} alt={region.name}/>
                        <div className={'regions__overlay-img'}>
                            <h3 className={'regions__overlay-text'}>{region.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
            <Footer/>
        </>

    );
};

export default Regions;