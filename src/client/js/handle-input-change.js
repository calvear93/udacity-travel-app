import { store } from './store';
import { toast } from './toast';

export const handleInputState = (inputId, state = 'enabled') =>
{
    const input = document.getElementById(inputId);

    switch (state)
    {
        case 'enabled':
            input.disabled = false;
            input.classList.remove('loading');

            if (store.get(`bkp:${inputId}`))
                input.value = store.get(`bkp:${inputId}`);
            break;

        case 'disabled':
            input.disabled = true;
            input.classList.remove('loading');
            break;

        case 'loading':
            input.disabled = false;
            input.classList.add('loading');

            store.set(`bkp:${inputId}`, input.value);
            input.value = 'Loading...';
            break;

        default:
            break;
    }
};

export const handleElementVisibility = (elementId, isVisible) =>
{
    const ele = document.getElementById(elementId);

    if (isVisible)
        ele.classList.remove('hidden');
    else
        ele.classList.add('hidden');
};

export const handleInputChange = (inputId, callback) =>
{
    const handleValue = ({ target: { value } }) =>
    {
        store.set(inputId, value);
        callback && callback(value);
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
        {
            toast.warning('Select pasted dates are not allowed');
            setTimeout(() => calendar.reset(), 1); // avoid DOM conflicts
            // calendar.setDate(Date.now());
        }

        store.set(calendar.id, currentDate);
    };
};
