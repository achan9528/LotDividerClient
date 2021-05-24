import RegistrationForm from './views/registration'
import HomePage from './views/home'
import ProjectView from './views/ProjectView'
import UserDashboard from './views/UserDashboard'
import NewProjectForm from './views/NewProjectForm'
import NewProposalForm from './views/NewProposalForm'
import NewPortfolioForm from './views/NewPortfolioForm'
import ProposalView from './views/ProposalView'
import LogoutLink from './components/logout'
import NavBar from './components/NavBar'
import useToken from './components/hooks/useToken'
import Login from './views/login'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";
import { Navbar, Nav, Row, Button } from 'react-bootstrap'

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