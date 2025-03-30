import React from 'react';
import {Link} from "react-router-dom";

function NotFound() {
    return (
        <div>
            <h2>Oops, this page doesn't exist!</h2>
            <p>Take me back to the <Link to="/">home page.</Link></p>
        </div>
    );
}

export default NotFound;