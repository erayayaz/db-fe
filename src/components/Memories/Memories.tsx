import React from 'react';
import './Memories.scss';
import {useTranslation} from "react-i18next";
import fam1 from "../../img/media/fam1.png";
import fam2 from "../../img/media/fam2.png";
import fam3 from "../../img/media/fam3.png";
import fam4 from "../../img/media/fam4.png";
import fam5 from "../../img/media/fam5.png";
import fam6 from "../../img/media/fam6.png";


const Memories: React.FC = () => {
    const {t} = useTranslation();

    const images = [
        {id: 1, url: fam1, name: 'fam1'},
        {id: 2, url: fam2, name: 'fam2'},
        {id: 3, url: fam3, name: 'fam3'},
        {id: 4, url: fam4, name: 'fam4'},
        {id: 5, url: fam5, name: 'fam5'},
        {id: 6, url: fam6, name: 'fam6'},
    ]

    return (
        <div className={'memories'}>
            <p className={'memories-title'}>{t('yourPhotos')}</p>
            <p className={'memories-small-title'}>{t('memories')}</p>

            <div className={'memories-images'}>
                {images.map((image, index) => (
                    <div key={index} className="memories-item">
                        <img src={image.url} alt={`Image ${index + 1}`}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Memories;