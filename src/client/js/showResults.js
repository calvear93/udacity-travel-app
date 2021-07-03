export function showResults(results)
{
    const resultsContainer = document.getElementById('results');

    const ui = createResultsElement(results);

    // cleans DOM data container and appends fragment with new data
    resultsContainer.textContent = '';
    resultsContainer.appendChild(ui);
}

function createResultsElement({ agreement, irony, analysis })
{
    // create fragment container
    let fragment = document.createDocumentFragment();

    // will be thre divs
    let agreementEle = document.createElement('div');
    let ironyEle = document.createElement('div');
    let keywords = document.createElement('ul');

    // updates content
    agreementEle.id = 'agreement';
    agreementEle.innerHTML = `Agreement: ${agreement}`;
    ironyEle.id = 'irony';
    ironyEle.innerHTML = `Irony: ${irony}`;
    keywords.id = 'analysis';

    for (let phrase of analysis)
    {
        let phraseInfo = document.createElement('li');
        phraseInfo.innerHTML = `<b>${phrase.agreement}</b> -> ${phrase.text}`;

        let defs = document.createElement('ul');

        for (let def of phrase.keywords)
        {
            let defInfo = document.createElement('li');
            defInfo.textContent = def;

            defs.appendChild(defInfo);
        }

        phraseInfo.appendChild(defs);
        keywords.appendChild(phraseInfo);
    }

    fragment.appendChild(agreementEle);
    fragment.appendChild(ironyEle);
    fragment.appendChild(keywords);

    return fragment;
}
