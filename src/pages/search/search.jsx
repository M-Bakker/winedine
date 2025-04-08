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
        "steak", "pasta carbonara", "chicken", "salmon", "pasta", "lamb", "pork", "duck",
        "mushrooms", "cheddar", "blue cheese", "shrimp", "scallops", "tofu", "pizza", "hamburger", "sushi",
        "lasagna", "ravioli", "risotto", "caesar salad", "club sandwich", "french fries", "falafel", "curry chicken",
        "beef stew", "fish and chips", "burrito", "tacos", "quesadilla", "enchiladas", "pancakes", "waffles", "omelette",
        "frittata", "croissant", "bagel", "chili", "gumbo", "stir-fry vegetables", "ramen", "udon noodles", "pho",
        "bibimbap", "paella", "curry", "biryani", "souvlaki", "gyro", "kebab", "shawarma", "pita", "hummus",
        "samosa", "spring rolls", "dumplings", "pot roast", "mac and cheese", "baked ziti", "casserole", "quiche",
        "fajitas", "steamed dumplings", "noodles", "sandwich", "steamed rice", "fried rice", "cauliflower rice",
        "grilled cheese", "BLT", "ribs", "pork chops", "meatloaf", "salad", "greek salad", "potato salad",
        "coleslaw", "broccoli stir-fry", "roast beef", "corned beef", "pastrami", "brisket", "baked beans",
        "mashed potatoes", "roasted potatoes", "sweet potatoes", "currywurst", "bratwurst", "schnitzel", "goulash",
        "pierogi", "cabbage rolls", "beef Wellington", "lobster bisque", "clam chowder", "crab cakes", "oysters",
        "steamed mussels", "scampi"
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
