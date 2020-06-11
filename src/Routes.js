import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Login from "./components/login/login";
import Home from "./components/home/home";
import App from './App';

import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={App} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/home" exact component={Home} />
                </Switch>
            </Router>
        )
    }
}