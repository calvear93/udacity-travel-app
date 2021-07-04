import nock from 'nock';

export function mockAll()
{
    mockGeonames();
    mockWeatherbit();
    mockPixabay();
}

export function mockGeonames()
{
    nock(process.env.GEONAMES_API_URL)
        .get(/.*/)
        .times(Infinity)
        .delay(600)
        .reply(200, require('./data/geonames.mock.json'));
}

export function mockWeatherbit()
{
    nock(process.env.WEATHERBIT_API_URL)
        .get(/.*/)
        .times(Infinity)
        .delay(600)
        .reply(200, require('./data/weatherbit.mock.json'));
}

export function mockPixabay()
{
    nock(process.env.PIXABAY_API_URL)
        .get(/.*/)
        .times(Infinity)
        .delay(600)
        .reply(200, require('./data/pixabay.mock.json'));
}

export function responseMock()
{
    const handler = {
        status: () => handler,
        send: (r) =>
        {
            handler.result = r;

            return handler;
        }
    };

    return handler;
}
