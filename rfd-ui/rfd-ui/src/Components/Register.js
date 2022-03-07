import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import {createUser} from '../Service/api';

//import Errors from './Error';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState([]);

  const auth = useContext(AuthContext);

  const history = useHistory();

  const usernameOnChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordOnChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const confirmPasswordOnChangeHandler = (event) => {
    setConfirmPassword(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    setError([]);

    // client side validation... make sure password and confirm password match
    // if (password !== confirmPassword) {
    //   setError(['password and confirm password don\'t match']);
    //   return;
    // }

    // const newUser = {
    //   username,
    //   password
    // };


    // const init = {
    //   method: 'POST', // GET by default
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(newUser)
    // };

    // fetch('http://localhost:8080/create_game_user', init)
    //   .then(response => {
    //     if (response.status === 201 || response.status === 400) {
    //       return response.json();
    //     }
    //     return Promise.reject('Something unexpected went wrong');
    //   })
    //   .then(data => {
    //     if (data.appUserId) {
    //       // a new user account was created... now we authenticate them

    //       const init = {
    //         method: 'POST', // GET by default
    //         headers: {
    //           'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(newUser)
    //       };
      
    //       fetch('http://localhost:8080/rfd/authenticate', init)
            createUser(username,password).then(history.push('/login'));
            // .then(data => {
            //   if (data) {
            //     auth.login(data.jwt_token);
            //     history.push('/');
            //   } else {
            //     // we have error messages
            //     setError(['login failure']);
            //     console.log('Else is triggered')
            //   }
            // })
            // .catch(error => console.log(error));
        }
      
      
  

  return (
    <>
    <div class="log-form">
  
      <h2 className="my-4">Register</h2>
      
      
      <form onSubmit={formSubmitHandler}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input className="form-control" type="text" id="username" name="username" 
            value={username} onChange={usernameOnChangeHandler} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input className="form-control" type="password" id="password" name="password" 
            value={password} onChange={passwordOnChangeHandler} />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input className="form-control" type="password" id="confirmPassword" name="confirmPassword" 
            value={confirmPassword} onChange={confirmPasswordOnChangeHandler} />
        </div>
        <div className="mt-5">
          <button className="btn btn-secondary" type="submit">
            <i className="bi bi-plus-circle-fill"></i> Register</button>
            <button className="btn btn-secondary" type="submit">
            <i className="bi bi-plus-circle-fill"></i> Cancel</button>
          <Link to="/" >
           
          </Link>
        </div>
      </form>
      </div>
      
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      </>
  );
}

export default Register;