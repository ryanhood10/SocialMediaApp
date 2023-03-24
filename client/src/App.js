import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css';
import React from "react";

// pages import
import Homepage from './components/pages/Homepage';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';
import Search from './components/pages/Search';
// header and footer imports
// import Header from './components/Header'
// import Footer from './components/Footer'


function App() {
  return (
    <>
      <div className="App">

        <HashRouter>
          <header className='navbarHeader'>Header Place Holder
            <ul className="nav justify-content-center">
              <li className="nav-item">
                <Link className="nav-link" to='/Login'>login placeholder</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/Homepage'>homepage</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/Profile'>profile page</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/Search'>search result</Link>
              </li>
            </ul>
          </header>
          
            <Routes>

              <Route exact path='/' element={<Login />} />
              <Route path='/Homepage' element={<Homepage />} />
              <Route path='/Profile' element={<Profile />} />
              <Route path='/Search' element={<Search />} />
            </Routes>
          
        </HashRouter>


      </div>
    </>

  );
}

export default App;

{/* <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div> */}