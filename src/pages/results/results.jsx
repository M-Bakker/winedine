import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import PairedWines from '/src/components/pairedWines/pairedWines.jsx';
import DetailCard from '/src/components/detailCard/detailCard.jsx';
import './results.css';
import line from '/src/assets/images/line-2.png';

function Results() {
    const [pairing, setPairing] = useState(null);
    const [loadingPairing, setLoadingPairing] = useState(true);
    const [selectedWineCategory, setSelectedWineCategory] = useState(null);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get('query');

    useEffect(() => {
        async function fetchPairing() {
            try {
                setLoadingPairing(true);
                const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
                const { data } = await axios.get('https://api.spoonacular.com/food/wine/pairing', {
                    params: { apiKey, food: query }
                });
                console.log("Pairing data:", data);
                setPairing(data);

                if (data.pairedWines && data.pairedWines.length > 0) {
                    setSelectedWineCategory(data.pairedWines[0]);
                }
            } catch (error) {
                console.error("Error fetching pairing data:", error);
                setPairing(null);
            } finally {
                setLoadingPairing(false);
            }
        }
        if (query) {
            fetchPairing();
        }
    }, [query]);

    const handleWineClick = (wineName) => {
        setSelectedWineCategory(wineName);
    };

    if (loadingPairing) {
        return <div className="results-page"><p>Loading...</p></div>;
    }
    if (!pairing) {
        return <div className="results-page"><p>No pairing data available.</p></div>;
    }

    const { pairedWines, pairingText } = pairing;

    return (
        <div className="results-page">
            <div className="results-header">
                <h1>What wine goes with {query}?</h1>
                <div className="results-content">
                    <PairedWines
                        wines={pairedWines}
                        onWineClick={handleWineClick}
                        selectedWineCategory={selectedWineCategory}
                        text={pairingText}
                    />
                </div>
            </div>
            <img className="line-2" src={line} alt="Line 2" />
            <div className="results-header">
                <h1>Best picks for {selectedWineCategory}:</h1>
                <div className="results-content detail-cards-container">
                    <DetailCard selectedWineCategory={selectedWineCategory} />
                </div>
            </div>
        </div>
    );
}

export default Results;
