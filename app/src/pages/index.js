import axios from '../utils/axios';
import { Add } from '@material-ui/icons';
import routes from '../constants/routes';
import AuthContext from '../context/auth';
import { NavLink } from 'react-router-dom';
import { makeStyles, Fab } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import ArticleCard from '../components/home/ArticleCard';
import ConfirmationDialog from '../components/common/ConfirmationDialog';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const Index = () => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState(null);

  useEffect(() => {
    document.title = 'CABN | Articles';
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    let { data } = await axios.get('/articles');
    data = data.sort((a, b) => a.createdAt < b.createdAt);
    setArticles(data);
  };

  const deleteArticle = async (article) => {
    const { data } = await axios.delete(`/articles/${article.id}`);
    return data;
  };

  const handleConfirmation = async (result) => {
    if (result) {
      const data = await deleteArticle(article);
      const elements = articles.filter((article) => article.id !== data.id);
      setArticles(elements);
    }
    setOpen(false);
  };

  return (
    <>
      {article && (
        <ConfirmationDialog
          open={open}
          handleConfirmation={handleConfirmation}
          message={`Delete "${article.title}" ?`}
        />
      )}

      {articles.map((article) => (
        <ArticleCard
          article={article}
          key={article.SK}
          handleClickOpen={(article) => {
            setArticle(article);
            setOpen(true);
          }}
        />
      ))}

      <NavLink to={routes.CREATE_ARTICLE}>
        <Fab color="primary" className={styles.fab}>
          <Add />
        </Fab>
      </NavLink>
    </>
  );
};

export default Index;
