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
export * from "pages/Admin/Dashboard";
export * from "pages/Admin/ProfileManager";
export * from "pages/Admin/TicketManager";
