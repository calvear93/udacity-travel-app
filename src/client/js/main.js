import { handleSubmit } from './handle-submit';
import { handleInputChange, handleCalendarChange, handleInputState } from './handle-input-change';

// on DOM loaded
window.onload = () =>
{
    handleInputChange('place', (val) =>
    {
        handleInputState('submit', val ? 'enabled' : 'disabled');
    });
    handleCalendarChange(Calendar);

    window.handleSubmit = handleSubmit;
};
