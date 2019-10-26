import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';
import Router from "./components/Router";
import { BrowserRouter } from "react-router-dom";
import { KeycloakProvider } from './contexts/user';


function App() {

    return (
        <BrowserRouter>
            <KeycloakProvider>
                <Router/>
            </KeycloakProvider>
        </BrowserRouter>
    )
}

export default App;
