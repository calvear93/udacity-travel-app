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

    // sets global scope for submit handler
    window.handleSubmit = handleSubmit;

    // loader logic
    const mainContainer = document.getElementById('content');
    const loader = document.getElementById('loader');
    mainContainer.classList.remove('hidden');
    loader.classList.add('hidden');
    loader.remove();
};
