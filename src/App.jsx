import React, {useContext} from 'react';
import './App.css';
import {Routes, Route, useLocation, Navigate} from 'react-router-dom';
import Login from './pages/login/login.jsx';
import Search from './pages/search/search.jsx';
import Results from './pages/results/results.jsx';
import Details from './pages/details/details.jsx';
import Favorites from './pages/favorites/favorites.jsx';
import NotFound from './pages/notFound/notFound.jsx';
import Navigation from './components/navigation/navigation.jsx';
import { AuthContext } from './context/AuthContext.jsx';

function App() {
    const { isAuth } = useContext(AuthContext);
    const location = useLocation();

    const hideNavigation = location.pathname === "/";

    return (
        <>
            {!hideNavigation && <Navigation />}
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/search" element={isAuth ? <Search /> : <Navigate to="/"/>}/>
                <Route path="/results" element={isAuth ? <Results /> : <Navigate to="/"/>}/>
                <Route path="/details" element={isAuth ? <Details /> : <Navigate to="/"/>}/>
                <Route path="favorites" element={isAuth ? <Favorites /> : <Navigate to="/"/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </>
    );
}

export default App;