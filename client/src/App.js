import React from "react";
import { HashRouter, Routes, Route  } from 'react-router-dom'
import './App.css';


// pages import
// import Homepage from './components/pages/Homepage';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
// import Profile from './components/pages/Profile';
// import Search from './components/pages/Search';
// header and footer imports
// import Header from './components/Header'
// import Footer from './components/Footer'


function App() {
  return (
    <>
      <div className="App">

        <HashRouter>
          
            <Routes>

              <Route exact path='/' element={<Login />} />
              <Route exact path='/Signup' element={<Signup />} />
              {/* <Route exact path='/Homepage' element={<Homepage />} /> */}
              {/* <Route path='/Profile' element={<Profile />} /> */}
              {/* <Route path='/Search' element={<Search />} /> */}
            </Routes>
          
        </HashRouter>


      </div>
    </>

  );
}

export default App;

