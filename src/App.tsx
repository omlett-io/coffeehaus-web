import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';
import Router from "./components/Router";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './contexts/auth';


function App() {

    return (
        <BrowserRouter>
            <AuthProvider>
                <Router/>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App;
