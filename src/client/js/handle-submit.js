import { store } from './store';
import { toast } from './toast';
import { renderPhotoGallery, renderPlaceInfo } from './info-builder';
import { handleInputState, handleElementVisibility } from './handle-input-change';

export const handleSubmit = async (e) =>
{
    setLoadingState('loading');
    e.preventDefault();

    try
    {
        const query = store.get('place');
        const date = dayjs(store.get(Calendar.id)).format('YYYY/MM/DD');

        const { city, country, forecast, assets } = await getPlaceInfoFor(query, date);

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

    return await response.json();
}

function setLoadingState(state, hasWeather, hasPhotos)
{
    switch (state)
    {
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

        case 'loading':
            handleInputState('place', 'disabled');
            handleInputState('submit', 'loading');
            handleElementVisibility('search-loader', true);
            handleElementVisibility('search-info', false);
            handleElementVisibility('no-search-info', false);
            handleElementVisibility('photographs', false);
            handleElementVisibility('no-photographs', false);

            break;

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
