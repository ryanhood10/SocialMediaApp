import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaHome, FaPaperclip } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { FiPlus, FiSend } from 'react-icons/fi';
import '../../assets/homepage.css';

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
    };
    setPosts([post, ...posts]);
    setShowPostCard(false);
  };

  return (
    <>
      <header className='header'>
        <form className='searchForm'>
          <input type='text' placeholder='Search' className='searchInput' />
          <button type='submit' className='searchButton'>
            <FaSearch className='searchIcon' />
          </button>
        </form>
      </header>
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
          <li>
            <button className='newPostButton' onClick={handlePostButtonClick}>
              <FiPlus className='newPostIcon' />
            </button>
          </li>
        </ul>
      </nav>
      {showPostCard && (
        <div className='cardWrapper'>
          <div className='card'>
            <h2>Write a post</h2>
            <form onSubmit={handlePostSubmit}>
              <textarea placeholder='Write something...' className='postInput' name='postInput'></textarea>
              <br />
              <div className='postbuttons'>
              <label htmlFor="fileInput" className='fileInput'>
                <FaPaperclip className='paperclipIcon' />
                <input type="file" id="fileInput" accept="image/*" style={{display: 'none'}} />
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
  );
}
