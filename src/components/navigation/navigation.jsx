import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import '/src/components/navigation/navigation.css';
import logo from '/src/assets/images/logo-winedine.png';
import line from '/src/assets/images/line-1.png';
import { AuthContext } from '../../context/authContext.jsx';

function Navigation() {
    const { logout } = useContext(AuthContext);

    return (
        <div className="navigation-header">
            <img src={logo} alt="Logo" width="300px"/>
        <nav className="navigation">
            <ul className="navigation-links">
                <li><NavLink to="/search"
                             className={({isActive}) => isActive ? "default-link active-link" : "default-link"}>Search</NavLink>
                </li>
                <img src={line} alt="Line 1"/>
                <li><NavLink to="/favorites"
                             className={({isActive}) => isActive ? "default-link active-link" : "default-link"}>Favorites</NavLink>
                </li>
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