/**
 * Normalizes the string removing diacritics.
 *
 * @param {string} str string.
 *
 * @returns {string} string without diacritics.
 */
export function removeDiacritics(str)
{
    if (!str)
        return '';

    return str.toString().normalize('NFD').replace(/[\p{Diacritic}|\u0142|\u0027]/gu, '');
}
