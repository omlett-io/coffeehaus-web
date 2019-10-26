import React from 'react'
import Keycloak from "keycloak-js";

// @ts-ignore
const KeycloakContext = React.createContext();
export default KeycloakContext;

export const KeycloakProvider = (props: { children: React.ReactNode; }) => {
    const [key, setKey] = React.useState({
        keycloak: Keycloak('/keycloak.json')
    });

    return (
        <KeycloakContext.Provider value={[key, setKey]}>
            {props.children}
        </KeycloakContext.Provider>
    )
};

