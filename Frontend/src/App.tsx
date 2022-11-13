import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "shared/components/Footer";
import Header from "shared/components/Header";
import { HOME } from "shared/constants/routes";
import { getLastFragmentPath } from "shared/utils/common/get-last-fragment-path";
import Container from "styles/app-styles";

function App() {
  const { pathname } = useLocation();

  const showHeaderAndFooter = ["", `${HOME}`].includes(
    getLastFragmentPath(pathname)
  );

  return (
    <Container>
      <Header />
      <Outlet />
      {showHeaderAndFooter && <Footer />}
    </Container>
  );
}

export default App;
