import React, { useEffect, useState } from 'react';
import { useWineRecommendations } from '../../hooks/useWineRecommendations';
import { useNavigate } from 'react-router-dom';
import './detailCard.css';

function DetailCard({ selectedWineCategory }) {
    const navigate = useNavigate();
    const { recommendedWines, loadingRecommendations } = useWineRecommendations(selectedWineCategory);
    const [currentDetailIndex, setCurrentDetailIndex] = useState(0);
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        setCurrentDetailIndex(0);
    }, [selectedWineCategory]);

    useEffect(() => {
        setCurrentDetailIndex(0);
    }, [maxPrice]);

    const handlePrev = () => {
        if (currentDetailIndex > 0) setCurrentDetailIndex(currentDetailIndex - 1);
    };

    const handleNext = () => {
        if (currentDetailIndex < filteredWines.length - 1) setCurrentDetailIndex(currentDetailIndex + 1);
    };

    const filteredWines = recommendedWines.filter(wine => {
        if (maxPrice === '') return true;

        const numericPrice = parseFloat(wine.price?.replace(/[^0-9.,]/g, '').replace(',', '.'));
        return !isNaN(numericPrice) && numericPrice <= parseFloat(maxPrice);
    });

    if (loadingRecommendations) {
        return <div className="detail-card">Loading wine recommendations...</div>;
    }

    if (filteredWines.length === 0) {
        return (
            <section className="recommendations">
                <div>
                        <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            placeholder="Max price"
                            min="0"
                            className="input-field"
                        />
                </div>
                <div className="detail-card">No wines available below this price.</div>
            </section>
        );
    }

    const product = filteredWines[currentDetailIndex];

    const trimDescription = (description) => {
        if (!description) return "";
        return description.length > 200 ? description.slice(0, 200) + "..." : description;
    };

    const handleCardClick = () => {
        navigate(`/details`, { state: { product } });
    };

    return (
        <section className="recommendations">
            <div>
                <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="Max price"
                        min="0"
                        className="input-field"
                    />
            </div>
            <div className="detail-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
                <div className="detail-card-info">
                    <h2>{product.title}</h2>
                    <p>{trimDescription(product.description)}</p>
                    <p>Price: {product.price}</p>
                    <p>Average rating: {product.averageRating}</p>
                </div>
                <div className="detail-card-image">
                    <img src={product.imageUrl} alt={product.title} />
                </div>
            </div>
            <div className="pagination-controls">
                <button onClick={handlePrev} disabled={currentDetailIndex === 0}>Previous</button>
                <button onClick={handleNext} disabled={currentDetailIndex >= filteredWines.length - 1}>Next</button>
            </div>
        </section>
    );
}

export default DetailCard;
