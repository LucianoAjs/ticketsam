import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import App from "App";
import {
  Admin,
  BoatManager,
  Dashboard,
  ProfileManager,
  TicketManager,
} from "pages/Admin";
import { Auth, AuthGuard, CreateAccount, Login } from "pages/Auth";
import { Home } from "pages/Home";
import { Feedback, Payment, Status } from "pages/Payment";
import {
  ADMIN,
  AUTH,
  BOAT_MANAGER,
  CREATE_ACCOUNT,
  DASHBOARD,
  FEEDBACK,
  HOME,
  PAYMENT,
  PROFILE_MANAGER,
  STATUS,
  TICKET_MANAGER,
} from "shared/constants/routes";

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
          <Route path={PAYMENT} element={<Payment />}>
            <Route path={FEEDBACK} element={<Feedback />} />
            <Route path={STATUS} element={<Status />} />
          </Route>

          <Route element={<AuthGuard redirectTo={`/${AUTH}`} />}>
            <Route path={ADMIN} element={<Admin />}>
              <Route path={PROFILE_MANAGER} element={<ProfileManager />} />
              <Route path={TICKET_MANAGER} element={<TicketManager />} />
              <Route path={BOAT_MANAGER} element={<BoatManager />} />
              <Route path={DASHBOARD} element={<Dashboard />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to={HOME} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoutes;
