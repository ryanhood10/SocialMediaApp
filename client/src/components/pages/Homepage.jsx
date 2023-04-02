import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaHome, FaPaperclip } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { FiPlus, FiSend, FiX } from 'react-icons/fi';
import { BiLogOutCircle } from 'react-icons/bi'
import '../../assets/homepage.css';
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBTypography,
  MDBInputGroup,
  MDBCardHeader
} from "mdb-react-ui-kit";


export default function Homepage() {


  const [showPostCard, setShowPostCard] = useState(false);
  const [posts, setPosts] = useState([]);

  const handlePostButtonClick = () => {
    setShowPostCard(!showPostCard);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const postInput = e.target.elements.postInput.value;
    const post = {
      content: postInput,
      date: new Date().toLocaleString(),
      user: {
        name: 'John Doe',
        pictureUrl: '',
      },
    };
    setPosts([post, ...posts]);
    setShowPostCard(false);
  };
  const handlePostCancel = () => {
    setShowPostCard(false);
  }

  return (
    <body class="gradientBackground">
      <>
        <header className='header'>
          <div className='logo'>
            <p className='Logo'>
              Word On The Street
            </p>
          </div>
          <form className='searchForm'>
            <input type='text' placeholder='Search' className='searchInput' />
            <button type='submit' className='searchButton'>
              <FaSearch className='searchIcon' />
            </button>
          </form>
        </header>
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
            <li title='Profile' data-title-delay='10'>
              <Link to='/Profile'>
                <button className='navButton'>
                  <CgProfile className='navIcon' />
                  <p className='navText'>
                    Profile
                  </p>
                </button>
              </Link>
            </li>
            {/* <li title='New Post' data-title-delay='10'>
              <button className='navButton1' onClick={handlePostButtonClick}>
                <FiPlus className='navIcon' />
                <p className='navText1'>
                  New Post
                </p>
              </button>
            </li> */}
            <li title='Logout' data-title-delay='10'>
              <Link to='/'>
                <button className='navButton'>
                  <BiLogOutCircle className='navIcon' />
                  <p className='navText'>
                    Logout
                  </p>
                </button>
              </Link>
            </li>
          </ul>
        </nav>
        <div className='friendsList'>
          <h2>Friends</h2>
          <div className='friend'>
            <img src='https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp' alt='Friend' />
            <span>Friend 1</span>
          </div>
          <div className='friend'>
            <img src='https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp' alt='Friend' />
            <span>Friend 2</span>
          </div>
          <div className='friend'>
            <img src='https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp' alt='Friend' />
            <span>Friend 3</span>
          </div>
        </div>
        <div className='chatbox'>
          <MDBCol md="6" lg="7" xl="8">
            <MDBTypography listUnStyled>
              <li className="d-flex justify-content-between mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                  alt="avatar"
                  className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                  width="60"
                />
                
                <MDBCard>
                  <>
                  <MDBCardHeader className="d-flex justify-content-between p-3 UserName">
                    <p className="fw-bold mb-0">Brad Pitt</p>
                    <p className="text-muted small mb-0">
                      <MDBIcon far icon="clock" /> 12 mins ago
                    </p>
                  </MDBCardHeader>
                </>
                  <MDBCardBody>
                    <form className='postList'>
                      {posts.map((post, index) => (
                        <section className='post' key={index}>
                          <p>{post.content}</p>
                          <p>{post.date}</p>
                        </section>
                      ))}
                    </form>
                  </MDBCardBody>
                </MDBCard>
              </li>
              <div id='bottom'>
            <div className='chatCard'>
              <form onSubmit={handlePostSubmit}>
                <textarea
                  placeholder='Write something...'
                  className='postInput'
                  name='postInput'
                ></textarea>
                <div className='postbuttons'>
                <button type='submit' className='postButton'>
                    <FiSend className='postIcon' />
                  </button>
                  <label htmlFor='fileInput' className='fileInput'>
                    <FaPaperclip className='paperclipIcon' />
                    <input
                      type='file'
                      id='fileInput'
                      accept='image/*'
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              </form>
            </div>
          </div>
             
            </MDBTypography>
          </MDBCol>
        </div>
        {/* {showPostCard && (
          <div className='cardWrapper'>
            <div className='chatCard'>
              <button className='cancelButton' onClick={handlePostCancel}>
                <FiX className='cancelIcon' />
              </button>
              <h2>Write a post</h2>
              <form onSubmit={handlePostSubmit}>
                <textarea
                  placeholder='Write something...'
                  className='postInput'
                  name='postInput'
                ></textarea>
                <br />
                <div className='postbuttons'>
                  <label htmlFor='fileInput' className='fileInput'>
                    <FaPaperclip className='paperclipIcon' />
                    <input
                      type='file'
                      id='fileInput'
                      accept='image/*'
                      style={{ display: 'none' }}
                    />
                  </label>
                  <button type='submit' className='postButton'>
                    <FiSend className='postIcon' />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )} */}
        <>
         
        </>
      </>
    </body>
  );
}
