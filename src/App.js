import React, { Component } from 'react';
import './App.scss';
import { search }           from './api/giphyApi';
import Searchbar            from './components/searchbar';
import Gallery              from './components/gallery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      loading: false,
      gifs: [],
      offset: 0,
      totalCount: 0,
    };
    this.searchTimer = null;
  }

  // Triggers an HTTP request to Giphy API for fetching user-requested gifs
  searchGif = (searchTerm) => {
    // Since this triggers on every key pressed, add a delay before fetching
    // as user might still be typing
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }
    this.setState({ searchTerm });
    this.searchTimer = setTimeout(async () => {
      console.log('searching!');
      this.setState({ loading: true, gifs: [], offset: 0, totalCount: 0 });
      const response = await search(searchTerm);
      console.log('response', response);
      const { pagination } = response;
      this.setState({ loading: false, gifs: response.data, offset: pagination.offset, totalCount: pagination.total_count });
    }, 600);
  };

  render() {
    const { loading, gifs } = this.state;
    return (
      <div className="App">
        <Searchbar
          onChange={this.searchGif}
        />
        <Gallery
          loading={loading}
          gifs={gifs}
        />

      </div>
    );
  }
}

export default App;
