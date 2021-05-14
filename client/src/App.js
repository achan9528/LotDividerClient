import RegistrationForm from './views/registration'
import HomePage from './views/home'
import LogoutLink from './components/logout'
import useToken from './components/hooks/useToken'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

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
    <div>
      <Router>
        <h1>Hello!</h1>
        <LogoutLink setToken={setToken}></LogoutLink>
      </Router>
    </div>
  );
}

export default App;
