import { CardContent, Grid, Stack, Typography } from '@mui/material';
import { Loading } from '../../pages/Loading';
import { ReactNode } from 'react';
import { UserItem } from './UserItem';
import { useUsers } from '../../common/hooks/queries/use-user';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const EmptyListCard = () => (
  <CardContent sx={{ textAlign: 'center' }}>
    <SentimentDissatisfiedIcon />
    <Typography>It&apos;s so empty here</Typography>
  </CardContent>
);

export const UserList = () => {
  const { data, isLoading } = useUsers();

  let content: ReactNode;

  if (isLoading) {
    content = <Loading />;
  }

  if (data && data.length > 0) {
    content = (
      <Grid item xs={1}>
        <Stack sx={{ m: 3 }} spacing={2}>
          <Typography variant="h6">List of users</Typography>
          {data.map((userItem) => (
            <UserItem user={userItem} key={userItem.email} />
          ))}
          {data.length ? null : <EmptyListCard />}
        </Stack>
      </Grid>
    );
  }
  if (data && data.length == 0) {
    content = <EmptyListCard />;
  }

  return content;
};
