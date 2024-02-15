import React, {useState} from 'react';
import './VehicleGallery.scss';
import sedan1 from "../../img/vehicles/sedan1.png";
import wito1 from "../../img/vehicles/wito1.png";
import wito2 from "../../img/vehicles/wito2.png";
import wito3 from "../../img/vehicles/wito3.png";
import sprinter1 from "../../img/vehicles/sprinter1.png";
import sprinter2 from "../../img/vehicles/sprinter2.png";
import sprinter3 from "../../img/vehicles/sprinter3.png";

interface VehicleGalleryProps {
    vehicleId: number;
    onClose: () => void;
}

const VehicleGallery: React.FC<VehicleGalleryProps> = ({vehicleId, onClose}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [[sedan1, sedan1, sedan1], [wito1, wito2, wito3], [sprinter1, sprinter2, sprinter3]]

    const handlePrev = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
    };

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
    };

    return (
        <div className="vehicle-gallery">
      <span className="close" onClick={onClose}>
        &times;
      </span>
            <div className="gallery-content">
                <button className="prev" onClick={handlePrev}>
                    &#10094;
                </button>
                <img src={images[vehicleId][currentImageIndex]} alt="Vehicle"/>
                <button className="next" onClick={handleNext}>
                    &#10095;
                </button>
            </div>
        </div>
    );
};

export default VehicleGallery;
