import { handleSubmit } from './handle-submit';
import { handleInputChange, handleCalendarChange } from './handle-input-change';

// on DOM loaded
window.onload = () =>
{
    handleInputChange('place');
    handleCalendarChange(Calendar);

    console.log(dayjs('06/04/2020'));

    window.handleSubmit = handleSubmit;
};
