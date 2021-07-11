import React from 'react';

const RedirectContext = React.createContext({
  redirectURL: null,
  setRedirectURL: () => {},
});

export default RedirectContext;
