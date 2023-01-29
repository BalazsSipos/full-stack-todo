import { Avatar, Box, Card, Stack, Typography } from '@mui/material'
import { User } from '../models/User'

export const UserItem = ({ user }: { user: User }) => {
  return (
    <Card>
      <Box sx={{ p: 2, display: 'flex' }}>
        <Avatar variant="rounded" src="avatar1.jpg" />
        <Stack sx={{ pl: 2 }} spacing={0.5}>
          <Typography fontWeight={700} color="primary.main">
            {user.email} ({user.name})
          </Typography>
          <Typography fontWeight={700} color="secondary.main">
            Created {user.numberOfTodos} todo{user.numberOfTodos > 1 ? 's' : ''}
          </Typography>
        </Stack>
      </Box>
    </Card>
  )
}
