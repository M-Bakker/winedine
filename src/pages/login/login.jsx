import React, { useState } from 'react';
import line from "../../assets/images/line-2.png";
import logo from "../../assets/images/logo-winedine.png";
import winebottles from "/src/assets/images/wijnflessen.png";
import './login.css';

function Login() {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isRegister) {
            // Registreren api
            console.log("Registering user:", name, email, password);
        } else {
            // Inloggen api
            console.log("Logging in user:", email, password);
        }
    };

    const toggleForm = (event) => {
        event.preventDefault();
        setIsRegister(!isRegister);
    };

    return (
        <main className="login-page">
            <section className="page-section">
                <img src={logo} alt="Logo" width="500px" />
                <p>WineDine is your ultimate guide to perfect wine and food pairings!</p>
                <p>
                    Whether you're a seasoned wine connoisseur or just looking for the ideal wine to
                    complement your meal, WineDine helps you make the right choice every time. Discover
                    in an instant which wine pairs best with your favorite dishes and surprise your taste
                    buds with the perfect harmony. Cheers to the finest combinations!
                </p>
                <img src={winebottles} alt="Wijn flessen" width="100%" />
            </section>
            <figure className="line-2">
                <img src={line} alt="Line 2" />
            </figure>
            <section className="page-section form">
                <h1>{isRegister ? "Register" : "Welcome back!"}</h1>
                <p>
                    {isRegister
                        ? "Enter your details to create an account"
                        : "Enter your credentials to access your account"}
                </p>
                <form onSubmit={handleSubmit} className="login-form">
                    {isRegister && (
                        <div className="input-group">
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input-field"
                            />
                        </div>
                    )}
                    <div className="input-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <p className="register">
                        {isRegister
                            ? "Already an account? "
                            : "New user? "}
                        <a href="/" onClick={toggleForm}>
                            {isRegister ? "Click here to login" : "Register here"}
                        </a>
                    </p>
                    <button type="submit" className="login-button">
                        {isRegister ? "Register" : "Login"}
                    </button>
                </form>
            </section>
        </main>
    );
}

export default Login;
