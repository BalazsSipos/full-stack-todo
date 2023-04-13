import { AuthContext } from './AuthContext'
import { Box, Button, ButtonGroup, Chip, Grid, Stack, Typography } from '@mui/material'
import { GlassSurface } from './GlassSurface'
import { Link } from 'react-router-dom'
import { TaskAlt } from '@mui/icons-material'
import { auth } from '../config/firebaseSetup'
import { useContext } from 'react'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import PeopleIcon from '@mui/icons-material/People'

const AppMenu = () => {
  const context = useContext(AuthContext)
  const firebaseUser = context?.firebaseUser ?? null

  return (
    <GlassSurface
      sx={{
        backgroundColor: 'important.dark',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <Stack direction="row" alignItems="center">
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
        <Grid container justifyContent="flex-end">
          <ButtonGroup variant="outlined" color="secondary" sx={{ p: 1 }}>
            <Button component={Link} to="/" startIcon={<PeopleIcon />}>
              Users
            </Button>
            {firebaseUser ? (
              <Button component={Link} to={`/${firebaseUser?.email}/todos`} startIcon={<TaskAlt />}>
                My Todos
              </Button>
            ) : (
              <Button component={Link} to="/login" startIcon={<LoginIcon />}>
                Login
              </Button>
            )}
            {firebaseUser && (
              <Button component={Link} to="/" onClick={() => auth.signOut()} startIcon={<LogoutIcon />}>
                Logout
              </Button>
            )}
          </ButtonGroup>
        </Grid>
      </Stack>
    </GlassSurface>
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
        backgroundColor: 'important.light',
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
