import React, {useContext, useEffect, useRef, useState} from 'react';
import line from "../../assets/images/line-2.png";
import logo from "../../assets/images/logo-winedine.png";
import winebottles from "/src/assets/images/wijnflessen.png";
import './login.css';
import axios from "axios";
import {AuthContext} from "../../context/authContext.jsx";

function Login() {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const { login } = useContext(AuthContext);
    const [error, setError] = useState("");
    const abortControllerRef = useRef(null);

    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        const controller = new AbortController();
        abortControllerRef.current = controller;
        if (isRegister) {
            try {
                const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signup", {
                    username: userName,
                    email: email,
                    password: password,
                    role: ["user"]
                },
                    { signal: controller.signal }
                );
                console.log(response);
            } catch (error) {
                console.log(error);
                console.log(error.response ? error.response.data : error);
                setError("Registration failed. Please check your inputs.");
            } finally {
                setIsRegister(false);
                setUserName("");
                setEmail("");
                setPassword("");
                abortControllerRef.current = null;
            }
            console.log("Registering user:", userName, email, password);
        } else {
            try {
                const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signin", {
                    username: userName,
                    password: password,
                });
                if (response.status === 200) {
                    console.log(response);
                    login(response.data.accessToken);
                }
            } catch (error) {
                console.log(error.response ? error.response.data : error);
                setError("Unknown username or password.");
            } finally {
                abortControllerRef.current = null;
            }
        }
    };

    const toggleForm = (event) => {
        event.preventDefault();
        setIsRegister(!isRegister);
        setError("");
    };

    return (
        <main className="login-page">
            <section className="page-section">
                <img src={logo} alt="Logo" width="500px"/>
                <p>WineDine is your ultimate guide to perfect wine and food pairings!</p>
                <p>
                    Whether you're a seasoned wine connoisseur or just looking for the ideal wine to
                    complement your meal, WineDine helps you make the right choice every time. Discover
                    in an instant which wine pairs best with your favorite dishes and surprise your taste
                    buds with the perfect harmony. Cheers to the finest combinations!
                </p>
                <img src={winebottles} alt="Wijn flessen" width="100%"/>
            </section>
            <figure className="line-2">
                <img src={line} alt="Line 2"/>
            </figure>
            <section className="page-section form">
                <h1>{isRegister ? "Register" : "Welcome back!"}</h1>
                <p>
                    {isRegister
                        ? "Enter your details to create an account"
                        : "Enter your credentials to access your account"}
                </p>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label htmlFor="email">Username</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    {isRegister && (
                        <div className="input-group">
                            <label htmlFor="name">Email addres</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-field"
                            />
                        </div>
                    )}
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
                    {error && <p className="error-message">Error: {error}</p>}
                </form>
            </section>
        </main>
    );
}

export default Login;
