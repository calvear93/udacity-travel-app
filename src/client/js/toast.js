// showa a info toast
const show = (message, duration = 3000, classes = []) =>
{
    Toastify({
        text: message,
        duration,
        close: false,
        gravity: 'top',
        position: 'center',
        className: [ 'toast-container unselectable', ...classes ].join(' ')
    }).showToast();
};

const success = (message, duration = 3000) =>
{
    show(message, duration, [ 'success' ]);
};

const warning = (message, duration = 3000) =>
{
    show(message, duration, [ 'warning' ]);
};

const error = (message, duration = 3000) =>
{
    show(message, duration, [ 'error' ]);
};

export const toast = {
    show,
    success,
    warning,
    error
};
