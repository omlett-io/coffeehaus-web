import React, {Component} from "react";
import Keycloak from "keycloak-js";
import HomePage from "../HomePage";

interface State {
    keycloak: object
    authenticated: boolean
}

class PortalPage extends Component<State> {
    state = {
        keycloak: null,
        authenticated: false
    };

    componentDidMount(): void {
        this.initializeKeycloak();
    }

    initializeKeycloak = () => {
        const keycloak = Keycloak({
            "realm": "coffeehaus",
            "auth-server-url": "https://keycloak.omlett.io/auth",
            "ssl-required": "all",
            "resource": "coffeehaus",
            "public-client": true,
            "confidential-port": 0
        });
        console.log("help me pls");
        keycloak.init({onLoad: 'login-required'})
            .success(authenticated => {
            this.setState({ keycloak: keycloak, authenticated: authenticated })
            })
            .error(e => {
                console.log(e.error_description)
            });
    };

    render() {
        if (this.state.keycloak) {
            if (this.state.authenticated) return (
                <div>
                    <p>This is a Keycloak-secured component of your application. You shouldn't be able
                        to see this unless you've authenticated with Keycloak.</p>
                </div>
            ); else return (<HomePage />)
        }
        return (
            <div>Initializing Keycloak...</div>
        );
    };
}

export default PortalPage;