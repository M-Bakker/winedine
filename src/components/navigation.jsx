import React from 'react';
import {Link} from "react-router-dom";

function Navigation() {
    return (
        <nav className="navigation">
            <ul>
                <li><Link to="/" className="default-link">Search</Link></li>
                <li><Link to="/favorites" className="default-link">Favorites</Link></li>
            </ul>
        </nav>
    );
}

export default Navigation;