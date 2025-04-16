import React from 'react';

function SearchFavoritesInput({ value, onChange }) {
    return (
        <input
            type="text"
            placeholder="Search favorites..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="input-field"
        />
    );
}

export default SearchFavoritesInput;