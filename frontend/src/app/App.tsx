import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { AppFrame } from './common/components/AppFrame'
import { AuthContext } from './common/components/AuthContext'
import { AuthProvider } from './common/components/AuthProvider'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { DateTime } from 'luxon'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { Login } from './pages/Login'
import { PageNotFound } from './PageNotFound'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { StrictMode, useContext } from 'react'
import { Todos } from './todo/pages/Todos'
import { Users } from './user/pages/Users'
import { auth } from './common/config/firebaseSetup'
import { queryClient } from './common/query/query-client'
import { useTheme } from './common/theme/use-theme'

export const App = () => {
  const user = useContext(AuthContext)
  const theme = useTheme()
  return (
    <StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale={DateTime.now().locale}>
                <AppFrame>
                  <Routes>
                    <Route index element={<Users />} />
                    {user ? (
                      <>
                        <Route path={`1/todos`} element={<Todos />} />
                      </>
                    ) : (
                      <Route path="login" element={<Login auth={auth} />} />
                    )}
                    <Route path="*" element={<PageNotFound />} />
                  </Routes>
                </AppFrame>
              </LocalizationProvider>
            </ThemeProvider>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </BrowserRouter>
      </AuthProvider>
    </StrictMode>
  )
}
