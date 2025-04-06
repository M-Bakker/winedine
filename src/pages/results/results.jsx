import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import '/src/pages/results/results.css';

function Results() {
    const [pairing, setPairing] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const query = params.get('query');

    useEffect(() => {
        async function fetchPairing() {
            try {
                const { data } = await axios.get('https://api.spoonacular.com/food/wine/pairing', {
                    params: {
                        apiKey: '4ace51108fb34415b64606f68c88f114',
                        food: query
                    }
                });
                setPairing(data);
            } catch (error) {
                console.error("Error fetching data for wine pairing:", error);
                setPairing(null);
            } finally {
                setLoading(false);
            }
        }
        if (query) {
            fetchPairing();
        }
    }, [query]);

    if (loading) {
        return <div className="results"><p>Loading...</p></div>;
    }

    return (
        <div className="results">
            <h1>Wine Pairing for: {query}</h1>
            {pairing ? (
                <div>
                    {pairing.pairedWines && pairing.pairedWines.length > 0 ? (
                        <p>
                            Paired Wines: {pairing.pairedWines.join(', ')}
                        </p>
                    ) : (
                        <p>No paired wines found.</p>
                    )}
                    {pairing.pairingText && <p>{pairing.pairingText}</p>}
                </div>
            ) : (
                <p>No pairing data available.</p>
            )}
        </div>
    );
}

export default Results;
