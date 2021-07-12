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

// success toast
const success = (message, duration = 3000) =>
{
    show(message, duration, [ 'success' ]);
};

// warning toast
const warning = (message, duration = 3000) =>
{
    show(message, duration, [ 'warning' ]);
};

// error toast
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
