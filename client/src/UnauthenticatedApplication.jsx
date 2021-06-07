import RegistrationForm from './views/registration'
import HomePage from './views/home'
import Login from './views/login'
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

const UnauthenticatedApplication = (props) => {
    return(
        <Router>
            <Switch>
                <Route exact path="/">
                    <HomePage></HomePage>
                </Route>
                <Route exact path="/login">
                    <Login setToken={props.setToken}></Login>
                </Route>
                <Route exact path="/registration">
                    <RegistrationForm setToken={props.setToken}></RegistrationForm>
                </Route>
                <Route path="*">
                    <Redirect to="/"></Redirect>
                </Route>
            </Switch>
        </Router>
    )
}

export default UnauthenticatedApplication;