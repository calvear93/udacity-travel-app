import { store } from './store';
import { toast } from './toast';
import { handleInputState } from './handle-input-change';

export const handleSubmit = async (e) =>
{
    e.preventDefault();

    try
    {
        handleInputState('place', 'disabled');
        handleInputState('submit', 'loading');

        const query = store.get('place');
        const date = dayjs(store.get(Calendar.id)).format('YYYY/MM/DD');

        const placeInfo = await getPlaceInfoFor(query, date);

        toast.success('Place found successfully!', 3000);
    }
    catch (err)
    {
        toast.error('An error has ocurred!', 5000);
        console.error(err);
    }
    finally
    {
        handleInputState('place', 'enabled');
        handleInputState('submit', 'enabled');
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
