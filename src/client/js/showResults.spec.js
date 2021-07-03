import { showResults } from './showResults';

// jest.mock('./showResults');

describe('Show Results in Page', () =>
{
    test('Renders the info from results', async () =>
    {
        document.body.innerHTML = `
            <section id="test" class="results">
                <strong>Form Results:</strong>
                <div id="results"></div>
            </section>
        `;

        const results = {
            agreement: 'DISAGREEMENT',
            irony: 'IRONIC',
            analysis: [
                {
                    text: 'Your source for the latest research news',
                    agreement: 'AGREEMENT',
                    keywords: [
                        'research'
                    ]
                }
            ]
        };

        showResults(results);

        const agreementHTMLElement = document.getElementById('agreement');
        const ironyHTMLElement = document.getElementById('irony');

        expect(agreementHTMLElement.innerHTML).toEqual(`Agreement: ${results.agreement}}`);
        expect(ironyHTMLElement.innerHTML).toEqual(`Irony: ${results.irony}}`);
    });
});
