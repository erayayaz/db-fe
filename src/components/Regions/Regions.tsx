import React, {useEffect, useState} from 'react';
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
import returns from "../../img/return.png";
import Footer from "../Footer/Footer";
import {useTranslation} from "react-i18next";

const Regions: React.FC = () => {

    const {t} = useTranslation();

    const regionsData = [
        {id: 1, name: 'Alanya', image: alanya, text:t('alanya')},
        {id: 2, name: 'Antalya', image: antalya, text:t('antalya')},
        {id: 3, name: 'Bozburun', image: bozburun, text:t('bozburun')},
        {id: 4, name: 'Fethiye', image: fethiye, text:t('fethiye')},
        {id: 5, name: 'Marmaris', image: marmaris, text:t('marmaris')},
        {id: 6, name: 'İzmir', image: izmir, text:t('izmir')},
        {id: 7, name: 'İçmeler', image: icmeler, text:t('icmeler')},
        {id: 8, name: 'Orhaniye', image: orhaniye, text:t('orhaniye')},
        {id: 9, name: 'Selimiye', image: selimiye, text:t('selimiye')},
        {id: 10, name: 'Angels Marmaris', image: angelsMarmaris, text:t('angelsMarmaris')},
        {id: 11, name: 'Göcek', image: gocek, text:t('göcek')},
        {id: 12, name: 'Hillside Beach', image: hillsideBeach, text:t('hillsideBeach')},
        {id: 13, name: 'Liberty Hotels', image: libertyHotels, text:t('libertyHotels')},
        {id: 14, name: 'Marmaris Netsel Marina', image: marmarisNetselMarina, text:t('marmarisNetsel')},
        {id: 15, name: 'Marmaris Yatch Marina', image: marmarisYatchMarina, text:t('marmarisYatch')},
        {id: 16, name: 'Rixos Premium Göcek', image: rixosPremiumGocek, text:t('rixos')},
        {id: 17, name: 'Hilton Sarıgerme', image: hiltonSarigerme, text:t('sarıgerme')},
        {id: 18, name: 'Akyaka', image: akyaka, text:t('akyaka')},
        {id: 19, name: 'D-Marin', image: Dmarin, text:t('dmarin')},
        {id: 20, name: 'D-Maris Bay', image: Dmaris, text:t('dmaris')},
        {id: 21, name: 'Datça', image: datca, text:t('datca')},
        {id: 22, name: 'Hisarönü', image: hisaronu, text:t('oludeniz')},
        {id: 23, name: 'Ölüdeniz', image: oludeniz, text:t('hisaronu')},
        {id: 24, name: 'Söğüt', image: sogut, text:t('sogut')},
        {id: 25, name: 'Turunç', image: turunc, text:t('turunc')},
        {id: 26, name: 'İstanbul', image: istanbul, text:t('istanbul')},
    ];

    const sortRegions = () => {
        return [...regionsData].sort((a, b) => a.name.localeCompare(b.name));
    };

    const regions = sortRegions();

    const [isDetailOpen, setIsDetailyOpen] = useState(false);
    const [currentText, setCurrentText] = useState('');
    const [currentImage, setCurrentImage] = useState<any>();

    const handleClick = (id: number, text: string, image: any) => {
        setCurrentImage(image);
        setCurrentText(text);
        setIsDetailyOpen(true);
    }

    const handleClose = () => {
        setIsDetailyOpen(false);
        setCurrentImage(null);
        setCurrentText('text');
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [isDetailOpen]);

    return (
        <>
            <div className={`regions ${isDetailOpen ? 'inactive' : ''}`}>
                {!isDetailOpen && regions.map(region => (
                    <div key={region.id} className="region">
                        <img onClick={() => handleClick(region.id, region.text, region.image)} src={region.image} alt={region.name}/>
                        <div className={'regions__overlay-img'}>
                            <h3 className={'regions__overlay-text'}>{region.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
            {isDetailOpen &&
                <div className={'region-info'}>
                    <div className={'region-return'}>
                        <button onClick={handleClose} className={'region-return__button'}>
                            <img src={returns} alt={''}/>
                        </button>
                    </div>
                    <div className={'region-text'}>
                        <p>{currentText}</p>
                        <img src={currentImage} alt={''}/>
                    </div>
                </div>
            }
            <Footer/>
        </>

    );
};

export default Regions;