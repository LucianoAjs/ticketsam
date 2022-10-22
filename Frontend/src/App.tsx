import { Outlet } from "react-router-dom";
import Header from "shared/components/Header";
import Container from "styles/app-styles";

function App() {
  return (
    <Container>
      <Header />

      <Outlet />
    </Container>
  );
}

export default App;
