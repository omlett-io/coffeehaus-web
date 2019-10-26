import React from "react"
import { KeycloakAdapter } from "../components/AuthAdapters";

// @ts-ignore
const AuthContext = React.createContext();
export default AuthContext;

export const AuthProvider = ( props: { children: React.ReactNode; } ) => {
    const [ state, setState ] = React.useState( {
        adapter: KeycloakAdapter,
        initialized: false,
        authenticated: false
    } );

    return (
        <AuthContext.Provider value={ [ state, setState ] }>
            { props.children }
        </AuthContext.Provider>
    )
};

