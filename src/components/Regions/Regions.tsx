import React, {useEffect} from 'react';
import './Regions.scss';
import {useTranslation} from "react-i18next";
import alanya from "../../img/routes/alanya.png";
import antalya from "../../img/routes/antalya.png";
import bozburun from "../../img/routes/bozburun.png";
import fethiye from "../../img/routes/fethiye.png";
import marmaris from "../../img/routes/marmaris.png";
import izmir from "../../img/routes/izmir.png";
import icmeler from "../../img/routes/içmeler.png";
import orhaniye from "../../img/routes/orhaniye.png";
import selimiye from "../../img/routes/selimiye.png";
import Footer from "../Footer/Footer";

const Regions: React.FC = () => {
    const {i18n} = useTranslation();
    const handleLanguageChange = async (newLang: string) => {
        await i18n.changeLanguage(newLang);
    };
    useEffect(() => {
        window.scrollTo(0, 0); // Sayfanın en üstüne scroll yap
    }, []); // Component mount olduğunda bir kez çalıştır

    const regionsData = [
        { id: 1, name: 'Alanya', image: alanya },
        { id: 2, name: 'Antalya', image: antalya },
        { id: 3, name: 'Bozburun', image: bozburun },
        { id: 4, name: 'Fethiye', image: fethiye },
        { id: 5, name: 'Marmaris', image: marmaris },
        { id: 6, name: 'İzmir', image: izmir },
        { id: 7, name: 'İçmeler', image: icmeler },
        { id: 8, name: 'Orhaniye', image: orhaniye },
        { id: 9, name: 'Selimiye', image: selimiye },
    ];

    return (
        <>
            <div className="regions">
                {regionsData.map(region => (
                    <div key={region.id} className="region">
                        <img src={region.image} alt={region.name} />
                        <div className={'regions__overlay-img'}>
                            <h3 className={'regions__overlay-text'}>{region.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </>

    );
};

export default Regions;