import { getPlace } from 'server/services/geonames';
import { getPlaceForecast } from 'server/services/weatherbit';
import { getPlacePhotos } from 'server/services/pixabay';

export async function exec({ body: { query, date } }, response)
{
    try
    {
        const [
            info,
            photos
        ] = await Promise.all([
            getPlace(query),
            getPlacePhotos(query)

        ]);

        const forecast = await getPlaceForecast([ info.lat, info.lng ], 16);

        response
            .status(200)
            .send({
                info,
                forecast,
                photos
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
