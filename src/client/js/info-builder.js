/**
 * Renders fetched info un UI.
 *
 * @export
 * @param {string} city
 * @param {string} country
 * @param {string} flagUrl
 * @param {string} weatherUrl
 * @param {any} forecast
 */
export function renderPlaceInfo(city, country, flagUrl, weatherUrl, forecast)
{
    if (!city)
        return;

    // gets DOM UI elements
    const countryFlag = document.getElementById('country-flag');
    const placeName = document.getElementById('place-name');
    const weatherIcon = document.getElementById('weather-icon');
    const weatherDesc = document.getElementById('weather-desc');
    const weatherDetail = document.getElementById('weather-detail');

    countryFlag.src = flagUrl;
    countryFlag.alt = country;

    placeName.textContent = `${city}, ${country}`;

    weatherIcon.src = weatherUrl;
    weatherIcon.alt = forecast?.description ?? 'No Weather Data';

    weatherDesc.textContent = forecast?.description;

    weatherDetail.textContent = '';

    // adds forecast info only if exists
    if (forecast?.code === 200)
    {
        const { wind, temperature, precipitation, snow, visibility, uv } = forecast;

        weatherDetail.appendChild(createItem('Temperature', `${temperature.average} ${temperature.unit} (max: ${temperature.max}, min: ${temperature.min})`));
        weatherDetail.appendChild(createItem('Wind', `${wind.speed} ${wind.unit}, ${wind.direction}`));
        weatherDetail.appendChild(createItem('Precipitation', `${precipitation.accumulated} ${precipitation.unit}`));
        weatherDetail.appendChild(createItem('Snow', `${snow.accumulated} ${snow.unit}`));
        weatherDetail.appendChild(createItem('Visibility', `${visibility.value} ${visibility.unit}`));
        weatherDetail.appendChild(createItem('UV', uv.value, uv.color));
    }
}

/**
 * Renders images from place
 *
 * @export
 * @param {Array<string>} photos photos urls
 */
export function renderPhotoGallery(photos)
{
    if (!photos)
        return;

    const rootNode = document.getElementById('photo-gallery');

    let incrementalId = 0;
    let fragment = document.createDocumentFragment();

    for (let url of photos)
        fragment.appendChild(createPhoto(++incrementalId, url));

    // appends empty li to end for aspect ratio fix
    fragment.appendChild(document.createElement('li'));

    rootNode.textContent = ''; // clears grid content
    rootNode.appendChild(fragment);
}

/**
 * Creates a new photo item for UI photo gallery.
 *
 * @param {string | number} id
 * @param {string} url
 *
 * @returns {HTMLElement}
 */
function createPhoto(id, url)
{
    let item = document.createElement('li');

    item.className = 'item card depth-2';
    item.id = id;

    let img = document.createElement('img');
    img.className = 'card-image';
    img.src = url;

    item.appendChild(img);

    return item;
}

/**
 * Creates a new item for place info.
 *
 * @param {string} title
 * @param {string} info
 * @param {string} color any CSS color if has
 *
 * @returns {HTMLElement}
 */
function createItem(title, info, color)
{
    let item = document.createElement('li');

    item.id = title;
    item.innerHTML = `<b>${title}:&nbsp</b>${info}`;

    if (color)
        item.style = `color: ${color};`;

    return item;
}
