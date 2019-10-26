import React from "react";
import KeycloakContext from "../../contexts/user";
import {Redirect} from "react-router-dom";

function LoginPage() {
    const [key, setKey] = React.useContext(KeycloakContext);

    if (!key || key.authenticated !== true) {
        const keycloak = key.keycloak;
        keycloak.init({onLoad: 'login-required'})
            .success((authenticated: boolean) => {
                console.log('Authenticated: ' + authenticated);
                setKey(({
                    keycloak: keycloak
                }))
            })
            .error((error: any) => {
                console.log('Error: ' + error);
            });
    }

    if (key.keycloak.authenticated === true) {
        return <Redirect to='/'/>
    } else {
        return <p>Initializing Keycloak...</p>
    }
}

export default LoginPage;