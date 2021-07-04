import axios from 'axios';

/**
 * Returns place forecast for until next 16 days by geolocation.
 *
 * @see https://www.weatherbit.io/api/weather-forecast-16-day
 *
 * @export
 * @param {Array<number>} location
 * @param {number} location.lat
 * @param {number} location.lon
 * @param {number} days
 *
 * @returns {any} place weather forecast
 */
export async function getPlace([ lat, lon ], days)
{
    const { status, statusText, data: { data } = {} } = await axios({
        method: 'get',
        url: `${process.env.WEATHERBIT_API_URL}?key=${process.env.WEATHERBIT_API_KEY}&days=${days}&lat=${lat}&lon=${lon}`
    });

    if (status === 200)
    {
        return {
            timezone: data.timezone,
            date: data.valid_date,
            wind: {
                unit: 'm/s',
                speed: data.wind_spd,
                direction: data.wind_cdir_full
            },
            temperature: {
                unit: '°C',
                average: data.temp,
                max: data.max_temp,
                min: data.min_temp
            },
            precipitation: {
                unit: 'mm',
                probability: data.pop,
                accumulated: data.precip
            },
            snow: {
                unit: 'mm',
                depth: data.snow_depth,
                accumulated: data.snow
            },
            visibility: {
                unit: 'km',
                value: data.vis
            },
            uv: {
                value: data.uv
            }
        };
    }

    throw new Error(statusText);
}
