import axios from '../../utils/axios';
import { withRouter } from 'react-router';
import routes from '../../constants/routes';
import AuthContext from '../../context/auth';
import { useParams } from 'react-router-dom';
import ToastContext from '../../context/toast';
import RedirectContext from '../../context/redirect';
import { useState, useContext, useEffect } from 'react';
import {
  makeStyles,
  TextField,
  Container,
  Button,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  controls: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const EditArticle = (props) => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const toastContext = useContext(ToastContext);
  const redirectContext = useContext(RedirectContext);

  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState({ title: '', body: '' });
  const { id } = useParams();

  useEffect(() => {
    if (authContext.authUser) return;

    redirectContext.setRedirectURL(props.location.pathname);
    props.history.push(routes.SIGNIN);
  }, []);

  useEffect(() => {
    if (!authContext.authUser) return;

    if (id) {
      (async () => {
        const { data } = await axios.get(`/articles/${id}`);
        if (data.author.id !== authContext.authUser.id)
          props.history.push(routes.HOME);
        else setArticle({ title: data.title, body: data.body });
      })();
    }
  }, []);

  const handleInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setArticle((article) => ({
      ...article,
      [key]: value,
    }));
  };

  const save = async () => {
    setLoading(true);
    const method = id ? 'PUT' : 'POST';
    const url = id ? `/articles/${id}` : '/articles';

    try {
      await axios(url, {
        method,
        data: article,
      });
      toastContext.showToast({
        message: 'Article Saved.',
        severity: 'success',
      });
      props.history.push('/');
    } catch (err) {
      toastContext.showToast({
        message: 'Something went Wrong.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const disabled =
    article.title.trim().length === 0 || article.body.trim().length === 0;

  return (
    <>
      <Container className={classes.root}>
        <Typography variant="h5" gutterBottom>
          {id ? 'Edit Article' : 'New Article'}
        </Typography>
        <form noValidate autoComplete="off">
          <TextField
            id="title"
            name="title"
            label="Article Title"
            className={classes.controls}
            variant="filled"
            onChange={handleInput}
            value={article.title}
          />

          <TextField
            id="body"
            name="body"
            label="Article"
            multiline
            className={classes.controls}
            variant="filled"
            rows="10"
            onChange={handleInput}
            value={article.body}
          />

          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            disabled={disabled || loading}
            onClick={save}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              props.history.push('/');
            }}
            className={classes.button}
          >
            Cancel
          </Button>
        </form>
      </Container>
    </>
  );
};

export default withRouter(EditArticle);
