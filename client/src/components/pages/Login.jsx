import React from 'react'
import '../../assets/login.css'
import logo from '../../assets/images/Login.png'
import { Link } from 'react-router-dom'


export default function Login() {
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
                    <input type="email" id="form3Example3" className="form-control form-control-lg"
                      placeholder="Enter a valid email address" />
                    <label className="form-label" htmlFor="form3Example3"></label>
                  </div>


                  <div className="form-outline mb-3">
                    <input type="password" id="form3Example4" className="form-control form-control-lg"
                      placeholder="Enter password" />
                    <label className="form-label" htmlFor="form3Example4"></label>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">

                    <div className="form-check mb-0">
                      <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                      <label className="form-check-label" htmlFor="form2Example3">
                        Remember me
                      </label>
                    </div>

                  </div>

                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button type="button" className="btn btn-primary btn-lg btnlog"
                    >Login</button>
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





