import axios from 'axios';

export async function analyzeArticle(articleUrl)
{
    if (process.env.DEBUG === 'true')
        return mock();

    const { status, statusText, data } = await axios({
        method: 'post',
        url: `${process.env.API_URL}?key=${process.env.API_KEY}&lang=${process.env.API_LANG}&url=${articleUrl}`,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    if (status === 200)
        return data;

    throw new Error(statusText);
}

export function mock()
{
    return new Promise((res) =>
    {
        setTimeout(() =>
        {
            res(require('./mockResponse.json'));
        }, 1000);
    });
}
