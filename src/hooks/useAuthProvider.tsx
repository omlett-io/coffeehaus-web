import React from "react";
import AuthContext from "../contexts/auth";
import { KeycloakAdapter } from "../components/AuthAdapters";

const useAuthProvider = () => {
    const [ state, setState ] = React.useContext( AuthContext );

    function initialize() {
        if ( state.adapter === KeycloakAdapter ) {
            const keycloak = state.adapter;
            keycloak.init( { onLoad: 'login-required' } )
                .success( ( authenticated: boolean ) => {
                    console.log( 'Authenticated: ' + authenticated );
                    setState( ( {
                        initialized: true,
                        authenticated: authenticated,
                        adapter: keycloak
                    } ) )
                } )
                .error( ( error: any ) => {
                    console.log( 'Error: ' + error );
                } );
        } else {
            console.warn( "Keycloak is the only adapter supported at this time." );
        }
    }

    function logout() {
        state.adapter.logout();
    }

    return {
        initialize,
        isInitialized: state.initialized,
        isAuthenticated: state.authenticated,
        getToken: state.adapter.token,
        logout
    }
};

export default useAuthProvider;