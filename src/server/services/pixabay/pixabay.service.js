import axios from 'axios';

/**
 * Returns place photos by location text query.
 *
 * @see https://pixabay.com/api/docs/
 *
 * @export
 * @param {string} query - searching text
 *
 * @returns {Array<string>} array with photos URLs
 */
export async function getPlacePhotos(query)
{
    const { status, statusText, data } = await axios({
        method: 'get',
        url: `${process.env.PIXABAY_API_URL}?key=${process.env.PIXABAY_API_KEY}&image_type=photo&category=category&page=1&per_page=5&q=${query}`
    });

    if (status === 200)
    {
        // useful data mapping
        return data.hits.map(({ largeImageURL }) => largeImageURL);
    }

    throw new Error(statusText);
}
