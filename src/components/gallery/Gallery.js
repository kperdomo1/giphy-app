import React, { useState } from 'react';
import PropTypes           from 'prop-types';
import LazyLoad            from 'react-lazyload';
import Lightbox            from '../lightbox';

import './gallery.scss';

const Gallery = ({ gifs, loading }) => {
  const [selectedGif, setSelectedGif] = useState(null);

  return (
    <>
      <div className="gallery">
        { columnsArr.map(col => (
          <div key={ col } className="col">
            {/* in order to show this in natural way, we only draw the gifs corresponding to current column (vertical draw) */ }
            { gifs.map((gif, index) => (index % chunks === col) ? (
              <div key={ gif.id } className="item" onClick={() => setSelectedGif(index)}>
                {/* Lazy load the image. Dont load images that aren't visible to current scrolling position */ }
                <LazyLoad height={ gif.images.preview_gif.height }>
                  <img src={ gif.images.preview_gif.url } alt={ gif.slug }/>
                </LazyLoad>
              </div>
            ) : '') }
          </div>
        )) }
        { loading && (
          columnsArr.map(col => (
            <div key={col} className="col">
              { skeletonArray.map((el, index) => (index % chunks === col) ? (
                <div key={ el } className="item">
                  <div className="skeleton-pulse" style={ { height: Math.random() * (400 - 150 + 1) + 150 } }/>
                </div>
              ): '') }
            </div>
          ))
        ) }
      </div>
      {selectedGif != null && (
        <Lightbox
          currentIndex={selectedGif}
          gifs={gifs}
          onClose={() => setSelectedGif(null)}
        />
      )}
    </>
  );
};

// Mock array for a skeleton content loader
const skeletonArray = [];
for (let i = 0; i < 20; i++) {
  skeletonArray.push(i);
}

// Based on window's (initial) resolution, get the chunks the gallery should equally show gifs
const getChunks = () => {
  let chunks        = 4;
  const windowWidth = window.innerWidth;
  if (windowWidth <= 960) {
    chunks = 2;
  }
  if (windowWidth <= 540) {
    chunks = 1;
  }
  return chunks;
};

const chunks     = getChunks();
const columnsArr = [];
// Calculate how many columns are we going to draw into the gallery
for (let i = 0; i < chunks; i++) {
  columnsArr.push(i);
}

Gallery.propTypes = {
  gifs: PropTypes.array,
  loading: PropTypes.bool
};

Gallery.defaultProps = {
  gifs: [],
  loading: false
};

export default Gallery;