import React, {useState} from 'react';
import {useWineRecommendations} from '../../hooks/useWineRecommendations';
import './detailCard.css';

function DetailCard({selectedWineCategory}) {
    const {recommendedWines, loadingRecommendations} = useWineRecommendations(selectedWineCategory);
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

    const trimDescription = (description) => {
        if (!description) return "";
        return description.length > 200 ? description.slice(0, 200) + "..." : description;
    };

    const handleCardClick = () => {
        // Zorg dat product.id aanwezig is; als dit niet het geval is,
        // kun je eventueel een fallback toepassen (bijvoorbeeld index).
        navigate(`/detailPage?id=${product.id}`);
    };
    return (
        <div className="recommendations">
        <div className="detail-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <div className="detail-card-info">
                <h3>{product.title}</h3>
                <p>{trimDescription(product.description)}</p>
                <p>Price: {product.price}</p>
                <p>Average rating: {product.averageRating}</p>

            </div>
            <div className="detail-card-img">
                <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="detail-card-image"
                />
            </div>

        </div>
            <div className="pagination-controls">
                <button onClick={handlePrev} disabled={currentDetailIndex === 0}>Previous</button>
                <button onClick={handleNext} disabled={currentDetailIndex === recommendedWines.length - 1}>Next
                </button>
            </div>
        </div>

    );
}

export default DetailCard;
