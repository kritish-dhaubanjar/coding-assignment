import { withRouter } from 'react-router-dom';
import AuthContext from '../../context/auth';
import { Delete, Edit } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useRef, useState, useContext } from 'react';
import {
  Card,
  Chip,
  Avatar,
  Button,
  IconButton,
  CardHeader,
  Typography,
  CardActions,
  CardContent,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    margin: '16px',
  },
  content: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  actions: {
    marginLeft: theme.spacing(1),
  },
  paragraph: {
    lineClamp: 3,
    overflow: 'hidden',
    display: '-webkit-box',
    ' -webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
  },
}));

const ArticleCard = (props) => {
  const { article, handleClickOpen } = props;
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const [isMore, setMore] = useState(false);

  const body = useRef();
  const [clampped, setClampped] = useState(true);

  const checkClampped = () => {
    if (!body.current) return;
    setClampped(body.current.clientHeight < body.current.scrollHeight);
  };

  const isAuthor = () => {
    return (
      authContext.authUser &&
      authContext.authUser.id === props.article.author.id
    );
  };

  const deleteArticle = () => {
    handleClickOpen(props.article);
  };
  const editArticle = () => {
    props.history.push(`/article/${article.id}/edit`);
  };

  useEffect(checkClampped, [body]);

  useState(() => {
    window.addEventListener('resize', checkClampped);

    return () => window.removeEventListener('resize', checkClampped);
  }, []);

  const toggle = () => {
    setMore(!isMore);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              src={article.author.avatar_url}
              className={classes.avatar}
            ></Avatar>
          }
          title={article.author.name}
          subheader={new Date(article.createdAt).toUTCString()}
        />
        <CardContent className={classes.content}>
          <Typography variant="h6" component="h2">
            {article.title}

            {article.createdAt !== article.updatedAt && (
              <Chip
                variant="outlined"
                label="Edited"
                color="primary"
                size="small"
                className={classes.actions}
              ></Chip>
            )}

            {isAuthor() && (
              <>
                <IconButton
                  color="secondary"
                  size="small"
                  className={classes.actions}
                  onClick={deleteArticle}
                >
                  <Delete fontSize="inherit" />
                </IconButton>
                <IconButton size="small" color="primary" onClick={editArticle}>
                  <Edit fontSize="inherit" />
                </IconButton>
              </>
            )}
          </Typography>

          <Typography
            variant="body2"
            component="p"
            className={!isMore ? classes.paragraph : ''}
            ref={body}
          >
            {article.body}
          </Typography>
        </CardContent>

        <CardActions>
          {clampped && (
            <Button size="small" color="primary" onClick={toggle}>
              {!isMore ? 'Show More' : 'Show Less'}
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
};

export default withRouter(ArticleCard);
