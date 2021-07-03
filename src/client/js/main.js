import { showResults } from './showResults';

let url;
let isValid = false;

async function handleSubmit(e)
{
    e.preventDefault();

    const submitter = document.getElementById('submitter');
    submitter.classList.add('loading');
    submitter.disabled = true;

    try
    {
        const data = new URLSearchParams(`url=${url}`);

        const request = await fetch('http://localhost:3000/api/nlp', {
            method: 'post',
            body: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const results = await request.json();

        // updates results UI
        showResults(results);

        return false;
    }
    catch
    {
        alert('An horror has ocurred!');
    }
    finally
    {
        submitter.classList.remove('loading');
        submitter.disabled = false;
    }
}

function handleInputChange({ target: { value } })
{
    const urlInput = document.getElementById('url');
    const submitter = document.getElementById('submitter');

    url = value;
    isValid = urlInput?.validity?.valid;

    console.log('onChange ->', url);
    console.log('isValid ->', isValid);

    if (isValid && url.startsWith('http'))
    {
        urlInput.classList.remove('invalid');
        urlInput.classList.add('success');
        submitter.disabled = false;
    }
    else
    {
        urlInput.classList.add('invalid');
        urlInput.classList.remove('success');
        submitter.disabled = true;
    }
}

// on DOM loaded
window.onload = () =>
{
    const urlInput = document.getElementById('url');

    // zip code input listener
    urlInput.addEventListener('keypress', handleInputChange);
    urlInput.addEventListener('keyup', handleInputChange);

    window.handleSubmit = handleSubmit;
};
