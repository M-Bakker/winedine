import React from 'react';
import '/src/pages/search/search.css'
import vineyard from '/src/assets/images/vineyard.jpg'
import axios from "axios";

function Search() {
    const [query, setQuery] = React.useState("");  // Huidige zoekterm
    const [showSuggestions, setShowSuggestions] = React.useState(false);  // Of suggesties getoond moeten worden
    const [suggestions, setSuggestions] = React.useState([]);  // Lijst van suggesties
    const [pairing, setPairing] = React.useState(null);  // Wijnpairing data

    // Hardcoded lijst van pairable gerechten
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

    // Handelt de inputverandering (laat suggesties zien)
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

    const selectedDishClick = async (selectedDish) => {
        setQuery(selectedDish);
        setShowSuggestions(false);

        try {
            const { data } = await axios.get('https://api.spoonacular.com/food/wine/pairing', {
                params: {
                    apiKey: '4ace51108fb34415b64606f68c88f114',
                    food: selectedDish
                }
            });
            console.log(data);
            setPairing(data);
        } catch (error) {
            console.error("Error fetching wine pairing:", error);
            setPairing(null);
        }
    };

    return (
        <section className="search">
            <div className="search-container">
                <h1>What wine goes with ..?</h1>
                <div className="search-container">
                    <div className="search-box">
                        <input type="text" value={query} onChange={handleInputChange} placeholder="Search for dish..."/>
                        <button className="search-button" onClick={() => console.log({query})}>Search</button>
                    </div>
                    {showSuggestions && suggestions.length > 0 && (
                        <ul className="suggestions">
                            {suggestions.map((dish, index) => (
                                <li key={index} onClick={() => selectedDishClick(dish)}>
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