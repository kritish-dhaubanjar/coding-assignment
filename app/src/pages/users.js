import axios from '../utils/axios';
import { useEffect, useState } from 'react';
import ArticleCard from '../components/home/ArticleCard';
import ConfirmationDialog from '../components/common/ConfirmationDialog';
import {
  List,
  Grid,
  Avatar,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

export default function SimpleList() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [article, setArticle] = useState({});
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    document.title = 'CABN | Articles';
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    let { data } = await axios.get('/users');
    data = data.sort((a, b) => a.createdAt < b.createdAt);
    setUsers(data);
  };

  const fetchArticles = async (authorId) => {
    let { data } = await axios.get(`/users/${authorId}/articles`);
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
    <Grid container>
      {article && (
        <ConfirmationDialog
          open={open}
          handleConfirmation={handleConfirmation}
          message={`Delete "${article.title}" ?`}
        />
      )}

      <Grid item xs={12} md={3}>
        <List component="nav" aria-label="main mailbox folders">
          {users.length > 0 &&
            users.map((user) => (
              <ListItem
                button
                key={user.id}
                onClick={() => fetchArticles(user.id)}
              >
                <ListItemIcon>
                  <Avatar src={user.avatar_url} />
                </ListItemIcon>
                <ListItemText primary={user.name} />
              </ListItem>
            ))}
        </List>
        <Divider />
      </Grid>
      <Grid item xs={12} md={9}>
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
      </Grid>
    </Grid>
  );
}
