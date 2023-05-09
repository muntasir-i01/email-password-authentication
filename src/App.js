import logo from './logo.svg';
import './App.css';
import { getAuth } from "firebase/auth";
import app from './firebase.init';
import 'bootstrap/dist/css/bootstrap.min.css';


const auth = getAuth(app);

function App() {

  const handleEmailBlur = (event) => {
    console.log(event.target.value);
  }

  const handlePasswordBlur = event => {
    console.log(event.target.value);
  }

  const handleFormSubmit = e => {
    console.log('Form Submitted');
    e.preventDefault();
  }

  return (
    <div className="App">
      <form onSubmit={handleFormSubmit}>
        <input onBlur={handleEmailBlur} type='email' /> <br></br>
        <input onBlur={handlePasswordBlur} type='password' name='' id='' /> <br></br>
        <input type='submit' value='Login'></input>
      </form> 

      
    </div>
  );
}

export default App;
