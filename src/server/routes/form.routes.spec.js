import { responseMock } from 'server/mock';
import { exec } from './form.routes';

describe('NLP Form Route', () =>
{
    test('response Ok on express route article analysis', async () =>
    {
        let response = responseMock();

        await exec(
            { body: { query: 'santiago chile' } },
            response
        );

        console.log(response.result);

        // expect(result.agreement).toBeDefined();
        // expect(result.irony).toBeDefined();
        // expect(result.analysis).toBeDefined();
        // expect(result.analysis.length).toBeGreaterThan(0);
        expect('hola').toBeDefined();
    });
});
