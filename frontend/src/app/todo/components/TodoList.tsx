import { AuthContext } from '../../common/components/AuthContext';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { GlassSurface } from '../../common/components/GlassSurface';
import { Todo } from '../models/Todo';
import { TodoItem } from './TodoItem';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTodos } from '../../common/hooks/queries/use-todo';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const EmptyListCard = () => (
  <GlassSurface component={Card} opacity={0.1}>
    <CardContent sx={{ textAlign: 'center' }}>
      <SentimentDissatisfiedIcon />
      <Typography>It&apos;s so empty here</Typography>
    </CardContent>
  </GlassSurface>
);

export const TodoList = () => {
  const context = useContext(AuthContext);
  const firebaseUser = context?.firebaseUser;

  const { email } = useParams();
  const [token, setToken] = useState('invalid');

  useEffect(() => {
    if (firebaseUser) {
      firebaseUser.getIdToken().then((idToken) => {
        setToken(idToken);
      });
    }
  }, [firebaseUser]);

  const todosQuery = useTodos(email ?? '', token);

  const todoList = todosQuery.data ?? [];

  return (
    <>
      {todoList.length ? (
        <Grid
          container
          spacing={{ xs: 2, md: 4, lg: 8 }}
          // sx={{ p: { xs: 2, md: 4 } }}
          columns={{ xs: 1, md: 6, lg: 6, xl: 9 }}
        >
          {todoList.map((todo: Todo) => (
            <Grid item xs={1} md={3} key={todo.id} justifyContent="center">
              <TodoItem todo={todo} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <EmptyListCard />
      )}
    </>
  );
};
