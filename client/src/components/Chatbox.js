import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { CHAT } from '../utils/queries'; // Make sure to import the CHAT query
import { MESSAGES } from '../utils/mutations'; // Make sure to import the ADD_MESSAGE mutation
// import { MDBCol, MDBTypography, MDBCard } from 'mdb-react-ui-kit'; // Make sure to import the required MDB components

function Chatbox({ posts, setPosts }) {
    const { loading, error, data } = useQuery(CHAT, {
      fetchPolicy: "network-only",
    });
    const [addMessage] = useMutation(MESSAGES);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
  
    useEffect(() => {
      if (data) {
        const fetchedMessages = data.messages.map((message) => ({
          name: message.username,
          content: message.MessageText,
          date: new Date(parseInt(message.createdAt)).toLocaleString(),
          id: message._id,
        }));
        setMessages(fetchedMessages);
      }
    }, [data]);
  
    const handleInputChange = (e) => {
      setMessage(e.target.value);
    };
  
    const updateMessages = (newMessage) => {
      setMessages([newMessage, ...messages]);
    };
  
    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
          const { data } = await addMessage({
            variables: { input: { MessageText: message } },
            refetchQueries: [{ query: CHAT }],
          });
          const newMessage = {
            name: data.addMessage.username,
            content: data.addMessage.MessageText,
            date: new Date().toLocaleString(),
            id: data.addMessage._id // add the id here
          };
          setMessages([newMessage, ...messages]); // update the messages state
          setMessage("");
        } catch (err) {
          console.log("received error:", err)
        }
      };
      
  
    if (loading) return 'Loading...';
    if (error) return `Error: ${error.message}`;
  
    return (
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <p>{message.name}: {message.content}</p>
            <small>{message.date}</small>
          </div>
        ))}
        <form onSubmit={handlePostSubmit}>
          <input
            type="text"
            name="postInput"
            placeholder="Type your message here"
            value={message}
            onChange={handleInputChange}
          />
          <button type="submit">Post</button>
        </form>
      </div>
    );
  }
  
  export default Chatbox;
  