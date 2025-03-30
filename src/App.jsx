import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Login from "./pages/login/login.jsx";
import Search from "./pages/search/search.jsx";
import Results from "./pages/results/results.jsx";
import Details from "./pages/details/details.jsx";
import Favorites from "./pages/favorites/favorites.jsx";
import NotFound from "./pages/notFound/notFound.jsx";
import Navigation from "./components/navigation.jsx";

function App() {
    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<Search/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/results" element={<Results/>}/>
                <Route path="/details" element={<Details/>}/>
                <Route path="favorites" element={<Favorites/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </>
    );
}

export default App;