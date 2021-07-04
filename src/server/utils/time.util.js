import { intervalToDuration, parse } from 'date-fns';

/**
 * Parses a future date and returns interval from today.
 *
 * @export
 * @param {string} dateString - a future date in string
 *
 * @returns {Duration}
 */
export function getDateIntervalFromToday(dateString)
{
    return intervalToDuration({
        start: new Date(),
        end: parse(dateString, process.env.DATE_FORMAT, new Date())
    });
}
