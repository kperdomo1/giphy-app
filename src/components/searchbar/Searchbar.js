import React      from 'react';
import SearchIcon from './SearchIcon';
import './searchbar.scss';

const Searchbar = ({ onChange }) => (
  <div className="searchbar-wrapper">
    <div className="input-container">
      <input onChange={onChange} autoFocus={true} type="text" placeholder="Search for gifs!" />
      <div className="search-icon">
        <SearchIcon />
      </div>
    </div>
    <a className="powered-by" href="https://giphy.com/" target="_blank">
      <img alt="powered-by-giphy" src="./powred-by.png" />
    </a>
  </div>
);

export default Searchbar;