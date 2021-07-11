import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(16),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  signin: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  github: {
    marginLeft: theme.spacing(1),
  },
}));

export default useStyles;
