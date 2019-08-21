import React from 'react';
import './lightbox.scss';

class Lightbox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { gifs, currentIndex, onClose } = this.props;
    return (
      <div className="lightbox">
          <img className="display-image" src={gifs[currentIndex].images.original.url} />
        <span className="close cursor" onClick={onClose}>&times;</span>
      </div>
    );
  }
}

export default Lightbox;