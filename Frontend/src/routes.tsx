/* eslint-disable react/jsx-no-comment-textnodes */
import App from "App";
import { Auth, AuthGuard, CreateAccount, Feedback, Home, Login } from "pages";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AUTH, CREATE_ACCOUNT, FEEDBACK, HOME } from "shared/constants/routes";

function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AUTH} element={<Auth />}>
          <Route index element={<Login />} />
          <Route path={CREATE_ACCOUNT} element={<CreateAccount />} />
        </Route>

        <Route path={HOME} element={<App />}>
          <Route index element={<Home />} />
          <Route path={FEEDBACK} element={<Feedback />} />
          <Route element={<AuthGuard redirectTo={`/${AUTH}`} />}>
            // TODO: Add here the admin routes
          </Route>
        </Route>
        <Route path="*" element={<Navigate to={HOME} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoutes;
