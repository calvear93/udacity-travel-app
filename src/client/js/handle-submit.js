import { store } from './store';

export const handleSubmit = async (e) =>
{
    e.preventDefault();

    const placeInfo = await getPlaceInfoFor(
        store.get('place'),
        dayjs(store.get(Calendar.id)).format('YYYY/MM/DD')
    );

    console.log(placeInfo);

    console.log(store.getAll());
};

async function getPlaceInfoFor(query, date)
{
    console.log(query);
    console.log(date);
    try
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
    catch (err)
    {
        return {
            status: -1,
            message: err.message
        };
    }
}
