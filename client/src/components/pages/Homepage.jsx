import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaHome, FaPaperclip } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { FiPlus, FiSend, FiX } from 'react-icons/fi';
import { BiLogOutCircle } from 'react-icons/bi'
import '../../assets/homepage.css';
import { useQuery } from "@apollo/client";
import { USER } from '../../utils/queries';
// import FriendList from './FriendList';


export default function Homepage() {
  //queries
  const { loading, data } = useQuery(USER)
  const friends = data?.friends || [];
  console.log(friends)


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
    <body className="gradientBackground">
      <>
        <header className='header'>
          <div className='logo'>
            {/* <img src={logo} alt='Logo' /> */}
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
            <li title='New Post' data-title-delay='10'>
              <button className='navButton1' onClick={handlePostButtonClick}>
                <FiPlus className='navIcon' />
                <p className='navText1'>
                  New Post
                </p>
              </button>
            </li>
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

        {/* <div className='friendsList'>
          <h2>Friends</h2>
          <div className='friend'>
            <img src='' alt='Friend' />
            <span>Friend 1</span>
          </div>
          <div className='friend'>
            <img src='' alt='Friend' />
            <span>Friend 2</span>
          </div>
          <div className='friend'>
            <img src='' alt='Friend' />
            <span>Friend 3</span>
          </div>
        </div> */}

        {/* ========================= */}
        <div className='chatbox'>
        </div>

        {showPostCard && (
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
        )}
        <>
          <form className='postList'>
            {posts.map((post, index) => (
              <section className='post' key={index}>
                <p>{post.content}</p>
                <p>{post.date}</p>
              </section>
            ))}
          </form>
        </>
      </>
    </body>
  );
}
