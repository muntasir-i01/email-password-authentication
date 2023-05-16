import logo from './logo.svg';
import './App.css';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import app from './firebase.init';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';


const auth = getAuth(app);
//const user = auth.currentUser;

function App() {

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');

  const [register, setRegister] = useState(false);

  const handleNameBlur = event => {
    setEmail(event.target.value);
  }

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

    if(register) {
      console.log(email, password, name);
      signInWithEmailAndPassword(auth, email, password, name)
      .then(userCredential => {
        const user = userCredential.user;
        console.log(user);
        // if(user != null) {
        //   user.providerData.forEach((profile) => {
        //     console.log(" Name: " + profile.displayName);
        //   })
        // }
      })

      .catch(error => {
        console.error(error);
        setError(error.message);
      })
    }

    else {
      createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setEmail('');
        setPassword('');
        verifyEmail();
        
        setUserName();

        
    })
    .catch((error) => {
      console.log(error);
      setError(error.message);
    })
    }

    //console.log('Form submitted', email, password);
    
    event.preventDefault();
  }

  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    })

    .then(() => {
      console.log('updated name');
    })
    .catch((error) => {
      console.log(error + 'update name error');
    })
  }

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
    .then(() => {
      console.log('Email Verification Sent');
    })
  }

  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log('Password reset email sent');
    })
    .catch((error) => {
      console.log('Error on sending password reset email');
    })
  }

  return (
    <div>
      <div className='Registration w-50 mx-auto mt-2'>
        <h2 className='text-primart'>Please {register ? 'Login' : 'Register'}</h2>
        <Form onSubmit={handleFormSubmit}>
        {!register && <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Your Name: </Form.Label>
            <Form.Control onBlur={handleNameBlur} type="text" placeholder="Your Name" required />
            <Form.Text className="text-muted">
              Enter Your Full Name
            </Form.Text>
          </Form.Group>}

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

          <Button onClick={handleForgotPassword} variant="link">Forgot Password?</Button> <br></br>
          
          <p className='text-danger'>{error}</p>
          <Button variant="primary" type="submit">
            {register ? 'Login' : 'Register'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
