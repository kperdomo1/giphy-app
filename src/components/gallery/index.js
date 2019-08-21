import React from 'react';
import './gallery.scss';
import mock from '../../mock';
import LazyLoad from 'react-lazyload';

const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

/**
 * Splits an array into chunks
 * @param array - array to split
 * @param size - size of EACH chunk
 * @returns {[]}
 */
function chunk(array, size) {
  const chunked_arr = [];
  let copied = [...array];
  const numOfChild = Math.ceil(copied.length / size); // Round up to the nearest integer
  for (let i = 0; i < numOfChild; i++) {
    chunked_arr.push(copied.splice(0, size));
  }
  return chunked_arr;
}

const Skeleton = ({height = 'auto'}) => (
  <div className="skeleton-pulse" style={{ height, width: '100%', background: 'black' }} />
);

const Gallery = ({ gifs, loading }) => (
  <>
    <div className="gallery">
      {chunk(gifs, 5).map(gifArr => (
        <div key={gifArr.map(g => g.id).join()} className="col">
          {gifArr.map(gif => (
            <div key={gif.id} className="item">
              <LazyLoad height={gif.images.preview_gif.height} placeholder={<Skeleton height={gif.images.preview_gif.height} />}>
                <img src={gif.images.preview_gif.url} alt={gif.slug} />
              </LazyLoad>
            </div>
          ))}
        </div>
      ))}
      { loading && (
        chunk(skeletonArray, 5).map(arr => (
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


