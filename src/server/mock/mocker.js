import nock from 'nock';

export function mockAll()
{
    mockGeonames();
    mockWeatherbit();
    mockPixabay();
}

export function mockGeonames()
{
    if (process.env.DEBUG !== 'true')
        return;

    nock(process.env.GEONAMES_API_URL)
        .get(/.*/)
        .times(Infinity)
        .delay(600)
        .reply(200, require('./data/geonames.mock.json'));
}

export function mockWeatherbit()
{
    if (process.env.DEBUG !== 'true')
        return;

    nock(process.env.WEATHERBIT_API_URL)
        .get(/.*/)
        .times(Infinity)
        .delay(600)
        .reply(200, require('./data/weatherbit.mock.json'));
}

export function mockPixabay()
{
    if (process.env.DEBUG !== 'true')
        return;

    nock(process.env.PIXABAY_API_URL)
        .get(/.*/)
        .times(Infinity)
        .delay(600)
        .reply(200, require('./data/pixabay.mock.json'));
}
