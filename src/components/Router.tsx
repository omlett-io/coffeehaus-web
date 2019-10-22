import React, {Component} from "react";
import {Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import PortalPage from "../pages/PortalPage";
import HomePage from "../pages/HomePage";

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={PortalPage}/>
                    <Route path="/unauthorized" component={HomePage}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default Router;