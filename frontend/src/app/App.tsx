import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth } from "./auth/pages/Auth";
import { PageNotFound } from "./PageNotFound";
import { Todos } from "./todo/pages/Todos";
import { Users } from "./user/pages/Users";

export const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route index element={<Users />} />
          <Route path={`:uid/todos`} element={<Todos />} />
          <Route path="auth" element={<Auth />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};
