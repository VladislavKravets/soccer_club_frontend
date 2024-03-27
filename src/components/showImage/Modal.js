import React from 'react';

function Modal({ imageUrl, onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content">
                <span className="modal-close" onClick={onClose}>×</span> {/* Хрестик для закриття */}
                <img src={imageUrl} alt="Фотографія" />
            </div>
        </div>
    );
}

export default Modal;
