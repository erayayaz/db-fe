import React from 'react';
import './WhyUs.scss';
import {useTranslation} from "react-i18next";
import maybach from "../../img/maybach.png";

const WhyUs: React.FC = () => {
    const {i18n} = useTranslation();
    const handleLanguageChange = async (newLang: string) => {
        await i18n.changeLanguage(newLang);
    };

    return (
        <div className={'whyus'}>
            <div className={'whyus-section'}>
                <img className={'whyus-section__img'} src={maybach} alt=""/>
                <p className={'whyus__title-brand'}>DB VIP Transfer</p>
                <p className={'whyus__title-guest'}>MİSAFİRLERİMİZ</p>
                <p className={'whyus__title-why'}>BİZİ NEDEN TERCİH EDİYORLAR?</p>
                <p className={'whyus-__reason'}>Misafirlerimizi konakladıkları yerden alıp istedikleri noktaya konforlu
                    bir şekilde ulaştırarak, kalite standartlarımıza bağlılığımızı sürdürüyoruz. Unutulmaz bir seyahat
                    deneyimi sunma misyonumuzla, her aşamada üst düzey hizmet sunmaktan gurur duyuyoruz.</p>

                <div className={'whyus__list'}>
                    <div className={'whyus__list-first'}>
                        <ul className={'whyus__list-ul'}>
                            <p>👍 Lüx Araçlar</p>
                            <p>👍 Kolay Ödeme</p>
                            <p>👍 Esnek Rezervasyon İmkanları</p>
                            <p>👍 VIP Hizmet</p>
                        </ul>
                    </div>
                    <div className={'whyus__list-second'}>
                        <ul className={'whyus__list-ul'}>
                            <p>👍 24/7 Destek Hattı</p>
                            <p>👍 Güleryüzlü Hizmet</p>
                            <p>👍 Güvenlik Standartları</p>
                            <p>👍 Standart Fiyat</p>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyUs;