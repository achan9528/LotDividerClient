import ProjectView from './views/ProjectView/ProjectView'
import EditProjectView from './views/EditProjectView/EditProjectView'
import DeleteProjectView from './views/DeleteProjectView/DeleteProjectView'
import UserDashboard from './views/UserDashboard/UserDashboard'
import NewProjectForm from './views/NewProjectForm/NewProjectForm'
import NewProposalForm from './views/NewProposalForm/NewProposalForm'
import NewPortfolioForm from './views/NewPortfolioForm/NewPortfolioForm'
import { ProposalView } from './views/ProposalView/ProposalView'
import DeleteProposalView from './views/DeleteProposalView/DeleteProposalView'
import EditProposalView from './views/EditProposalView/EditProposalView'
import { ProjectsView } from './views/ProjectsView/ProjectsView'
import { ProposalsView } from './views/ProposalsView/ProposalsView'
import { PortfoliosView } from './views/PortfoliosView/PortfoliosView'
import NavBar from './components/NavBar/NavBar'
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
                    <Route exact path="/">
                        <Redirect to="/dashboard/"></Redirect>
                    </Route>
                    <Route exact path="/login">
                        <Redirect to="/dashboard/"></Redirect>
                    </Route>
                    <Route exact path="/registration">
                        <Redirect to="/dashboard/"></Redirect>
                    </Route>
                    <Route exact path="/dashboard/">
                        <UserDashboard></UserDashboard>
                    </Route>
                    <Route exact path="/projects/">
                        <ProjectsView></ProjectsView>
                    </Route>
                    <Route exact path="/portfolios/">
                        <PortfoliosView></PortfoliosView>
                    </Route>
                    <Route exact path="/proposals/">
                        <ProposalsView></ProposalsView>
                    </Route>
                    <Route exact path="/projects/new/">
                        <NewProjectForm></NewProjectForm>
                    </Route>
                    <Route exact path="/portfolios/new/">
                        <NewPortfolioForm></NewPortfolioForm>
                    </Route>
                    <Route exact path="/proposals/new/">
                        <NewProposalForm></NewProposalForm>
                    </Route>
                    <Route exact path="/projects/:projectID/">
                        <ProjectView></ProjectView>
                    </Route>
                    <Route exact path="/projects/:projectID/edit/">
                        <EditProjectView></EditProjectView>
                    </Route>
                    <Route exact path="/projects/:projectID/delete/">
                        <DeleteProjectView></DeleteProjectView>
                    </Route>
                    <Route exact path="/projects/:projectID/proposals/new/">
                        <NewProposalForm></NewProposalForm>
                    </Route>
                    <Route exact path="/portfolios/:portfolioID/">
                        {/* <PortfolioView></PortfolioView> */}
                    </Route>
                    <Route exact path="/proposals/:proposalID/">
                        <ProposalView></ProposalView>
                    </Route>
                    <Route exact path="/projects/:projectID/proposals/:proposalID/">
                        <ProposalView></ProposalView>
                    </Route>
                    <Route exact path="/projects/:projectID/proposals/:proposalID/edit/">
                        <EditProposalView></EditProposalView>
                    </Route>
                    <Route exact path="/projects/:projectID/proposals/:proposalID/delete/">
                        <DeleteProposalView></DeleteProposalView>
                    </Route>
                </Switch>
        </Router>
    )
}

export default AuthenticatedApplication;