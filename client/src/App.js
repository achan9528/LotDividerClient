import RegistrationForm from './views/registration'
import HomePage from './views/home'
import UserDashboard from './views/UserDashboard'
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
        <Route exact path="/test">
          <h1>Test Page</h1>
        </Route>
      </Switch>
      
    </Router>
  );
}

export default App;
