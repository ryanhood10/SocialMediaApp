import React from 'react';
import { FaUserFriends } from 'react-icons/fa';

const FriendList = () => {
  return (
    <div className='friendList'>
      <h2>Friends</h2>
      <ul>
        <li>
          <img src='https://example.com/profile-picture.png' alt='Profile' />
          <p>John Doe</p>
        </li>
        <li>
          <img src='https://example.com/profile-picture.png' alt='Profile' />
          <p>Jane Smith</p>
        </li>
        <li>
          <img src='https://example.com/profile-picture.png' alt='Profile' />
          <p>Bob Johnson</p>
        </li>
      </ul>
    </div>
  );
};

export default FriendList;