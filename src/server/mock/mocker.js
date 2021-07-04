import nock from 'nock';

const MOCK_DISABLED = process.env.MOCK !== 'true';

export function mockAll()
{
    mockGeonames();
    mockWeatherbit();
    mockPixabay();
}

export function mockGeonames()
{
    if (MOCK_DISABLED)
        return;

    nock(process.env.GEONAMES_API_URL)
        .get(/.*/)
        .times(Infinity)
        .delay(600)
        .reply(200, require('./data/geonames.mock.json'));
}

export function mockWeatherbit()
{
    if (MOCK_DISABLED)
        return;

    nock(process.env.WEATHERBIT_API_URL)
        .get(/.*/)
        .times(Infinity)
        .delay(600)
        .reply(200, require('./data/weatherbit.mock.json'));
}

export function mockPixabay()
{
    if (MOCK_DISABLED)
        return;

    nock(process.env.PIXABAY_API_URL)
        .get(/.*/)
        .times(Infinity)
        .delay(600)
        .reply(200, require('./data/pixabay.mock.json'));
}

export function responseMock()
{
    const handler = {
        result: {},
        status: (code) =>
        {
            handler.result.status = code;

            return handler;
        },
        send: (res) =>
        {
            handler.result.data = res;

            return handler;
        }
    };

    return handler;
}
