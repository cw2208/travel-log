import React from 'react';

export function BackButton() {
    return(
        <div className="back-container">
            <img className="back-icon" src="img/back.svg" alt="Back" width="16" height="16" />
            <button aria-label="Back" className="back-button">Back</button>
        </div>
    )
}