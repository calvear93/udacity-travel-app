import { getPlace } from './geonames.service';
import { mockGeonames } from 'server/mock/mocker';

describe('Geonames API service', () =>
{
    beforeAll(() =>
    {
        mockGeonames();
    });

    test('environment variables are defined', async () =>
    {
        expect(process.env.GEONAMES_API_URL).toBeDefined();
        expect(process.env.GEONAMES_API_USERNAME).toBeDefined();
    });

    test('response Ok on science article analysis', async () =>
    {
        const response = await getPlace('santiago de chile');

        expect(response.toponymName).toBe('Santiago');
        expect(response.countryCode).toBe('CL');
        expect(response.adminName1).toBe('Santiago Metropolitan');
    });
});
