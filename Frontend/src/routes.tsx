import App from "App";
import Home from "pages/Home";

import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

interface IRedirectTo {
  redirectTo: string;
}

function AuthenticatedRoutes({ redirectTo }: IRedirectTo) {
  const authenticated = true;
  return authenticated ? <Outlet /> : <Navigate to={redirectTo} />;
}

function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route element={<AuthenticatedRoutes redirectTo="/" />}></Route>
          <Route path="*" element={<h1>404 - Not found</h1>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoutes;
