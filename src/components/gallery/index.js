import React from 'react';
import './gallery.scss';

const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

function chunk(array, size) {
  const chunked_arr = [];
  let copied = [...array]; // ES6 destructuring
  const numOfChild = Math.ceil(copied.length / size); // Round up to the nearest integer
  for (let i = 0; i < numOfChild; i++) {
    chunked_arr.push(copied.splice(0, size));
  }
  return chunked_arr;
}

console.log(chunk(skeletonArray, 4));

const Gallery = ({ gifs, loading }) => (
  <div className="gallery">
    {chunk(skeletonArray, 4).map(arr => (
      <div key={arr.join()} className="col">
        {arr.map(el => (
          <div key={ el } className="item">
            <div className="skeleton-pulse" style={{ height: Math.random() * (600 - 200 + 1) + 200}} />
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default Gallery;


