import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '/src/components/navigation/navigation.css';
import { AuthContext } from '../../context/authContext.jsx';
import logo from '/src/assets/images/logo-winedine.png';
import line from '/src/assets/images/line-1.png';

function Navigation() {
    const { logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <div className="navigation-header">
            <NavLink to="/search">
                <img src={logo} alt="Logo" width="300px" />
            </NavLink>
            <button className="hamburger" onClick={toggleMenu} aria-label="Toggle navigation">
                &#9776;
            </button>
            <nav className={`navigation ${menuOpen ? 'open' : ''}`}>
                <ul className="navigation-links">
                    <li>
                        <NavLink
                            to="/search"
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) => isActive ? "default-link active-link" : "default-link"}
                        >
                            Search
                        </NavLink>
                    </li>
                    <img src={line} alt="Line 1" className="line" />
                    <li>
                        <NavLink
                            to="/favorites"
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) => isActive ? "default-link active-link" : "default-link"}
                        >
                            Favorites
                        </NavLink>
                    </li>
                    <img src={line} alt="Line 1" className="line" />
                    <li>
                        <button onClick={logout} className="logout-button">
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navigation;
