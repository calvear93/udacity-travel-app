import { store } from './store';

async function handleSubmit(e)
{
    e.preventDefault();

    alert('yeh');

    console.log(Calendar);
    console.log(dayjs('06/04/2020'));
}

// function handleInputChange({ target: { value } })
// {
//     const urlInput = document.getElementById('url');
//     const submitter = document.getElementById('submitter');

//     url = value;
//     isValid = urlInput?.validity?.valid;

//     console.log('onChange ->', url);
//     console.log('isValid ->', isValid);

//     if (isValid && url.startsWith('http'))
//     {
//         urlInput.classList.remove('invalid');
//         urlInput.classList.add('success');
//         submitter.disabled = false;
//     }
//     else
//     {
//         urlInput.classList.add('invalid');
//         urlInput.classList.remove('success');
//         submitter.disabled = true;
//     }
// }

// on DOM loaded
window.onload = () =>
{
    // const urlInput = document.getElementById('url');

    // // zip code input listener
    // urlInput.addEventListener('keypress', handleInputChange);
    // urlInput.addEventListener('keyup', handleInputChange);

    window.handleSubmit = handleSubmit;
};
