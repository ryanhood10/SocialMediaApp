import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useQuery } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { SEARCH_USER } from '../utils/queries';


const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { loading, error, data } = useQuery(SEARCH_USER, {
    variables: { searchTerm },
    skip: !searchTerm,
  });
const navigate = useNavigate();


  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

const handleSearch = (e) => {
  e.preventDefault();
  navigate(`/Profile/${searchTerm}`);
  // if (data?.searchUser?.username) {
  //   navigate(`/Profile/${searchTerm}`);
  // }
};


  return (
    <form className='searchForm'>
      <input
        type='text'
        placeholder='Search'
        className='searchInput'
        onChange={handleSearchInputChange}
      />
      <button type='submit' onClick={handleSearch} className='searchButton'>
        <FaSearch className='searchIcon' />
      </button>
    </form>
  );
};

export default SearchBar;
