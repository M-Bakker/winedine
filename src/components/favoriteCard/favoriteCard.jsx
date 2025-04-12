import React from 'react';
import { useNavigate } from 'react-router-dom';
import './favoriteCard.css';
import deleteFavorite from "../../assets/images/delete-favorites-icon.png";

function FavoriteCard({ product, onRemove }) {
    const navigate = useNavigate();

    const trimDescription = (description) => {
        if (!description) return "";
        return description.length > 200 ? description.slice(0, 200) + "..." : description;
    };

    const handleCardClick = () => {
        navigate(`/details`, { state: { product } });
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        const storedFavorites = localStorage.getItem('favorites');
        const favs = storedFavorites ? JSON.parse(storedFavorites) : [];
        const updatedFavorites = favs.filter(fav => String(fav.id) !== String(product.id));
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        if (onRemove) {
            onRemove(product.id);
        }
    };

    return (
        <div className="favorites">
            <div className="favorites-card" onClick={handleCardClick} style={{ cursor: 'pointer', position: 'relative' }}>
                <div className="favorites-trash" onClick={handleRemove} style={{ position: 'absolute', top: 5, right: 5, cursor: 'pointer' }}>
                    <img src={deleteFavorite} alt="Remove from favorites"/>
                </div>
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
