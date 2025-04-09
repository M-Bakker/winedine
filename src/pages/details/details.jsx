import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './details.css';

function DetailPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { product } = location.state || {};
    console.log(product);

    if (!product) {
        return (
            <div className="details-page">
                <p>No product data available.</p>
                <button onClick={() => navigate(-1)}>Go back</button>
            </div>
        );
    }

    const {title, description, imageUrl, price, averageRating, link } = product;

    return (
        <div className="details-page">
            <div className="details-header">
                <h1>{title}</h1>
            </div>
            <div className="details-content">
                <div className="details-image">
                    <img src={imageUrl} alt={title} />
                </div>
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
            </div>
        </div>
    );
}

export default DetailPage;
