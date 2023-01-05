import { Box, Button, ButtonGroup, Chip, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { TaskAlt } from '@mui/icons-material'
import PeopleIcon from '@mui/icons-material/People'

const AppMenu = () => {
  return (
    <>
      <Stack direction="row" alignItems="center" sx={{ backgroundColor: 'important.main' }}>
        <Typography
          color="secondary"
          variant="h3"
          fontWeight={400}
          sx={{ display: 'inline-block', mx: 2 }}
          gutterBottom={false}
        >
          TODO
        </Typography>
        <DevelopmentEnvIndicator />
        <ButtonGroup variant="outlined" color="secondary" sx={{ p: 1 }}>
          <Button component={Link} to="/" startIcon={<PeopleIcon />}>
            Users
          </Button>

          <Button component={Link} to="/1/todos" startIcon={<TaskAlt />}>
            My Todos
          </Button>
        </ButtonGroup>
      </Stack>
    </>
  )
}

const DevelopmentEnvIndicator = () =>
  process.env.NODE_ENV !== 'production' ? (
    <Chip label={process.env.NODE_ENV} variant="filled" color="warning" sx={{ m: 1 }} />
  ) : null

export const AppFrame = (props: React.PropsWithChildren<unknown>) => {
  return (
    <Stack
      flexDirection="column"
      rowGap={2}
      sx={{
        width: '100hw',
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <>
        <AppMenu />
        <Box sx={{ minWidth: '100%', minHeight: '100%', px: 2, py: 1 }}>{props.children}</Box>
      </>
    </Stack>
  )
}
