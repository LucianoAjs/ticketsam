import { Outlet } from "react-router-dom";
import Container from "./styles";

export const Admin = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export * from "pages/Admin/Profile";
