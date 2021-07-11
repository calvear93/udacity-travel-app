import { renderPlaceInfo } from './info-builder';

describe('Show Searching Results in Page', () =>
{
    test('Renders the info from place searching results', async () =>
    {
        document.body.innerHTML = `
            <div id="search-info">
                <div>
                    <img id="country-flag" />
                    <div id="place-name" class="name"></div>
                </div>

                <div>
                    <div>
                        <img id="weather-icon" />
                        <div id="weather-desc"></div>
                    </div>

                    <div>
                        <ul id="weather-detail"></ul>
                    </div>
                </div>
            </div>
        `;

        const city = 'Any City',
              country = 'Any Country',
              flagURL = 'http://flag_url.com/',
              weatherURL = 'http://weather_url.com/';

        const forecast = {
            code: 200,
            description: 'Overcast clouds',
            icon: 'c04d',
            wind: {
                unit: 'm/s',
                speed: 1.5,
                direction: 'east'
            },
            temperature: {
                unit: '°C',
                average: 14
            },
            precipitation: {
                unit: 'mm',
                accumulated: 0
            },
            snow: {
                unit: 'mm',
                accumulated: 0
            },
            visibility: {
                unit: 'km',
                value: 5
            },
            uv: {
                color: '#a2d217',
                value: 2.64237
            }
        };

        renderPlaceInfo(city, country, flagURL, weatherURL, forecast);

        const countryFlag = document.getElementById('country-flag');
        const placeName = document.getElementById('place-name');
        const weatherIcon = document.getElementById('weather-icon');

        expect(countryFlag.src).toEqual(flagURL);
        expect(weatherIcon.src).toEqual(weatherURL);
        expect(placeName.textContent).toEqual(`${city}, ${country}`);
    });
});
