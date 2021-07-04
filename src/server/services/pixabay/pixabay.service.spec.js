import { getPlacePhotos } from './pixabay.service';
import { mockPixabay } from 'server/mock/mocker';

describe('Weatherbit API service', () =>
{
    beforeAll(() =>
    {
        mockPixabay();
    });

    test('environment variables are defined', async () =>
    {
        expect(process.env.PIXABAY_API_URL).toBeDefined();
        expect(process.env.PIXABAY_API_KEY).toBeDefined();
    });

    test('JSON is calculated correctly from response after place photos search', async () =>
    {
        const response = await getPlacePhotos('santiago chile');

        expect(response).toBeDefined();
        expect(response.length).toBeGreaterThan(0);
    });
});
