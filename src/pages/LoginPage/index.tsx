import React from "react";
import KeycloakContext from "../../contexts/user";
import { Redirect } from "react-router-dom";

function LoginPage() {
    const [state, setState] = React.useContext(KeycloakContext);

    if (!state.keycloak || state.keycloak.authenticated !== true) {
        const keycloak = state.keycloak;
        keycloak.init({onLoad: 'login-required'})
            .success((authenticated: boolean) => {
                console.log('Authenticated: ' + authenticated);
                setState(({
                    keycloak: keycloak
                }))
            })
            .error((error: any) => {
                console.log('Error: ' + error);
            });
    }

    if (state.keycloak.authenticated === true) {
        return <Redirect to='/'/>
    } else {
        return <p>Initializing Keycloak...</p>
    }
}

export default LoginPage;