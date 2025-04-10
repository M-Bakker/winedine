import React, { useState, useEffect } from 'react';
import FavoriteCard from '/src/components/favoriteCard/FavoriteCard.jsx';
import './favorites.css';
import line from "../../assets/images/line-2.png";
import heart from "../../assets/images/wine-heart.png";

function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        const favs = storedFavorites ? JSON.parse(storedFavorites) : [];
        setFavorites(favs);
    }, []);

    return (
        <main className="favorites-page">
            <section  className="favorites-section">
                <h1>Your Favorites</h1>
                {favorites.length === 0 ? (
                    <p>You have no favorites yet.</p>
                ) : (
                    <section className="favorites-cards">
                        {favorites.map((product, index) => (
                            <FavoriteCard key={product.id || index} product={product}/>
                        ))}
                    </section>
                )}
            </section>
            <figure className="line-2">
                <img  src={line} alt="Line 2"/>
            </figure>
            <section className="favorites-section">
                <figure>
                    <img className="wine-heart" src={heart} alt="Wine heart image"/>
                </figure>
            </section>
        </main>
    );
}

export default Favorites;
