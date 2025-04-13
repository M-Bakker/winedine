import React from 'react';
import line from "../../assets/images/line-2.png";

function Login() {
    return (
        <main className="login-page">
            <section className="login-section">
                <h1>Your Favorites</h1>
            </section>
            <figure className="line-2">
                <img src={line} alt="Line 2"/>
            </figure>
            <section className="login-section">

            </section>
        </main>
    );
}

export default Login;