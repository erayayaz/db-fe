import React, {useEffect, useRef, useState} from 'react';
import './CustomDropdown.scss';

interface CustomDropdownProps {
    options: { id: number; name: string }[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string; // Placeholder eklenmiş props
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({options, value, onChange, placeholder}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSelected, setSelected] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (selectedValue: string) => {
        onChange(selectedValue);
        setSelected(true);
        setIsOpen(false);
    };

    const handleOutsideClick = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        if (placeholder === undefined) {
            setSelected(true);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div className="custom-dropdown" ref={dropdownRef}>
            <div className="selected-value" onClick={handleToggleDropdown}>
                {isSelected ? value : placeholder}
            </div>
            {isOpen && (
                <div className="options">
                    {options.map((option) => (
                        <div key={option.id} onClick={() => handleOptionClick(option.name)}>
                            {option.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
