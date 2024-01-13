import React from 'react';
import './Media.scss';
import {useTranslation} from "react-i18next";
import fam1 from "../../img/media/fam1.png";
import fam2 from "../../img/media/fam2.png";
import fam3 from "../../img/media/fam3.png";
import fam4 from "../../img/media/fam4.png";
import fam5 from "../../img/media/fam5.png";
import fam6 from "../../img/media/fam6.png";
import Footer from "../Footer/Footer";


const Media: React.FC = () => {
    const {i18n} = useTranslation();
    const handleLanguageChange = async (newLang: string) => {
        await i18n.changeLanguage(newLang);
    };

    const images = [
        {id: 1, url: fam1, name: 'fam1'},
        {id: 2, url: fam2, name: 'fam2'},
        {id: 3, url: fam3, name: 'fam3'},
        {id: 4, url: fam4, name: 'fam4'},
        {id: 5, url: fam5, name: 'fam5'},
        {id: 6, url: fam6, name: 'fam6'},
    ]

    return (
        <>
            <div className={'media'}>
                {images.map((image, index) => (
                    <div key={index} className="media-item">
                        <img src={image.url} alt={`Image ${index + 1}`}/>
                    </div>
                ))}
            </div>
            <Footer />
        </>

    );
};

export default Media;