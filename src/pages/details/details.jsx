import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import addToFavoritesIcon from '/src/assets/images/add-to-favorites-icon.png';
import checkFavoritesIcon from '/src/assets/images/check-favorites-icon.png';
import './details.css';

function DetailPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const {product} = location.state || {};
    const [isFavorite, setIsFavorite] = useState(false);
    const loadFavorites = () => {
        const storedFavorites = localStorage.getItem('favorites');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    };

    useEffect(() => {
        if (product && product.id) {
            const favorites = loadFavorites();
            const exists = favorites.some(fav => String(fav.id) === String(product.id));
            setIsFavorite(exists);
        }
    }, [product]);

    const toggleFavorite = () => {
        const favorites = loadFavorites();
        let updatedFavorites;
        if (favorites.some(fav => String(fav.id) === String(product.id))) {
            updatedFavorites = favorites.filter(fav => String(fav.id) !== String(product.id));
            setIsFavorite(false);
        } else {
            updatedFavorites = [...favorites, product];
            setIsFavorite(true);
        }
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    if (!product) {
        return (
            <div className="details-section">
                <p>No product data available.</p>
                <button onClick={() => navigate(-1)}>Go back</button>
            </div>
        );
    }

    const {title, description, imageUrl, price, averageRating, link} = product;

    return (
        <main className="details-section">
            <section className="details-content">
                <h1>{title}</h1>
                <div className="details-info">
                    <p>{description}</p>
                    <p>Price: {price}</p>
                    <p>Average rating: {averageRating}</p>
                    <div className="details-buttons">
                        <button>
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="buy-button"
                            >
                                Buy
                            </a>
                        </button>
                        <button className="back-button" onClick={() => navigate(-1)}>Go back</button>
                    </div>
                </div>
            </section>
            <section>
                <figure className="details-image">
                    <img src={imageUrl} alt={title}/>
                </figure>
                <button
                    className="favorite-button"
                    onClick={toggleFavorite}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    aria-label="Toggle Favorite"
                >
                    {isFavorite ? <img src={checkFavoritesIcon} alt="Add to favorites" /> :
                        <img src={addToFavoritesIcon} alt="Already in favorites"/>}
                </button>
            </section>
        </main>
    );
}

export default DetailPage;

