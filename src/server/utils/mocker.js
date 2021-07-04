export function mock(data)
{
    return new Promise((res) =>
    {
        setTimeout(() =>
        {
            if (data instanceof Error)
                throw Error;

            res(data);
        }, 1000);
    });
}
