/* eslint-disable react/jsx-no-comment-textnodes */
import App from "App";
import {
  Auth,
  AuthGuard,
  CreateAccount,
  Feedback,
  Home,
  Login,
  ProductDetail,
} from "pages";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  AUTH,
  CREATE_ACCOUNT,
  FEEDBACK,
  HOME,
  PRODUCT_DETAIL,
} from "shared/constants/routes";

function MainRoutes() {
  const product = {
    title: "Iphone 12",
    unit_price: 50,
    quantity: 1,
  };
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
          <Route
            path={PRODUCT_DETAIL}
            element={
              <ProductDetail
                ticketId={"4059d7ce-116b-4bf7-9739-13d08f9e0918"}
                product={product}
              />
            }
          />
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
