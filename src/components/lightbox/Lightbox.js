import React     from 'react';
import PropTypes from 'prop-types';

import './lightbox.scss';

class Lightbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: props.currentIndex
    }
  }

  changeCurrentSlide = (currentIndex) => {
    this.setState({ currentIndex })
  };

  render() {
    const { gifs, onClose } = this.props;
    const { currentIndex } = this.state;
    const prevIndex = getPrevValue(currentIndex, gifs.length);
    const nextIndex = getNextValue(currentIndex, gifs.length);
    return (
      <div className="lightbox">
        <div className="numbertext">{currentIndex + 1} / { gifs.length }</div>
        {/* Load hidden prev image to improve UX navigation */}
        <img
          className="prev-image"
          src={gifs[prevIndex].images.original.url}
          alt={gifs[prevIndex].title}
        />
        <img
          className="display-image"
          src={gifs[currentIndex].images.original.url}
          alt={gifs[currentIndex].title}
        />
        {/* Load hidden next image to improve UX navigation */}
        <img
          className="next-image"
          src={gifs[nextIndex].images.original.url}
          alt={gifs[nextIndex].title}
        />
        <div className="caption-container">
          { gifs[currentIndex].title }
        </div>
        <a className="prev" onClick={() => this.changeCurrentSlide(prevIndex)}>&#10094;</a>
        <a className="next" onClick={() => this.changeCurrentSlide(nextIndex)}>&#10095;</a>
        <span className="close cursor" onClick={onClose}>&times;</span>
      </div>
    );
  }
}

const getPrevValue = (current, total) => (current === 0 ? total - 1 : current - 1);

const getNextValue = (current, total) => (current === total - 1 ? 0 : current + 1);

Lightbox.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  gifs: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Lightbox;