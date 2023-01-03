import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth } from "./auth/pages/Auth";
import { Todos } from "./todo/pages/Todos";
import { Users } from "./user/pages/Users";

export const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route index element={<Todos />} />
          <Route path={`:uid/todos`} element={<Todos />} />
          <Route path="auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};
