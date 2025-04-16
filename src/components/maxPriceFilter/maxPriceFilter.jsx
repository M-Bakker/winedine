import React from 'react';
import './MaxPriceFilter.css';

function MaxPriceFilter({ maxPrice, onChange }) {
    return (
        <div className="max-price-filter">
            <input
                type="number"
                value={maxPrice}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Max price"
                min="0"
                className="input-field"
            />
        </div>
    );
}

export default MaxPriceFilter;