import axios from 'axios';

/**
 * Returns place description by location text query.
 *
 * @see http://www.geonames.org/export/geonames-search.html
 *
 * @export
 * @param {string} query - searching text
 *
 * @returns {any} place info
 */
export async function getPlace(query)
{
    const { status, statusText, data } = await axios({
        method: 'get',
        url: `${process.env.GEONAMES_API_URL}?username=${process.env.GEONAMES_API_USERNAME}&maxRows=1&q=${query}`
    });

    if (status === 200)
        return data.geonames[0];

    throw new Error(statusText);
}
