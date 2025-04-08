import React, { useState } from 'react';
import { useWineRecommendations } from '../../hooks/useWineRecommendations';
import './detailCard.css';

function DetailCard({ selectedWineCategory }) {
    const { recommendedWines, loadingRecommendations } = useWineRecommendations(selectedWineCategory);
    const [currentDetailIndex, setCurrentDetailIndex] = useState(0);

    const handlePrev = () => {
        if (currentDetailIndex > 0) setCurrentDetailIndex(currentDetailIndex - 1);
    };

    const handleNext = () => {
        if (currentDetailIndex < recommendedWines.length - 1) setCurrentDetailIndex(currentDetailIndex + 1);
    };

    if (loadingRecommendations) {
        return <div className="detail-card">Loading wine recommendations...</div>;
    }
    if (recommendedWines.length === 0) {
        return <div className="detail-card">No wine recommendations available for this selection.</div>;
    }

    const product = recommendedWines[currentDetailIndex];

    return (
        <div className="detail-card">
            <h3>{product.title}</h3>
            <img src={product.imageUrl} alt={product.title} className="detail-card-image" />
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <p>Average rating: {product.averageRating}</p>
            <div className="pagination-controls">
                <button onClick={handlePrev} disabled={currentDetailIndex === 0}>Previous</button>
                <button onClick={handleNext} disabled={currentDetailIndex === recommendedWines.length - 1}>Next</button>
            </div>
        </div>
    );
}

export default DetailCard;
