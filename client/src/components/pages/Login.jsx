import React, { useState } from 'react'
import '../../assets/login.css'
import logo from '../../assets/images/Login.png'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';



export default function LoginFunction() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // implementing login mutation
  const [login] = useMutation(LOGIN);
  const navigate = useNavigate()


  const [validationErrors, setValidationErrors] = useState({
    email: false,
    password: false,
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  // this is what is happening on a click
  const handleOnClick = async () => {
    if (email.length < 1) {
      setValidationErrors({
        ...validationErrors,
        email: true
      });
    } else {
      setValidationErrors({
        ...validationErrors,
        email: false,
      });
    }

    if (password.length < 1) {
      setValidationErrors({
        ...validationErrors,
        password: true
      });
    } else {
      setValidationErrors({
        ...validationErrors,
        password: false,
      });
    }

    try {
      const data = await login({
        variables: { input: { email: email, password: password } },
      });
      console.log(data)
      setEmail('');
      setPassword('');
      navigate("/Homepage")
      // window.location.href = "http://localhost:3000/homepage";
    }
    catch (err) {
      console.error(err);
    }
  }




  return (

    <div className='loginBody'>

      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img className='logoimg' src={logo} alt="logo" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">



              <main className='main'>
                <form className='theform'>
                  <div className="form-outline mb-4">

                    <input
                      value={email}
                      onChange={(event) => { handleOnChange(event) }}
                      type="text"
                      id="email"
                      name="email"
                      className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
                      placeholder='Enter your email'>
                    </input>

                    <label className="form-label" htmlFor="form3Example3"></label>
                  </div>


                  <div className="form-outline mb-3">
                    <input
                      value={password}
                      onChange={(event) => { handleOnChange(event) }}
                      type="password"
                      id="password"
                      name="password"
                      className={`form-control ${validationErrors.password ? 'is-invalid' : ''}`}
                      placeholder='Enter your password'>
                    </input>
                    <label className="form-label" htmlFor="form3Example4"></label>
                  </div>



                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button type="button" onClick={handleOnClick} className="btn btn-primary btn-lg btnlog">Login</button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account?
                      <Link to='/Signup' className="link-danger"> Register</Link></p>
                  </div>

                </form>
              </main>

            </div>
          </div>
        </div>

        <footer>
          <ul>
            <li>Welcome to WordOnTheStreet</li>
          </ul>


        </footer>
      </section>



    </div>

  )
}





