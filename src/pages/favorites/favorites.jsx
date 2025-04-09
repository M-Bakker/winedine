import React, { useState, useEffect } from 'react';
import FavoriteCard from '/src/components/favoriteCard/FavoriteCard.jsx';
import './favorites.css';

function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        const favs = storedFavorites ? JSON.parse(storedFavorites) : [];
        setFavorites(favs);
    }, []);

    return (
        <main className="favorites-page">
            <section>
                <h1>Your Favorites</h1>

            {favorites.length === 0 ? (
                <p>You have no favorites yet.</p>
            ) : (
                <section className="favorites-list">
                    {favorites.map((product, index) => (
                        <FavoriteCard key={product.id || index} product={product} />
                    ))}
                </section>
            )}
            </section>
        </main>
    );
}

export default Favorites;
