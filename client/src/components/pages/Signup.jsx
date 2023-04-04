import React, { useState } from 'react';
import '../../assets/signup.css'
import logo2 from '../../assets/images/NewLogo.png'

import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom'
import { SIGNUP } from '../../utils/mutations';
// import AuthService from '../../utils/auth.js';
// CHANGE: changed signup to SignupForm to enable the variable signup to be used within it.
const SignupForm = () => {

  const [username, setUsername] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const authService = new AuthService();
  const navigate = useNavigate();

  // implementation of SIGNUP mutation
  const [signup] = useMutation(SIGNUP)

  const handleSubmit = async (e) => {
    e.preventDefault();
    //try catch for user token authentication servuce
    
    // try {
      // const response = await authService.signup({ username, email, password });

      // if (response && response.token) {
      //   navigate('/'); // Navigate to the home page
      // } else {
      //   alert('Signup failed. Please check your information and try again.');
      // }
      // catch is catching for a wierd reason.
    // } catch (error) {
    //   console.log(error)
    //   alert('An error occurred during signup. Please try again.');
    // }

    // try catch used for the mutation
    try {
      const data = await signup({
        variables: { input: { username: username, email: email, password: password } },
      });
      console.log(data)
      setUsername('');
      setEmail('');
      setPassword('');
      // navigate("/Homepage");
    }
    catch (err) {
      console.error(err);
    }
  };


  return (
    <section className="vh-100" >
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                    <form onSubmit={handleSubmit} className="signform">

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            id="form3Example1c"
                            placeholder='Your Username'
                            className="form-control"
                          />
                          <label className="form-label" htmlFor="form3Example1c"></label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            id="form3Example3c"
                            placeholder='Your Email'
                            className="form-control"
                          />
                          <label className="form-label" htmlFor="form3Example3c"></label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            id="form3Example4c"
                            placeholder='Password'
                            className="form-control"
                          />
                          <label className="form-label" htmlFor="form3Example4c"></label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="password" id="form3Example4cd" placeholder='Repeat your password' className="form-control" />
                          <label className="form-label" htmlFor="form3Example4cd"></label>
                        </div>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                        <label className="form-check-label" htmlFor="form2Example3">
                          I agree all statements in <a href="#!">Terms of service</a>
                        </label>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary btn-lg thebtn AuthButton">Register</button>
                      </div>

                    </form>


                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img src={logo2} className="imglogo" alt="Sample mage"></img>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupForm;
