import React from 'react';
import {useNavigate} from 'react-router-dom';
import './favoriteCard.css';

function FavoriteCard({product}) {
    const navigate = useNavigate();

    const trimDescription = (description) => {
        if (!description) return "";
        return description.length > 200 ? description.slice(0, 200) + "..." : description;
    };

    const handleCardClick = () => {
        navigate(`/details`, {state: {product}});
    };

    return (
        <div className="favorites">
            <div className="favorites-card" onClick={handleCardClick} style={{cursor: 'pointer'}}>
                <section className="favorites-card-info">
                    <h2>{product.title}</h2>
                    <p>{trimDescription(product.description)}</p>
                    <p>Price: {product.price}</p>
                    <p>Average rating: {product.averageRating}</p>
                </section>
                <section className="favorites-card-image">
                    <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="favorites-card-image"
                    />
                </section>
            </div>
        </div>
    );
}

export default FavoriteCard;
