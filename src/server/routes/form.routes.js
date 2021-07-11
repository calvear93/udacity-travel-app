import { getPlace } from '../services/geonames';
import { getPlacePhotos } from '../services/pixabay';
import { getPlaceForecast } from '../services/weatherbit';
import { removeDiacritics } from '../utils/string.util';
import { getDateIntervalFromToday } from '../utils/time.util';

export async function exec({ body: { query, date } }, response)
{
    try
    {
        // normalizes/cleans query string
        query = removeDiacritics(query);

        // calls place info and photos apis
        const [
            info,
            photos
        ] = await Promise.all([
            getPlace(query),
            getPlacePhotos(query)
        ]);

        // calcs days until planned travel date
        const { days } = getDateIntervalFromToday(date);

        // calls forecast api for searched place
        const forecast = await getPlaceForecast([ info.lat, info.lng ], days);

        response
            .status(200)
            .send({
                city: info.toponymName,
                latitude: info.lat,
                longitude: info.lng,
                country: info.countryName,
                forecast,
                assets: {
                    weatherIcon: `https://www.weatherbit.io/static/img/icons/${forecast.countryISO}.png`,
                    countryFlag: `https://www.countryflags.io/${info.countryCode}/flat/64.png`,
                    placePhotos: photos
                }
            });
    }
    catch (error)
    {
        response
            .status(500)
            .send({
                message: 'An error has ocurred. Please retry.',
                error
            });
    }
}

// exports route
export default {
    path: '/api/travel/plan',
    method: 'post',
    exec
};
