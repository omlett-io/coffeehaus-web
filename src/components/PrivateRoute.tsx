import React from "react";
import { Route, RouteProps } from 'react-router-dom'
import LoginPage from "../pages/LoginPage";
import useAuthProvider from "../hooks/useAuthProvider";

function PrivateRoute( props: RouteProps ) {
    const { isInitialized, isAuthenticated } = useAuthProvider();
    const { component } = props;

    const authorizedDestination = ( !isInitialized || !component || isAuthenticated !== true )
        ? LoginPage
        : component;

    return <Route { ...props } component={ authorizedDestination }/>
}

export default PrivateRoute;