import Home from './pages';
import Users from './pages/users';
import SignIn from './pages/signin';
import routes from './constants/routes';
import EditArticle from './pages/article/edit';
import { Redirect, Route, Switch } from 'react-router-dom';

const Router = () => {
  return (
    <Switch>
      <Route path={routes.HOME} component={Home} exact />
      <Route path={routes.USERS} component={Users} exact />
      <Route path={routes.SIGNIN} component={SignIn} exact />
      <Route path={routes.CREATE_ARTICLE} component={EditArticle} exact />
      <Route path={routes.EDIT_ARTICLE} component={EditArticle} exact />

      <Redirect to={routes.HOME} />
    </Switch>
  );
};

export default Router;
