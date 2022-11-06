import { Outlet } from "react-router-dom";
import { Footer } from "shared/components/Footer";
import Header from "shared/components/Header";
import Container, { Content } from "styles/app-styles";

function App() {
  return (
    <Container>
      <Header />
      <Content children={<Outlet />} />
      <Footer />
    </Container>
  );
}

export default App;
