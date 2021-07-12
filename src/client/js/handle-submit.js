import { store } from './store';
import { toast } from './toast';
import { renderPhotoGallery, renderPlaceInfo } from './info-builder';
import { handleInputState, handleElementVisibility } from './handle-input-change';

/**
 * Prepares data, sets UI state and fetches
 * place info and forecast from the API.
 *
 * @param {Event} e submit event
 */
export const handleSubmit = async (e) =>
{
    setLoadingState('loading');
    e.preventDefault();

    try
    {
        // gets input string from store
        const query = store.get('place');
        // formats selected date
        const date = dayjs(store.get(Calendar.id)).format('YYYY/MM/DD');

        // fetches place and forecast info
        const { city, country, forecast, assets } = await getPlaceInfoFor(query, date);

        // executes UI rendering updating
        renderPlaceInfo(city, country, assets.countryFlag, assets.weatherIcon, forecast);
        renderPhotoGallery(assets?.placePhotos);

        setLoadingState('ready', forecast?.code === 200, assets?.placePhotos?.length > 0);
    }
    catch (err)
    {
        toast.error('Location could not be found!', 4000);
        setLoadingState('error');
        console.error(err);
    }
};

/**
 * Fetches place and forecast info
 *
 * @param {string} query
 * @param {Date} date
 *
 * @returns {any} place info and forecast
 */
async function getPlaceInfoFor(query, date)
{
    const response = await fetch(
        'http://localhost:3000/api/travel/plan',
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query, date })
        }
    );

    // retrieves the body
    return await response.json();
}

/**
 * Updates the UI for rendering
 * the place info and forecast,
 *
 * @param {string} state maybe 'ready', 'loading' or 'error
 * @param {boolean} hasWeather if info contains weather
 * @param {boolean} hasPhotos if place has photos for show
 */
function setLoadingState(state, hasWeather, hasPhotos)
{
    switch (state)
    {
        // when place info and forecast is ready
        case 'ready':
            handleInputState('place', 'enabled');
            handleInputState('submit', 'enabled');
            handleElementVisibility('search-loader', false);

            if (hasWeather)
                handleElementVisibility('search-info', true);
            else
                handleElementVisibility('no-search-info', true);

            if (hasPhotos)
                handleElementVisibility('photographs', true);
            else
                handleElementVisibility('no-photographs', true);

            break;

        // when place info is loading
        case 'loading':
            handleInputState('place', 'disabled');
            handleInputState('submit', 'loading');
            handleElementVisibility('search-loader', true);
            handleElementVisibility('search-info', false);
            handleElementVisibility('no-search-info', false);
            handleElementVisibility('photographs', false);
            handleElementVisibility('no-photographs', false);

            break;

        // when fetching has errors
        case 'error':
            handleInputState('place', 'enabled');
            handleInputState('submit', 'enabled');
            handleElementVisibility('search-loader', false);
            handleElementVisibility('search-info', false);
            handleElementVisibility('photographs', false);

            break;

        default:
            break;
    }
}
