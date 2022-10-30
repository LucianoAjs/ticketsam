import App from "App";
import { Auth, AuthGuard, CreateAccount, Home, Login } from "pages";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AUTH, CREATE_ACCOUNT, HOME } from "shared/constants/routes";

function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AUTH} element={<Auth />}>
          <Route index element={<Login />} />
          <Route path={CREATE_ACCOUNT} element={<CreateAccount />} />
        </Route>

        <Route element={<AuthGuard redirectTo={`/${AUTH}`} />}>
          <Route path={HOME} element={<App />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="*" element={<Navigate to={HOME} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoutes;