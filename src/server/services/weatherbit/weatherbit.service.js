import axios from 'axios';
import chroma from 'chroma-js';

// color scale for UV index (0-11+)
const UV_SCALE = chroma
    .scale([ '#32CD32', '#FFD700', '#FFA500', '#FF0000' ])
    .colors(12);

/**
 * Returns place forecast for until next 16 days by geolocation.
 *
 * @see https://www.weatherbit.io/api/weather-forecast-16-day
 *
 * @export
 * @param {Array<number>} location - location coordinates
 * @param {number} location.lat - place latitude
 * @param {number} location.lon - place longitude
 * @param {number} days - forecast days for search
 *
 * @returns {any} place weather forecast
 */
export async function getPlaceForecast([ lat, lon ], days)
{
    if (days < 0 || days > 16)
    {
        return {
            code: 404,
            description: 'There is no weather information for the specified date'
        };
    }

    // switches between current and future weather API
    const url = days > 0 ? process.env.WEATHERBIT_API_URL : process.env.WEATHERBIT_TODAY_API_URL;

    const { status, data } = await axios({
        method: 'get',
        url: `${url}?key=${process.env.WEATHERBIT_API_KEY}&days=${days}&lat=${lat}&lon=${lon}`
    });

    if (status === 200)
    {
        // validates response data
        if (!data || !data.data || !data.data.length || data.data.length === 0)
        {
            return {
                code: 404,
                description: 'There is no weather information for the specified date'
            };
        }

        // get last weather forecast
        const weather = data.data[data.data.length - 1];

        // useful data mapping
        return {
            code: 200,
            description: weather.weather.description,
            timezone: data.timezone,
            city: data.city_name,
            countryISO: data.country_code,
            date: weather.valid_date,
            icon: weather.weather.icon,
            wind: {
                unit: 'm/s',
                speed: weather.wind_spd,
                direction: weather.wind_cdir_full
            },
            temperature: {
                unit: '°C',
                average: weather.temp,
                max: weather.max_temp,
                min: weather.min_temp
            },
            precipitation: {
                unit: 'mm',
                probability: weather.pop,
                accumulated: weather.precip
            },
            snow: {
                unit: 'mm',
                depth: weather.snow_depth,
                accumulated: weather.snow
            },
            visibility: {
                unit: 'km',
                value: weather.vis
            },
            uv: {
                color: UV_SCALE[~~weather.uv],
                value: weather.uv
            }
        };
    }

    return {
        code: 500,
        description: 'An error has ocurred retrieving weather info'
    };
}
