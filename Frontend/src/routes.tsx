import App from "App";

import {
  Admin,
  Auth,
  AuthGuard,
  BoatManager,
  CreateAccount,
  Feedback,
  Home,
  Login,
  PaymentStatus,
  ProfileManager,
  TicketManager,
} from "pages";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import {
  ADMIN,
  AUTH,
  BOAT_MANAGER,
  CREATE_ACCOUNT,
  FEEDBACK,
  HOME,
  PAYMENT_STATUS,
  PROFILE_MANAGER,
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
          <Route path={FEEDBACK} element={<Feedback />} />
          <Route path={PAYMENT_STATUS} element={<PaymentStatus />} />
          <Route element={<AuthGuard redirectTo={`/${AUTH}`} />}>
            <Route path={ADMIN} element={<Admin />}>
              <Route path={PROFILE_MANAGER} element={<ProfileManager />} />
              <Route path={TICKET_MANAGER} element={<TicketManager />} />
              <Route path={BOAT_MANAGER} element={<BoatManager />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to={HOME} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoutes;
