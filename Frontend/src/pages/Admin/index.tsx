import { Outlet } from "react-router-dom";
import Container from "./styles";

export const Admin = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export * from "pages/Admin/BoatManager";
export * from "pages/Admin/Profile";
export * from "pages/Admin/TicketManager";
