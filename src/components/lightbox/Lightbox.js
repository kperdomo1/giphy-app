import React from 'react';
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

const getPrevValue = (current, total) => {
  if (current === 0) {
    current = total - 1;
  } else {
    current --;
  }
  return current;
};

const getNextValue = (current, total) => {
  if (current === total - 1) {
    current = 0;
  } else {
    current ++;
  }
  return current;
};

export default Lightbox;