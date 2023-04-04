import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
//NEW CODE import searchBar component
import SearchBar from '../Searchbar';
import { client } from "../../App";



import {
  MDBCol,
  MDBCard,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function Homepage() {
  //queries

  const { loading, data } = useQuery(USER)
  ;
  const { loading: userLoading, data: userData } = useQuery(USER);
  
// friendlist query
  const { loading1, friendsList } = useQuery(USER)
  const friends = friendsList?.friends || [];
  // states
 // const [search, setSearch] = useState('')


  

  // user search query: this query is supposed to run through the usernames to spit out a URL that ends in /Profile/username
  // the username is supposed to work by being a template literal in the navigate function below at line 56, call the search button, the corresponding onClick at line 98
  const { loading2, searching } = useQuery(SEARCH)
  const userSearch = searching

  // states

  const [message, setMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState(''); // new state for search term


  // mutation
  const [ addMessage, {error} ] = useMutation(MESSAGES)

  // moving through pages
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

  const searchButton = (e) => {
    navigate(`/Profile/${userSearch}`)
  }

  const handlePostSubmit = (e) => {
    e.preventDefault();
    console.log(message)
    const { data } = addMessage({
      variables: { input: {MessageText: message} },
    });
    console.log(data)

    const postInput = e.target.elements.postInput.value;
    const post = {
      content: postInput,
      date: new Date().toLocaleString(),
      name: "Andrew"
    };
    setPosts([post, ...posts]);
    setShowPostCard(false);
  };

  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   // Check if searchTerm exists in the user database
  //   const { data: userData } = await client.query({
  //     query: USER,
  //     variables: { username: searchTerm },
  //   });
  
  //   // If user exists, navigate to the corresponding profile page
  //   if (userData.user) {
  //     navigate(`/profile/${userData.user.username}`);
  //   } else {
  //     alert("User not found!");
  //   }
  // };
  

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
            <Link to={`/profile/${data?.me.username}`}>
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

