import React from "react";
import { HashRouter, Routes, Route  } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './App.css';


// pages import

import Homepage from './components/pages/Homepage';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';

import Profile from './components/pages/Profile';

// import Search from './components/pages/Search';
// header and footer imports
// import Header from './components/Header'
// import Footer from './components/Footer'

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});


const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>

      <ApolloProvider client={client}>
        <div className="App">

          <HashRouter>
            
              <Routes>
                <Route exact path='/' element={<Login />} />
                <Route exact path='/Signup' element={<Signup />} />

                <Route path='/Homepage' element={<Homepage />} />
                <Route path='/Profile/:username' element={<Profile />} />

              </Routes>
            
          </HashRouter>

        </div>
      </ApolloProvider>
    </>

  );
}

export default App;

