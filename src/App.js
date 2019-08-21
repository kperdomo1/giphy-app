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
      gifs: []
    };
    this.searchTimer = null;
  }

  searchGif = (term) => {
    const searchTerm = term;
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }
    this.setState({ searchTerm });
    this.searchTimer = setTimeout(async () => {
      console.log('searching!');
      this.setState({ loading: true, gifs: [] });
      const gifs = await search(searchTerm);
      this.setState({ loading: false, gifs });
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
