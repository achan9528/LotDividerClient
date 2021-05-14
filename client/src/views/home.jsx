import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import RegistrationForm from './registration';
import Login from './login';
import { submitHandler } from '../components/helpers'

export const HomePage = (props) => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <div>
                        <h1>Welcome!</h1>
                        <h2>Here are some links below:</h2>
                        <ul>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/registration">Register</Link></li>
                        </ul>
                    </div>
                </Route>

                <Route exact path='/login'>
                    <Login submitHandler={submitHandler} setToken={props.setToken}></Login>
                    <div>
                        <p>Don't have an account? Click here to <Link to="/registration">register</Link></p>
                    </div>
                </Route>

                <Route exact path='/registration'>
                    <RegistrationForm submitHandler={submitHandler}></RegistrationForm>
                    <div>
                        <p>Already have an account? Click here to <Link to="/login">login</Link></p>
                    </div>
                </Route>
            </Switch>
        </Router>
    )
}

export default HomePage;