import React, { useState, useEffect, useRef } from 'react';
import './CustomSelect.css';

const CustomSelect = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(props.options[0]);
    const selectRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        // Передаем выбранное значение в родительский компонент через колбэк-функцию
        props.onSelectChange(option);
    };

    const options = props.options.map((option, index) => (
        <div
            className={`option ${option === selectedOption ? 'selected' : ''}`}
            key={index}
            onClick={() => handleOptionClick(option)}
        >
            {option}
        </div>
    ));

    return (
        <div ref={selectRef} className={`custom-select ${isOpen ? 'open' : ''}`}>
            <div className="select-trigger" onClick={() => setIsOpen(!isOpen)}>
                {selectedOption}
            </div>
            {isOpen && (
                <div className="options-container">
                    <div className="options">{options}</div>
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
