import React from "react";
import {Route, RouteProps} from 'react-router-dom'
import UserContext from "../contexts/user";
import LoginPage from "../pages/LoginPage";

function PrivateRoute(props: RouteProps, component: React.ComponentType) {
    const [state] = React.useContext(UserContext);

    const authorizedDestination: React.ComponentType = (!state.keycloak || state.keycloak.authenticated !== true)
        ? LoginPage
        : component;

    return <Route {...props} component={ authorizedDestination } />
}

export default PrivateRoute;