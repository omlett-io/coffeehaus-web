import React from 'react'
import Keycloak from "keycloak-js";

// @ts-ignore
const KeycloakContext = React.createContext();
export default KeycloakContext;

export const KeycloakProvider = (props: { children: React.ReactNode; }) => {
    const [state, setState] = React.useState({
        keycloak: Keycloak('/keycloak.json')
    });

    return (
        <KeycloakContext.Provider value={[state, setState]}>
            {props.children}
        </KeycloakContext.Provider>
    )
};

