import 'firebaseui/dist/firebaseui.css';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { AppFrame } from './common/components/AppFrame';
import { AuthContext } from './common/components/AuthContext';
import { AuthProvider } from './common/components/AuthProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CircularProgress, CssBaseline, ThemeProvider } from '@mui/material';
import { DateTime } from 'luxon';
import { Loading } from './pages/Loading';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Login } from './pages/Login';
import { PageNotFound } from './PageNotFound';
import { Provider } from 'react-redux';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { StrictMode, Suspense, useContext } from 'react';
import { Todos } from './pages/Todos';
import { Users } from './pages/Users';
import { auth } from './common/config/firebaseSetup';
import { queryClient } from './common/query/query-client';
import { store } from './store/store';
import { useTheme } from './common/theme/use-theme';

const AppRouter = () => {
  const context = useContext(AuthContext);
  const firebaseUser = context?.firebaseUser ?? null;
  const isLoaded = context?.isLoaded;

  return (
    <Suspense fallback={<CircularProgress />}>
      <Routes>
        <Route index element={<Users />} />
        {firebaseUser ? (
          <>
            <Route path=":email/todos" element={<Todos />} />
          </>
        ) : (
          <>
            {!firebaseUser && isLoaded && <Route path="*" element={<Login auth={auth} />} />}
            {!firebaseUser && !isLoaded && <Route path="*" element={<Loading />} />}
          </>
        )}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export const App = () => {
  console.log('App futott');
  const theme = useTheme();
  return (
    <StrictMode>
      <AuthProvider>
        <Provider store={store}>
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale={DateTime.now().locale}>
                  <AppFrame>
                    <AppRouter />
                  </AppFrame>
                </LocalizationProvider>
              </ThemeProvider>
              <ReactQueryDevtools />
            </QueryClientProvider>
          </BrowserRouter>
        </Provider>
      </AuthProvider>
    </StrictMode>
  );
};
