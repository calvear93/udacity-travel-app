import { intervalToDuration, parse, isBefore, getYear, getMonth, getDate } from 'date-fns';

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
    const today = new Date();
    const date = parse(dateString, process.env.DATE_FORMAT, today);

    const isPast = isBefore(new Date(getYear(date), getMonth(date) + 1, getDate(date)), new Date(getYear(today), getMonth(today) + 1, getDate(today)));

    if (isPast)
        return { days: -1 };

    console.log(today);
    console.log(date);
    console.log(intervalToDuration({
        start: today,
        end: date
    }));

    const { years, months, days } = intervalToDuration({
        start: today,
        end: date
    });

    return days + months * 30 + years * 12 * 30;
}
