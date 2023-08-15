import React from 'react'
import "./Modal.css"

const Modal = ({ onClose, children }) => {
    return (
        <div className="add__modal">
            <div className="modal__overlay"></div>
            <div className='modal-cross-container'>
                <span className="modal-cross" onClick={onClose}>X</span>
                {children}
            </div>
        </div>
    )
}

export default Modal