import React, { useState, useEffect, useRef, Fragment } from "react";
import logo from '../../assets/images/Login.png';
import '../../assets/profile.css';
import { FaSearch, FaHome } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { BiLogOutCircle } from 'react-icons/bi'
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery } from "@apollo/client";
import { USER_PROFILE  } from "../../utils/queries";
// import { ADDFRIEND } from '../../utils/mutations';
import SearchBar from '../Searchbar';
import { ADDFRIEND  } from "../../utils/mutations";

export default function Profile() {
  const { username } = useParams();

  const { loading, data } = useQuery(USER_PROFILE, {
    variables: { username: username },
  });
  


  const [profilePicture, setProfilePic] = useState(null);
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const bioInputRef = useRef(null);

  // const [isFollowing, setIsFollowing] = useState(false);
  const [bio, setBio] = useState('');

  // add friend state and funcion
  const [addFriend, { error }] = useMutation(ADDFRIEND);

 
  const handleAddFriend = async () => {
    console.log(data?.user.username);
    console.log(data?.user._id)
    try {
      await addFriend({ variables: { friendId: data?.user?._id } });
      // You can update the UI accordingly here, for example, change the "addFriend" button to "Friend Added"
    } catch (error) {
      console.error(error);
      // Handle the error, for example, show an error message to the user
    }
  };

//


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

  }, []);


  function handleBioChange(event) {
    setBio(event.target.value);
  }

  function handleSaveBio() {
    localStorage.setItem("bio", bio);
    setIsEditing(false);
  }

  function handleEditBio() {
    setIsEditing(true);
  }

  return (
    <>
    {/* {username ? <h5>{username}</h5> : <h5>Loading...</h5>} */}
    <div>{data?.user.username}</div>

      <header className='headerProfile'>
       {/* Render the search bar component here */}
    <SearchBar />


        <nav className='sideNav'>
          <ul>
            <li title='Home' data-title-delay='10'>
              <Link to='/Homepage'>
                <button className='navButton'>
                  <FaHome className='navIcon' />
                  <p className='navText'>
                    Home
                  </p>
                </button>
              </Link>
            </li>
            <li title='Logout' data-title-delay='10'>
              <Link to='/'>
                <button 
                className='navButton' 
                onClick= {handleClick}>                 
                  <BiLogOutCircle className='navIcon' />
                  <p className='navText'>
                    Logout
                  </p>
                </button>
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
                    {/* This is where the username should go */}
                    <div>{data?.user.username}</div>

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
                      
                      
                      <button onClick={handleAddFriend}>addFriend</button>

                    </div>
                  </div>
                </div>
                <div className="card-body p-4 text-black">
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">About</p>
                    <div className="p-4 fifthRow">
                      {isEditing ? (
                        <div>
                          <input
                            type="text"
                            ref={bioInputRef}
                            value={bio}
                            onChange={handleBioChange}
                            placeholder="Write something about yourself"
                          />
                          <button className="bioButton" onClick={handleSaveBio}>Save</button>
                        </div>
                      ) : (
                        <div>
                          <p>{bio}</p>
                          <button className="bioButton" onClick={handleEditBio}>Edit Bio</button>
                        </div>
                      )}

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

    </>
  )

}

// if(me){
//   // hide add friend
// }





