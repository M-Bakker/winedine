import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter as Router} from 'react-router-dom';
import AuthContextProvider from '../src/context/AuthContext';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <AuthContextProvider>
                <App/>
            </AuthContextProvider>
        </Router>
    </StrictMode>,
)
