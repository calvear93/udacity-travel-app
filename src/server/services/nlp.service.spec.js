import { analyzeArticle } from './nlp.service';

describe('NLP article analysis', () =>
{
    test('environment variables are Ok', async () =>
    {
        expect(process.env.API_KEY).toBeDefined();
        expect(process.env.API_URL).toBeDefined();
        expect(process.env.API_LANG).toBeDefined();
    });

    test('response Ok on science article analysis', async () =>
    {
        const response = await analyzeArticle('https://www.sciencedaily.com/releases/2021/06/210607161000.htm');

        expect(response.status.msg).toBe('OK');
    });
});
