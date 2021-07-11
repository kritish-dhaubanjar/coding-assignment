import React, { useContext } from 'react';
import config from '../config';
import { withRouter } from 'react-router';
import AuthContext from '../context/auth';
import { useEffect, useState } from 'react';
import RedirectContext from '../context/redirect';
import useStyles from '../components/signin/styles';
import { GitHub, LockOutlined } from '@material-ui/icons/';
import {
  Link,
  Avatar,
  Button,
  Container,
  Typography,
  CircularProgress,
} from '@material-ui/core';

const Home = (props) => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const redirectContext = useContext(RedirectContext);

  const [loading, setLoading] = useState(false);
  const oauthURL =
    config.github.oauthURL + '&state=' + redirectContext.redirectURL;

  useEffect(() => {
    document.title = 'CABN | Sign In';

    if (authContext.isAuth) props.history.replace('/');
  }, []);

  return (
    <Container maxWidth="xs" className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>

      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Link href={oauthURL} className={classes.signin}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={setLoading}
        >
          {loading ? (
            <CircularProgress size="1.8em" color="default" />
          ) : (
            <>
              Sign In with{' '}
              <GitHub fontSize="small" className={classes.github} />
            </>
          )}
        </Button>
      </Link>
    </Container>
  );
};

export default withRouter(Home);
