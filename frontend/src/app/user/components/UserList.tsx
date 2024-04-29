import { CardContent, Grid, Stack, Typography } from '@mui/material';
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
  const usersQuery = useUsers();
  const userList = usersQuery.data ?? [];

  return (
    <Grid item xs={1}>
      <Stack sx={{ m: 3 }} spacing={2}>
        <Typography variant="h6">List of users</Typography>
        {userList.map((userItem) => (
          <UserItem user={userItem} key={userItem.email} />
        ))}
        {userList.length ? null : <EmptyListCard />}
      </Stack>
    </Grid>
  );
};
