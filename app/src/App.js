import Router from './Router';
import axios from './utils/axios';
import routes from './constants/routes';
import AuthContext from './context/auth';
import { getCookie } from './utils/cookie';
import ToastContext from './context/toast';
import { useEffect, useState } from 'react';
import RedirectContext from './context/redirect';
import AlertSnakbar from './components/common/AlertSnakbar';
import NavigationBar from './components/common/NavigationBar';

const App = () => {
  const accessToken = getCookie('accessToken');

  const [init, setInit] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [redirectURL, setRedirectURL] = useState(routes.HOME);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState({});

  const showToast = ({ message = '', severity = 'success' }) => {
    setToast({ message, severity });
    setOpen(true);
  };

  useEffect(() => {
    if (accessToken) {
      axios.get('/auth/user').then(({ data }) => {
        setAuthUser(data);
        setInit(true);
      });
    } else {
      setInit(true);
    }
  }, []);

  return (
    <RedirectContext.Provider value={{ redirectURL, setRedirectURL }}>
      <AuthContext.Provider value={{ authUser, setAuthUser }}>
        <ToastContext.Provider value={{ toast, showToast, open, setOpen }}>
          <AlertSnakbar />

          {init && (
            <>
              <NavigationBar />
              <Router />
            </>
          )}
        </ToastContext.Provider>
      </AuthContext.Provider>
    </RedirectContext.Provider>
  );
};

export default App;
