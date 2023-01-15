import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { AppFrame } from './common/components/AppFrame'
import { Auth } from './auth/pages/Auth'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { DateTime } from 'luxon'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { PageNotFound } from './PageNotFound'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { StrictMode } from 'react'
import { Todos } from './todo/pages/Todos'
import { Users } from './user/pages/Users'
import { queryClient, useQueryCacheReady } from './common/query/query-client'
import { useTheme } from './common/theme/use-theme'

export const App = () => {
  const theme = useTheme()
  return (
    <StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale={DateTime.now().locale}>
              <AppFrame>
                <Routes>
                  <Route index element={<Users />} />
                  <Route path={`:userId/todos`} element={<Todos />} />
                  <Route path="auth" element={<Auth />} />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </AppFrame>
            </LocalizationProvider>
          </ThemeProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </BrowserRouter>
    </StrictMode>
  )
}
