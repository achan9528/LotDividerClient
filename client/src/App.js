import AuthenticatedApplication from './AuthenticatedApplication'
import UnauthenticatedApplication from './UnauthenticatedApplication'
import useToken from './components/hooks/useToken'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

function App() {
  const {token, setToken} = useToken();
  console.log(token)
  return (
    <Router>
      {
      (token!='' && token)
      ? <Redirect to="/dashboard"></Redirect>
      : <Redirect to="/"></Redirect>
      }
      <Switch>
        <Route exact path = "/">
          <UnauthenticatedApplication setToken={setToken}></UnauthenticatedApplication>
        </Route>
        <Route exact path = "/dashboard">
          <AuthenticatedApplication setToken={setToken}></AuthenticatedApplication>)
        </Route>
      </Switch>
    </Router>
    
  );
}

export default App;
