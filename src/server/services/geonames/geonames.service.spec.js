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

    test('JSON is calculated correctly from response after place search', async () =>
    {
        const response = await getPlace('santiago de chile');

        const { toponymName, countryCode, adminName1 } = response;

        expect(toponymName).toBe('Santiago');
        expect(countryCode).toBe('CL');
        expect(adminName1).toBe('Santiago Metropolitan');
    });
});
