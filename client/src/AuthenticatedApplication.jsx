import ProjectView from './views/ProjectView'
import EditProjectView from './views/EditProjectView'
import DeleteProjectView from './views/DeleteProjectView'
import UserDashboard from './views/UserDashboard'
import NewProjectForm from './views/NewProjectForm'
import NewProposalForm from './views/NewProposalForm'
import NewPortfolioForm from './views/NewPortfolioForm'
import ProposalView from './views/ProposalView'
import DeleteProposalView from './views/DeleteProposalView'
import EditProposalView from './views/EditProposalView'
import NavBar from './components/NavBar'
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

const AuthenticatedApplication = (props) => {
    return(
        <Router>
            <NavBar setToken={props.setToken}></NavBar>
            <Switch>
                <Route exact path="/dashboard">
                    <UserDashboard></UserDashboard>
                </Route>
                <Route exact path="/projects/new">
                    <NewProjectForm></NewProjectForm>
                </Route>
                <Route exact path="/projects/:projectID/proposals/new">
                    <NewProposalForm></NewProposalForm>
                </Route>
                <Route exact path="/projects/:projectID">
                    <ProjectView></ProjectView>
                </Route>
                <Route exact path="/projects/:projectID/edit">
                    <EditProjectView></EditProjectView>
                </Route>
                <Route exact path="/projects/:projectID/delete">
                    <DeleteProjectView></DeleteProjectView>
                </Route>
                <Route exact path="/portfolios/new">
                    <NewPortfolioForm></NewPortfolioForm>
                </Route>
                <Route exact path="/projects/:projectID/proposals/:proposalID">
                    <ProposalView></ProposalView>
                </Route>
                <Route exact path="/projects/:projectID/proposals/:proposalID/edit">
                    <EditProposalView></EditProposalView>
                </Route>
                <Route exact path="/projects/:projectID/proposals/:proposalID/delete">
                    <DeleteProposalView></DeleteProposalView>
                </Route>
                <Route exact path="/">
                    <Redirect to="/dashboard"></Redirect>
                </Route>
                <Route exact path="/login">
                    <Redirect to="/dashboard"></Redirect>
                </Route>
                <Route exact path="/registration">
                    <Redirect to="/dashboard"></Redirect>
                </Route>
            </Switch>

        </Router>
    )
}

export default AuthenticatedApplication;