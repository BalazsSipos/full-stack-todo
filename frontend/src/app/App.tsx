import { CssBaseline, ThemeProvider } from "@mui/material";
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth } from "./auth/pages/Auth";
import { AppFrame } from "./common/components/AppFrame";
import { useTheme } from "./common/theme/use-theme";
import { PageNotFound } from "./PageNotFound";
import { Todos } from "./todo/pages/Todos";
import { Users } from "./user/pages/Users";

export const App = () => {
  const theme = useTheme();
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
  );
};
