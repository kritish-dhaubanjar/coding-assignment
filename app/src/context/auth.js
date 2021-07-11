import React from 'react';

const AuthContext = React.createContext({
  authUser: null,
  setAuthUser: () => {},
});

export default AuthContext;
