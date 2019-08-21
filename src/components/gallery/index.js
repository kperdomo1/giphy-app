import React from 'react';
import './gallery.scss';
import LazyLoad from 'react-lazyload';

// Mock array for a skeleton content loader
const skeletonArray = [];
for (let i = 0; i < 20; i++) {
  skeletonArray.push(i);
}

/**
 * Splits arrays into equal chunks
 * @param array
 * @param chunks
 * @returns {[]}
 */
const splitEqually = (array, chunks) => {
  const chunk = array.length / chunks;
  const result = [];
  if (array.length > 0) {
    for (let i = 0; i < chunks; i++) {
      result.push(array.slice(i * chunk, i * chunk + chunk));
    }
  }
  return result;
};

// Based on window resolution, get the chunks the gallery should equally show gifs
const getChunks = () => {
  let chunks = 4;
  const windowWidth = window.innerWidth;
  if (windowWidth <= 960) {
    chunks = 2;
  }
  if (windowWidth <= 540) {
    chunks = 1;
  }
  return chunks;
};

const chunks = getChunks();

const Gallery = ({ gifs, loading }) => (
  <>
    <div className="gallery">
      {splitEqually(gifs, chunks).map(gifArr => (
        <div key={gifArr[0].slug} className="col">
          {gifArr.map(gif => (
            <div key={gif.id} className="item">
              <LazyLoad height={gif.images.preview_gif.height}>
                <img src={gif.images.preview_gif.url} alt={gif.slug} />
              </LazyLoad>
            </div>
          ))}
        </div>
      ))}
      { loading && (
        splitEqually(skeletonArray, chunks).map(arr => (
          <div key={arr.join()} className="col">
            {arr.map(el => (
              <div key={ el } className="item">
                <div className="skeleton-pulse" style={{ height: Math.random() * (600 - 200 + 1) + 200}} />
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  </>
);

export default Gallery;


