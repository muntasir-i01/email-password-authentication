import logo from './logo.svg';
import './App.css';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from './firebase.init';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';


const auth = getAuth(app);

function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');

  const [register, setRegister] = useState(false);

  const handleEmailBlur = event => {
    setEmail(event.target.value);
  }

  const handlePasswordBlur = e => {
    setPassword(e.target.value);
  }

  const handleRegisterChange = event => {
    setRegister(event.target.checked);
  }

  const handleFormSubmit = (event) => {
    //event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      
      return; //if invalid
    }

    if(!/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/.test(password)) {
      setError('Password should contain one uppercase, one lowercase, one special character');
      return;
    }

    //javascript password validation regex

    setValidated(true);
    setError('');

    //console.log('Form submitted', email, password);
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setEmail('');
        setPassword('');
    })
    .catch((error) => {
      console.log(error);
      setError(error.message);
    })
    event.preventDefault();
  }

  return (
    <div>
      <div className='Registration w-50 mx-auto mt-2'>
        <h2 className='text-primart'>Please {register ? 'Login' : 'Register'}</h2>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegisterChange} type="checkbox" label="Already Registered?" />
          </Form.Group>
          <p className='text-danger'>{error}</p>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
