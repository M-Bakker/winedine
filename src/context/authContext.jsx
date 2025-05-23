import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext( {} );

function AuthContextProvider( { children } ) {
    const [ isAuth, toggleIsAuth ] = useState( {
        isAuth: false,
        user: null,
        status: 'pending',
    } );
    const navigate = useNavigate();

    console.log(isAuth);

    useEffect( () => {
        const token = localStorage.getItem( 'token' );
        if ( token ) {
            const decoded = jwtDecode( token );
            void fetchUserData( decoded.sub, token );
            navigate( '/search' );
        } else {
            toggleIsAuth( {
                isAuth: false,
                user: null,
                status: 'done',
            } );
        }
    }, [] );

    function login( JWT ) {
        localStorage.setItem( 'token', JWT );
        const decoded = jwtDecode( JWT );

        void fetchUserData( decoded.sub, JWT, '/search' );
    }

    function logout() {
        localStorage.clear();
        toggleIsAuth( {
            isAuth: false,
            user: null,
            status: 'done',
        } );

        console.log( 'Gebruiker is uitgelogd!' );
        navigate( '/' );
    }

    async function fetchUserData( id, token, redirectUrl ) {
        try {
            const result = await axios.get( "https://frontend-educational-backend.herokuapp.com/api/user", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${ token }`,
                },
            } );

            toggleIsAuth( {
                ...isAuth,
                isAuth: true,
                user: {
                    username: result.data.username,
                    email: result.data.email,
                    id: result.data.id,
                },
                status: 'done',
            } );

            if ( redirectUrl ) {
                navigate( redirectUrl );
            }

        } catch ( e ) {
            console.error( e );
            toggleIsAuth( {
                isAuth: false,
                user: null,
                status: 'done',
            } );
        }
    }

    const contextData = {
        ...isAuth,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={ contextData }>
            { isAuth.status === 'done' ? children : <p>Loading...</p> }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;