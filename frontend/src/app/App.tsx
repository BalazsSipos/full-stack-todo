import { AppFrame } from './common/components/AppFrame'
import { Auth } from './auth/pages/Auth'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { PageNotFound } from './PageNotFound'
import { StrictMode } from 'react'
import { Todos } from './todo/pages/Todos'
import { Users } from './user/pages/Users'
import { useTheme } from './common/theme/use-theme'

export const App = () => {
  const theme = useTheme()
  return (
    <StrictMode>
      <BrowserRouter>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <AppFrame>
            <Routes>
              <Route index element={<Users />} />
              <Route path={`:uid/todos`} element={<Todos />} />
              <Route path="auth" element={<Auth />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </AppFrame>
        </ThemeProvider>
      </BrowserRouter>
    </StrictMode>
  )
}
