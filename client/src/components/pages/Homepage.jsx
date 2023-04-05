import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaHome } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { FiSend } from 'react-icons/fi';
import { BiLogOutCircle } from 'react-icons/bi'
import '../../assets/homepage.css';
import { useQuery } from "@apollo/client";
import { CHAT, USER_PROFILE } from '../../utils/queries';
import { useMutation } from '@apollo/client';
import { MESSAGES } from '../../utils/mutations';
import Auth from '../../utils/auth'
import SearchBar from '../Searchbar';
import { client } from "../../App";
import {
  MDBCol,
  MDBCard,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function Homepage() {
  // how we navigate through pages
  const navigate = useNavigate();

  //queries
  // 1. friendlist query
  function FriendList() {
    const { loading, error, data } = useQuery(USER_PROFILE, {
      variables: { username: username }
    });

    if (loading) return 'Loading...';
    if (error) return `Error: ${error.friend}`;

    // Access the friends array in the data object
    const friendslist = data.user.friends

    return (
      //Render the friends array as needed
      <div>
        {friendslist.map(friend => (
          <div>
            <p>{friend.username}</p>
          </div>
        ))}
      </div>
    );
  }

  // 2. messages query
  function Chatbox() {
    const { loading, error, data } = useQuery(CHAT);

    if (loading) return 'Loading...';
    if (error) return `Error: ${error.message}`;

    // Access the messages array in the data object
    const messages = data.messages;

    return (
      // Render the messages array as needed
      <div>
        {messages.map(message => (
          <div key={message.createdAt}>
            <p>{message.username}: {message.MessageText}</p>
            <small>{message.createdAt}</small>
          </div>
        ))}
      </div>
    );
  }

  // NEW method of getting username
  const profile = Auth.getProfile()
  const username = profile.data.username

  // mutations
  const [addMessage, { error }] = useMutation(MESSAGES)

  // states
  // 1. message state
  const [message, setMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState(''); // new state for search term
  // 2. post state
  const [showPostCard, setShowPostCard] = useState(false);
  const [posts, setPosts] = useState([]);

  // EVENTS
  // 1. message changes
  const handleInputChange = (e) => {
    if (e.target.name === "postInput") {
      setMessage(e.target.value)
    }
  }
  // 2. logout button
  const handleClick = (e) => {
    Auth.logout()
    navigate("/")
  }
  // 3. message post button 
  const handlePostSubmit = (e) => {
    e.preventDefault();

    const { data } = addMessage({
      variables: { input: { MessageText: message } },
    });

    const postInput = e.target.elements.postInput.value;
    const post = {
      name: username,
      content: postInput,
      date: new Date().toLocaleString()
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
        {/* Render the search bar component here */}
        <SearchBar />

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
            <Link to={`/profile/${username}`}>
              <button className='navButton'>
                <CgProfile className='navIcon' />
                <p className='navText'>
                  Profile
                </p>
              </button>
            </Link>

          </li>
          {/* This is the logout button */}
          <li title='Logout' data-title-delay='10'>
            <Link to='/'>
              <button
                className='navButton'
                onClick={handleClick}>
                <BiLogOutCircle className='navIcon' />
                <p className='navText'> Logout </p>
              </button>
            </Link>
          </li>
        </ul>
      </nav>

      {/* friends list to be edited */}
      <div className='friendsList'>
        <h2>Friends</h2>
        {FriendList()}
      </div>

      {/* This is the chatbox */}
      <div className='chatbox'>
        <MDBCol md="6" lg="7" xl="8">
          <MDBTypography listUnStyled>
            <li className="d-flex justify-content-between mb-4">
              <MDBCard>
                {Chatbox()}
              </MDBCard>
            </li>
            <div id='bottom'>
              <div className='chatCard'>



                {/* only thing that matters */}
                <form onSubmit={handlePostSubmit}>
                  <textarea
                    onChange={handleInputChange}
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
                {/* ^^^^^^^^^^^^^^^^^^^^^^^ */}



              </div>
            </div>

          </MDBTypography>
        </MDBCol>
      </div>
    </div>
  );
}

