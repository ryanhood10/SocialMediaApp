import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { FaSearch, FaHome } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { FiSend } from 'react-icons/fi';
import { BiLogOutCircle } from 'react-icons/bi'
import '../../assets/homepage.css';
import { useQuery } from "@apollo/client";
import { USER, SEARCH } from '../../utils/queries';
import { useMutation } from '@apollo/client';
import { MESSAGES } from '../../utils/mutations';
import Auth from '../../utils/auth'
import { useNavigate } from 'react-router-dom'
// import FriendList from './FriendList';
import {
  MDBCol,
  MDBCard,
  MDBTypography,
} from "mdb-react-ui-kit";


export default function Homepage() {
  //queries
  const { loading, data } = useQuery(USER)
  const friends = data?.friends || [];

  // states
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')

  // mutation
  const [ addMessage, {error} ] = useMutation(MESSAGES)

  const navigate = useNavigate();


  const [showPostCard, setShowPostCard] = useState(false);
  const [posts, setPosts] = useState([]);

  const handleInputChange = (e) => {
    if(e.target.name === "postInput"){
      setMessage(e.target.value)
    }
  }

  const handleClick = (e) => {
    Auth.logout()
    navigate("/")
  }

  const handlePostSubmit = (e) => {
    e.preventDefault();
    console.log(message)
    const { data } = addMessage({
      variables: { input: {MessageText: message} },
    });

    const postInput = e.target.elements.postInput.value;
    const post = {
      content: postInput,
      date: new Date().toLocaleString(),
      name: "Andrew"
    };
    setPosts([post, ...posts]);
    setShowPostCard(false);
  };
 

  return (
    <div className="gradientBackground">
        <header className='header'>
          <div className='logo'>
            <p className='Logo'>
              Word On The Street
            </p>
          </div>

          {/* This is the search bar */}
          <form className='searchForm'>
            <input 
              type='text'
              placeholder='Search'
              className='searchInput'
            />            
            <button type='submit' className='searchButton'>
              <FaSearch className='searchIcon' />
            </button>            
          </form>

          {/* This is the homepage button */}
        </header>
        <nav className='sideNav'>
          <ul>
            <li title='Home' data-title-delay='10'>
              <Link to='/Homepage'>
                <button className='navButton'>
                  <FaHome className='navIcon' />
                  <p className='navText'> Home </p>
                </button>
              </Link>
            </li>
            {/* This is the profile button */}
            <li title='Profile' data-title-delay='10'>
              <Link to='/Profile/'>
                <button className='navButton'>
                  <CgProfile className='navIcon' />
                  <p className='navText'> Profile </p>
                </button>
              </Link>
            </li>
            {/* This is the logout button */}
            <li title='Logout' data-title-delay='10'>
              <Link to='/'>
                <button 
                className='navButton'
                onClick= {handleClick}>
                  <BiLogOutCircle className='navIcon'/>
                  <p className='navText'> Logout </p>
                </button>
              </Link>
            </li>
          </ul>
        </nav>

        {/* friends list to be edited */}
        <div className='friendsList'>
          <h2>Friends</h2>
          {friends.slice(0, 3).map((friend) => (
            <div className='friend' key={friend.id}>
              <img src={friend.avatar} alt='Friend' />
              <span>{friend.name}</span>
            </div>
          ))}
        </div>

        {/* This is the chatbox */}
        <div className='chatbox'>
          <MDBCol md="6" lg="7" xl="8">
            <MDBTypography listUnStyled>
              <li className="d-flex justify-content-between mb-4">
                <MDBCard>
                  <form className='postList'>
                    {posts.map((post, index) => (
                      <section className='post' key={index}>
                        <p>{post.content}</p>
                        <p>{post.date}</p>
                      </section>
                    ))}
                  </form>
                </MDBCard>
              </li>
              <div id='bottom'>
                <div className='chatCard'>
                  <form onSubmit={handlePostSubmit}>
                    <textarea
                      onChange= {handleInputChange}
                      placeholder='Write something...'
                      className='postInput'
                      name='postInput'
                    ></textarea>
                    <div className='postbuttons'>
                      <button type='submit' className='postButton'>
                        <FiSend className='postIcon' />
                      </button>
                    </div>
                  </form>
                </div>
              </div>

            </MDBTypography>
          </MDBCol>
        </div>        
    </div>
  );
}

