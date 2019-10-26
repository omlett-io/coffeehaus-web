import React from "react";
import {Route} from "react-router-dom";
import PortalPage from "../pages/PortalPage";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "./PrivateRoute";

function Router() {
    return (
        <div>
            <PrivateRoute exact path="/" component={PortalPage}/>
            <Route path="/login" component={LoginPage}/>
        </div>
    )
}

export default Router;