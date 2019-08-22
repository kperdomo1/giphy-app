const API_KEY = 'h0IEr7EllXcQ0NEc3fE4B45ot7omfLK2';
const URL = 'https://api.giphy.com/v1/gifs/search?api_key=' + API_KEY;

/**
 * Performs an HTTP request to Giphy API
 * @param q - Search query term or phrase.
 * @param offset - The maximum number of objects to return. (Default: “20”)
 * @param limit - Specifies the starting position of the results. Defaults to 0.
 */
export const search = async (q, offset = 0, limit = 20) => {
  const response = await fetch(`${URL}&q=${q}&offset=${offset}&limit=${limit}`);
  const result =  await response.json();
  // Payloads are HUGE, so selectively take what matters to state
  result.data = result.data.map(g => ({
    id: g.id,
    slug: g.slug,
    title: g.title,
    images: {
      preview_gif: g.images.preview_gif,
      original: g.images.original
    }
  }));
  return result;
};