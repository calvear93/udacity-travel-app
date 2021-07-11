import { store } from './store';
import { toast } from './toast';
import { handleInputState, handleElementVisibility } from './handle-input-change';

export const handleSubmit = async (e) =>
{
    setLoadingState(true);
    e.preventDefault();

    try
    {
        setLoadingState(true);

        const query = store.get('place');
        const date = dayjs(store.get(Calendar.id)).format('YYYY/MM/DD');

        const placeInfo = await getPlaceInfoFor(query, date);

        setLoadingState(false);

        toast.success(`Place found successfully for ${placeInfo.city}, ${placeInfo.country}!`, 4000);
    }
    catch (err)
    {
        toast.error('An error has ocurred!', 4000);
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

function setLoadingState(isLoading, hasWeather, hasPhotos)
{
    if (isLoading)
    {
        handleInputState('place', 'disabled');
        handleInputState('submit', 'loading');
        handleElementVisibility('search-loader', true);
        handleElementVisibility('search-info', false);
    }
    else
    {
        handleInputState('place', 'enabled');
        handleInputState('submit', 'enabled');
        handleElementVisibility('search-loader', false);
        handleElementVisibility('search-info', true);
    }
}
