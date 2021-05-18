import RegistrationForm from './views/registration'
import HomePage from './views/home'
import ProjectView from './views/ProjectView'
import UserDashboard from './views/UserDashboard'
import NewProjectForm from './views/NewProjectForm'
import NewProposalForm from './views/NewProposalForm'
import NewPortfolioForm from './views/NewPortfolioForm'
import ProposalView from './views/ProposalView'
import LogoutLink from './components/logout'
import useToken from './components/hooks/useToken'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { Navbar, Nav, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const deleteToken = () => {
  localStorage.removeItem('token');
}

function App() {
  const {token, setToken} = useToken();


  if (!token){
    return (
      <HomePage setToken={setToken}></HomePage>
    )
  }

  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href='/dashboard'>Lot Divider</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/test">Projects</Nav.Link>
              <LogoutLink setToken={setToken}></LogoutLink>
            </Nav>
      </Navbar>
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
        <Route exact path="/projects/:id">
          <ProjectView></ProjectView>
        </Route>
        <Route exact path="/portfolios/new">
          <NewPortfolioForm></NewPortfolioForm>
        </Route>
        <Route exact path="/proposals/:id">
          <ProposalView></ProposalView>
        </Route>
        {/* <Route exact path="/proposals/:id/edit">
          <EditProposalView></EditProposalView>
        </Route>
        <Route exact path="/proposals/:id/delete">
          <DeleteProposalView></DeleteProposalView>
        </Route> */}
      </Switch>
      
    </Router>
  );
}

export default App;
