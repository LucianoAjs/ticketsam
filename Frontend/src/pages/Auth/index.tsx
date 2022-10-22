import { Outlet } from "react-router-dom";
import Container from "./styles";

export const Auth = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export * from "pages/Auth/AuthGuard";
export * from "pages/Auth/CreateAccount";
export * from "pages/Auth/Login";
