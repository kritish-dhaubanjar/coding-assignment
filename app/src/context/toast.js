import React from 'react';

const ToastContext = React.createContext({
  toast: {
    message: '',
    severity: 'success',
  },
  open: false,
  showToast: () => {},
});

export default ToastContext;
