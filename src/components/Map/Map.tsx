import React, {useEffect} from 'react';
import './Map.scss';

const Map: React.FC = () => {
    useEffect(() => {
        const initMap = () => {
            const myLatLng = {lat: 141.0151, lng: 28.9983}; // Istanbul/Beylikdüzü koordinatları
            const googleMap = (window as any).google.maps;

            const map = new googleMap.Map(document.getElementById('map'), {
                zoom: 15,
                center: myLatLng,
            });

            new googleMap.Marker({
                position: myLatLng,
                map: map,
                title: 'Dükkanımızın Konumu',
            });
        };

        // TypeScript tarafında initMap fonksiyonunu global olarak tanımlıyoruz
        (window as any).initMap = initMap;

        // Eğer API yüklendiyse initMap fonksiyonunu çağır
        if ((window as any).google) {
            initMap();
        }
    }, []);

    return (
        <div id="map" className="map-container"></div>
    );
};

export default Map;