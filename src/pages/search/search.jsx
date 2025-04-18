import React from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/pages/search/search.css';
import vineyard from '/src/assets/images/vineyard.jpg';

function Search() {
    const [query, setQuery] = React.useState("");
    const [showSuggestions, setShowSuggestions] = React.useState(false);
    const [suggestions, setSuggestions] = React.useState([]);

    const navigate = useNavigate();

    const pairableFoods = [
        "steak", "pasta carbonara", "pork", "duck", "cheddar", "scallops", "tofu", "hamburger",
        "lasagna", "ravioli", "risotto", "caesar salad", "beef stew", "burrito", "quesadilla", "enchiladas",
        "ramen", "pho", "bibimbap", "paella", "curry", "biryani", "samosa", "spring rolls", "oysters",
        "scampi", "chicken tikka masala", "fajitas", "gnocchi", "bruschetta", "dim sum", "kung pao chicken",
        "coq au vin", "beef bourguignon", "goulash", "mac and cheese", "baked ziti", "pot roast",
        "carbonara", "eggplant parmesan",
    ];

    const handleInputChange = (e) => {
        const input = e.target.value.toLowerCase();
        setQuery(input);

        if (input.length > 0) {
            const filteredSuggestions = pairableFoods.filter(food =>
                food.toLowerCase().includes(input)
            );
            setSuggestions(filteredSuggestions);
            setShowSuggestions(filteredSuggestions.length > 0);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (dish) => {
        setQuery(dish);
        setShowSuggestions(false);
    };

    const handleSearch = () => {
        if(query.trim()) {
            navigate(`/results?query=${query}`);
        }
    };

    return (
        <section className="search">
            <div className="search-container">
                <h1>What wine goes with ..?</h1>
                <div className="search-container">
                    <div className="search-box">
                        <input
                            type="text"
                            value={query}
                            onChange={handleInputChange}
                            placeholder="Search for dish..."
                        />
                        <button className="search-button" onClick={handleSearch}>Search</button>
                    </div>
                    {showSuggestions && suggestions.length > 0 && (
                        <ul className="suggestions">
                            {suggestions.map((dish, index) => (
                                <li key={index} onClick={() => handleSuggestionClick(dish)}>
                                    {dish}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div className="background-image">
                <img src={vineyard} alt="Vineyard background"/>
            </div>
        </section>
    );
}

export default Search;
