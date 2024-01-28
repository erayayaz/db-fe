import React, { useState } from 'react';
import './VehicleGallery.scss';
import sedan1 from "../../img/vehicles/sedan1.png";
import vito1 from "../../img/vehicles/vito1.png";
import vito2 from "../../img/vehicles/vito2.png";
import vito3 from "../../img/vehicles/vito3.png";
import sprinter1 from "../../img/vehicles/sprinter1.png";
import sprinter2 from "../../img/vehicles/sprinter2.png";
import sprinter3 from "../../img/vehicles/sprinter3.png";

interface VehicleGalleryProps {
    vehicleId: number;
    onClose: () => void;
}

const VehicleGallery: React.FC<VehicleGalleryProps> = ({ vehicleId, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [[sedan1, sedan1, sedan1], [vito1, vito2, vito3], [sprinter1, sprinter2, sprinter3]]

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
                <img src={images[vehicleId][currentImageIndex]} alt="Vehicle" />
                <button className="next" onClick={handleNext}>
                    &#10095;
                </button>
            </div>
        </div>
    );
};

export default VehicleGallery;
