import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import { submitHandler } from '../components/helpers'
import useToken from '../components/hooks/useToken';

export const HomePage = (props) => {
    return (
            <div>
                <h1>Welcome!</h1>
                <h2>Here are some links below:</h2>
                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/registration">Register</Link></li>
                </ul>
            </div>
    )
}

export default HomePage;