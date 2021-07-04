import axios from 'axios';

/**
 * Returns place description by text query.
 *
 * @see http://www.geonames.org/export/geonames-search.html
 *
 * @export
 * @param {string} query
 * @param {number} [maxRows=1]
 *
 * @returns {any} place info
 */
export async function getPlace(query, maxRows = 1)
{
    const { status, statusText, data } = await axios({
        method: 'get',
        url: `${process.env.GEONAMES_API_URL}?username=${process.env.GEONAMES_API_USERNAME}&maxRows=${maxRows}&q=${query}`
    });

    if (status === 200)
        return data.geonames[0];

    throw new Error(statusText);
}
