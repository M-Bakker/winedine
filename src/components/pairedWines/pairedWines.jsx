import React from 'react';
import './pairedWines.css';

function PairedWines({ wines = [], onWineClick, selectedWineCategory, text }) {
    return (
        <div className="paired-wines-container">
            <div className="paired-wines-list">
                {wines.map((wine, index) => (
                    <div
                        className={`paired-wine-box ${selectedWineCategory === wine ? 'active' : ''}`}
                        key={index}
                        onClick={() => onWineClick && onWineClick(wine)}
                    >
                        <h2>{wine}</h2>
                    </div>
                ))}
            </div>
            {text && <p className="pairing-text">{text}</p>}
        </div>
    );
}

export default PairedWines;