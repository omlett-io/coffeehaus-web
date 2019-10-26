import React from "react";
import {Route, RouteProps} from 'react-router-dom'
import UserContext from "../contexts/user";
import LoginPage from "../pages/LoginPage";

function PrivateRoute(props: RouteProps) {
    const [state] = React.useContext(UserContext);
    const { component } = props;

    const authorizedDestination = (!state.keycloak || !component || state.keycloak.authenticated !== true)
        ? LoginPage
        : component;

    return <Route {...props} component={ authorizedDestination } />
}

export default PrivateRoute;