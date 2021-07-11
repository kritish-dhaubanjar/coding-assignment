import config from '../../config';
import { useContext } from 'react';
import routes from '../../constants/routes';
import AuthContext from '../../context/auth';
import { clearCookie } from '../../utils/cookie';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink, withRouter } from 'react-router-dom';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { Home, Lock, GitHub, SupervisedUserCircle } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    marginRight: theme.spacing(2),
    color: '#fff',
  },
}));

const NavigationBar = (props) => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);

  const signout = () => {
    clearCookie();
    authContext.setAuthUser(null);
    props.history.replace(routes.SIGNIN);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            CABN
          </Typography>
          <NavLink to={routes.HOME}>
            <Button className={classes.link} startIcon={<Home />}>
              Home
            </Button>
          </NavLink>
          <NavLink to={routes.USERS}>
            <Button
              className={classes.link}
              startIcon={<SupervisedUserCircle />}
            >
              Users
            </Button>
          </NavLink>
          {authContext.authUser ? (
            <>
              <Button startIcon={<Lock />} onClick={signout} color="inherit">
                Signout
              </Button>
            </>
          ) : (
            <a href={config.github.oauthURL}>
              <Button
                startIcon={<GitHub />}
                color="inherit"
                className={classes.link}
              >
                Signin
              </Button>
            </a>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(NavigationBar);
