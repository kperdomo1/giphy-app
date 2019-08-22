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

  changeCurrentSlide = (currentIndex, animation) => {
    const gif = document.querySelector('.current-image');
    gif.style.animationName = animation;
    gif.addEventListener('animationend', () => {
      this.setState({ currentIndex });
      gif.style.animationName = '';
    });
  };

  render() {
    const { gifs, onClose } = this.props;
    const { currentIndex } = this.state;
    const prevIndex = getPrevValue(currentIndex, gifs.length);
    const nextIndex = getNextValue(currentIndex, gifs.length);
    const images = [
      { gif: gifs[prevIndex], className: 'prev-image' },
      { gif: gifs[currentIndex], className: 'current-image' },
      { gif: gifs[nextIndex], className: 'next-image' }
    ];
    return (
      <div className="lightbox">
        <div className="numbertext">{currentIndex + 1} / { gifs.length }</div>
        {/* Load hidden prev & next image to improve UX navigation */}
        {images.map(img => (
          <img
            key={img.gif.id}
            className={img.className}
            src={img.gif.images.original.url}
            alt={img.gif.title}
          />
        ))}
        <div className="caption-container">
          { gifs[currentIndex].title }
        </div>
        <a className="prev" onClick={() => this.changeCurrentSlide(prevIndex, 'slideOutRight')}>&#10094;</a>
        <a className="next" onClick={() => this.changeCurrentSlide(nextIndex, 'slideOutLeft')}>&#10095;</a>
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