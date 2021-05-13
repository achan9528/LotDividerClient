import RegistrationForm from './views/registration'
import {submitHandler} from './components/helpers'

function App() {
  return (
    <div>
      <RegistrationForm submitHandler={submitHandler}></RegistrationForm>
    </div>
  );
}

export default App;
