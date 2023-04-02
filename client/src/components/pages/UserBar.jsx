
import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/userbar.css';

const UserBar = () => {
  return (
    <div className='userBar'>
      <h2>Other Users</h2>
      <ul className='userList'>
        <li><Link to='/user1'>User 1</Link></li>
        <li><Link to='/user2'>User 2</Link></li>
        <li><Link to='/user3'>User 3</Link></li>
        <li><Link to='/user4'>User 4</Link></li>
        <li><Link to='/user5'>User 5</Link></li>
        <li><Link to='/user6'>User 6</Link></li>
      </ul>
    </div>
  );
};

export default UserBar;
