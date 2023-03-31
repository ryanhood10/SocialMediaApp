import React, { useState, useEffect, useRef, Fragment } from "react";
import logo from '../../assets/images/Login.png';
import '../../assets/profile.css';
import { FaSearch, FaHome } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';

export default function Profile() {
  const [profilePicture, setProfilePic] = useState(null);
  const fileInputRef = useRef(null);

  // const [isFollowing, setIsFollowing] = useState(false);
  const [bio, setBio] = useState('');


  // function that trigger the input file whenever
  function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem('profilePicture', reader.result);
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function handleClick() {
    fileInputRef.current.click();
  }

  useEffect(() => {
    const savedProfilePicture = localStorage.getItem('profilePicture');
    if (savedProfilePicture) {
      setProfilePic(savedProfilePicture);
    }

    const savedBio = localStorage.getItem('bio');
    if (savedBio) {
      setBio(savedBio);
    }
  console.log()

  }, []);

  // // follow button function
  // function handleFollowClick() {
  //   setIsFollowing(!isFollowing);
  // }

 
  

  function handleBioChange(event) {
    const value = event.target.value;
    setBio(value)
  }

  function handleSaveBio() {
    localStorage.setItem('bio', bio);
  }
  


  return (

<header className='header'>
        <form className='searchForm'>
          <input type='text' placeholder='Search' className='searchInput' />
          <button type='submit' className='searchButton'>
            <FaSearch className='searchIcon' />
          </button>
        </form>

        <nav className='sideNav'>
          <ul>
            <li>
              <Link to='/Homepage'>
                <FaHome className='homeIcon' />
              </Link>
            </li>
            <li>
              <Link to='/Profile'>
                <CgProfile className='profileIcon' />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      
    <section className="h-100 gradient-custom-2">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-9 col-xl-7">
            <div className="card">
              <div className="rounded-top text-white d-flex flex-row firstRow">
                <div className="ms-4 mt-6 d-flex flex-column secondRow">
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="mt-4 firstImg"
                    style={{ width: '170px', height: '170px' }} />
                  <div className="uploadBtn">
                    <input ref={fileInputRef} className="uploadPhoto" type="file" onChange={handleFileUpload} />
                    <button onClick={handleClick}>Change Picture</button>
                  </div>
                  <div>
                  </div>
                </div>
                <div className="ms-3 thirdRow">
                  <h5>John Perez</h5>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="p-4 text-black fourthRow">
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                      <p className="mb-1 h5">0</p>
                      <p className="small text-muted mb-0">Photos</p>
                    </div>
                    <div className="px-3">
                      <p className="mb-1 h5">0</p>
                      <p className="small text-muted mb-0">Followers</p>
                    </div>
                    <div>
                      <p className="mb-1 h5">0</p>
                      <p className="small text-muted mb-0">Following</p>
                    </div>
                    <button 
                      // onClick={handleFollowClick}
                      className="followBtn">Follow</button>
                  </div>
                </div>
              </div>
              <div className="card-body p-4 text-black">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">Bio</p>
                  <div className="p-4 fifthRow">
                    <input type="text" className="form-control mb-2" value={bio} onChange={handleBioChange} placeholder="Write something about yourself" />
                    <button className="btn btn-primary" onClick={handleSaveBio}>Save Bio</button>
                    
                    </div>
                </div>
    
      

                 
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p className="lead fw-normal mb-0">Recent photos</p>
                    <p className="mb-0">
                      <a href="#!" className="text-muted">
                        Show all
                      </a>
                    </p>
                  </div>
                  <div className="row g-2">
                    <div className="col mb-2">
                      <img
                        src={logo}
                        alt="img 1"
                        className="w-100 rounded-3"
                      />
                    </div>
                    <div className="col mb-2">
                      <img
                        src={logo}
                        alt="img 1"
                        className="w-100 rounded-3"
                      />
                    </div>
                  </div>


              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
  )

}





