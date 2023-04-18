import React from 'react'

export const BurguerButton = ({ handleClick, isOpen }) => {
    return (
        <div
            onClick={handleClick}
            className={`icon nav-icon-5 ${isOpen ? 'open' : ''}`}
        >
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}
