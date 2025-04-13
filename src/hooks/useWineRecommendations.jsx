import { useState, useEffect } from 'react';
import axios from 'axios';

export function useWineRecommendations(selectedWineCategory) {
    const [recommendedWines, setRecommendedWines] = useState([]);
    const [loadingRecommendations, setLoadingRecommendations] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchRecommendations() {
            if (!selectedWineCategory) return;
            try {
                setLoadingRecommendations(true);
                const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
                const { data } = await axios.get('https://api.spoonacular.com/food/wine/recommendation', {
                    params: {
                        apiKey,
                        wine: selectedWineCategory,
                        number: 5,
                    },
                    signal: controller.signal,
                });
                if (data.totalFound === 0 || !data.recommendedWines || data.recommendedWines.length === 0) {
                    setRecommendedWines([]);
                } else {
                    setRecommendedWines(data.recommendedWines);
                }
            } catch (error) {
                console.error("Error fetching wine recommendations:", error);
                setRecommendedWines([]);
            } finally {
                setLoadingRecommendations(false);
            }
        }
        fetchRecommendations();
        return () => {
            controller.abort();
        };
    }, [selectedWineCategory]);

    return { recommendedWines, loadingRecommendations };
}
