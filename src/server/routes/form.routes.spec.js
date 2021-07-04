import { addDays, format } from 'date-fns';
import { responseMock } from 'server/mock';
import { exec } from './form.routes';

describe('Travel planning Form Route', () =>
{
    test('Gets Santiago (Chile) city info and forecast in 7 days', async () =>
    {
        let response = responseMock();

        await exec(
            { body: { query: 'santiago chile', date: format(addDays(new Date(), 7), process.env.DATE_FORMAT, new Date()) } },
            response
        );

        console.log('Travel Api Response ->', JSON.stringify(response.result, null, 2));

        const { data: { city, country, forecast: { code } } } = response.result;

        expect(city).toBe('Santiago');
        expect(country).toBe('Chile');
        expect(code).toBe(200);
    });
});
