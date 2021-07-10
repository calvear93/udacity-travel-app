import { getPlaceForecast } from './weatherbit.service';
import { mockWeatherbit } from '../../mock/mocker';

describe('Weatherbit API service', () =>
{
    beforeAll(() =>
    {
        mockWeatherbit();
    });

    test('environment variables are defined', async () =>
    {
        expect(process.env.WEATHERBIT_API_URL).toBeDefined();
        expect(process.env.WEATHERBIT_API_KEY).toBeDefined();
    });

    test('JSON is calculated correctly from response after weather forecast search', async () =>
    {
        const response = await getPlaceForecast([ -33.45694, -70.64827 ], 16);

        const { description, city, icon, uv: { color } } = response;

        expect(city).toBe('Santiago');
        expect(description).toBeDefined();
        expect(icon).toBeDefined();
        expect(color).toBeDefined();
    });
});
