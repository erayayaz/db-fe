import React from 'react';
import './About.scss';
import {useTranslation} from "react-i18next";
import Footer from "../Footer/Footer";
import Payments from "../Payments/Payments";

const About: React.FC = () => {
    const {i18n} = useTranslation();
    const handleLanguageChange = async (newLang: string) => {
        await i18n.changeLanguage(newLang);
    };

    return (
        <>
            <div className={'about-us'}>
                <p>
                    2023 yılında kurulan DB Transfer, transfer sektörüne hızlı bir giriş yaparak güvenilir ve düzenli taşımacılık hizmetleri sunmaktadır. Müşterilerimize güvenli ve konforlu bir yolculuk deneyimi sunmayı amaçlayan firmamız, geniş bir araç filosuna sahiptir.

                    Transfer ve taşımacılık alanında kaliteli hizmet sunmanın temel unsurlarından biri de yüksek standartlara sahip araçlardır. DB Transfer, bu gerekliliği yerine getirmek adına sürekli olarak araç filosunu güncellemekte ve genişletmektedir. Minibüs, otomobil ve diğer ulaşım ihtiyaçlarını karşılayan çeşitli araçlarımız, müşterilerimize çeşitli seçenekler sunmaktadır.

                    Ayrıca, firmamız uzman şoförlerle çalışarak transfer hizmetini güvenilir kılmaktadır. Deneyimli ve profesyonel şoförlerimiz sayesinde müşterilerimiz her zaman güven içinde seyahat edebilirler. DB Transfer, güvenilir taşımacılık için her detayı titizlikle planlar ve uygular.

                    DB Transfer, sürekli olarak sektöre yatırım yaparak ve hizmet kalitesini artırarak müşteri memnuniyetini ön planda tutmaktadır. 7/24 hizmet anlayışıyla çalışan firmamız, özellikle Dalaman Havalimanı'na ulaşan yolcular için konforlu ve sorunsuz transfer imkânları sunmaktadır.
                </p>
            </div>
            <Payments />
            <Footer />
        </>
    );
};

export default About;