import { store } from './store';

export const handleInputChange = (inputId) =>
{
    const handleValue = ({ target: { value } }) =>
    {
        store.set(inputId, value);
    };

    const input = document.getElementById(inputId);

    input.addEventListener('keypress', handleValue);
    input.addEventListener('keyup', handleValue);
};

export const handleCalendarChange = (calendar) =>
{
    calendar.dateChanged = (currentDate) =>
    {
        // avoids to select a past date
        if (dayjs(currentDate).isBefore(dayjs(Date.now()), 'day'))
            calendar.setDate(Date.now());

        store.set(calendar.id, currentDate);
    };
};
