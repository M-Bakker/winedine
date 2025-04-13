import React, { useState, useEffect } from 'react';
import FavoriteCard from '/src/components/favoriteCard/FavoriteCard.jsx';
import './favorites.css';
import line from "../../assets/images/line-2.png";
import heart from "../../assets/images/wine-heart.png";

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const loadFavorites = () => {
        const storedFavorites = localStorage.getItem('favorites');
        const favs = storedFavorites ? JSON.parse(storedFavorites) : [];
        setFavorites(favs);
    };

    useEffect(() => {
        loadFavorites();
    }, []);

    const handleRemoveFavorite = () => {
        loadFavorites();
    };

    const filteredFavorites = favorites.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="favorites-page">
            <section className="page-section">
                <h1>Your Favorites</h1>
                <input
                    type="text"
                    placeholder="Search favorites..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field"
                />
                {filteredFavorites.length === 0 ? (
                    <p>You have no favorites yet.</p>
                ) : (
                    <section className="favorites-cards">
                        {filteredFavorites.map((product, index) => (
                            <FavoriteCard key={product.id || index} product={product} onRemove={handleRemoveFavorite}/>
                        ))}
                    </section>
                )}
            </section>
            <figure className="line-2">
                <img src={line} alt="Line 2"/>
            </figure>
            <section className="page-section">
                <figure>
                    <img className="wine-heart" src={heart} alt="Wine heart image"/>
                </figure>
            </section>
        </main>
    );
}

export default Favorites;
