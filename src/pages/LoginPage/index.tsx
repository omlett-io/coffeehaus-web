import React from "react";
import { Redirect } from "react-router-dom";
import useAuthProvider from "../../hooks/useAuthProvider";

function LoginPage() {
    const { initialize, isInitialized, isAuthenticated } = useAuthProvider();

    if ( !isInitialized || !isAuthenticated ) {
        initialize();
    }

    if ( isAuthenticated === true ) {
        return <Redirect to='/'/>
    } else {
        return <p>Initializing Keycloak...</p>
    }
}

export default LoginPage;