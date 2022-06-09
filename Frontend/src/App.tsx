import { Outlet } from "react-router-dom";
import Header from "shared/components/Header";
import Login from "shared/components/Login";
import Container from "styles/app-styles";

function App() {
  return (
    <Container>
      <Header />
      <Login />
      <Outlet />
    </Container>
  );
}

export default App;
