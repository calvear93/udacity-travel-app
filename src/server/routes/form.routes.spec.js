import { exec } from './form.routes';

describe('NLP Form Route', () =>
{
    test('response Ok on express route article analysis', async () =>
    {
        let result;

        await exec(
            { body: { url: 'https://www.sciencedaily.com/releases/2021/06/210607161000.htm' } },
            { send: (r) => { result = r; } }
        );

        expect(result.agreement).toBeDefined();
        expect(result.irony).toBeDefined();
        expect(result.analysis).toBeDefined();
        expect(result.analysis.length).toBeGreaterThan(0);
    });
});
