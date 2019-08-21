const API_KEY = 'h0IEr7EllXcQ0NEc3fE4B45ot7omfLK2';
// const URL = 'https://api.giphy.com/v1/gifs/search';
const URL = 'https://api.tvmaze.com/search/shows';
/**
 * Performs an HTTP request to Giphy API
 * @param q - Search query term or phrase.
 * @param offset - The maximum number of objects to return. (Default: “25”)
 * @param limit - Specifies the starting position of the results. Defaults to 0.
 */
export const search = async (q, offset = 25, limit = 0) => {
  await fetch(`${URL}?q=${q}&offset=${offset}&limit=${limit}`)
    .then(response => response.json())
    .then(console.log);
};