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
    this.lazyLoading = false;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.loadMore);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.loadMore);
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
      this.setState({ loading: true, gifs: [], offset: 0, totalCount: 0 });
      const response = await search(searchTerm);
      const { pagination } = response;
      this.setState({
        loading: false,
        gifs: response.data,
        offset: pagination.offset + pagination.count,
        totalCount: pagination.total_count
      });
      // TODO: no result => show 'no result' message
    }, 600);
  };

  loadMore = async () => {
    const { offset, totalCount, searchTerm, gifs } = this.state;
    if (searchTerm && // we should have at least a search term to perform a lookup
        !this.lazyLoading && // If we r already fetching, wait for it to finish!
        offset < totalCount && // If we have stuff to fetch & we're near the bottom
        document.body.getBoundingClientRect().bottom <= window.innerHeight * 1.3) {
      // User scrolled near the bottom of page
      this.lazyLoading = true;
      console.log('near the bottom!!!');
      this.setState({ loading: true });
      const response = await search(searchTerm, offset);
      const { pagination } = response;
      const newGifs = [...gifs, ...response.data];
      // Set new state based on lazy loaded gifs.
      this.setState({
        loading: false, gifs: newGifs,
        offset: pagination.offset + pagination.count,
        totalCount: pagination.total_count
      }, () => this.lazyLoading = false);
    }
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
