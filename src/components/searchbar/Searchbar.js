import React      from 'react';
import SearchIcon from './SearchIcon';
import './searchbar.scss';

const Searchbar = ({ onChange }) => (
  <div className="searchbar-wrapper">
    <div className="input-container">
      <input onChange={ev => onChange(ev.target.value)} autoFocus={true} type="text" placeholder="Search for gifs!" />
      <div className="search-icon">
        <SearchIcon />
      </div>
    </div>
    <a className="powered-by" href="https://giphy.com/" target="_blank" rel="noopener noreferrer">
      <img alt="powered-by-giphy" src="./powred-by.png" />
    </a>
  </div>
);

export default Searchbar;