import React from 'react';
import { FaUser } from 'react-icons/fa';

const ChatCard = ({ name, message, time }) => {
  return (
    <div className='chatCard'>
      <div className='userIcon'>
        <FaUser />
      </div>
      <div className='chatContent'>
        <h4>{name}</h4>
        <p>{message}</p>
      </div>
      <div className='time'>
        <p>{time}</p>
      </div>
    </div>
  );
};

export default ChatCard;
