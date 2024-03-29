import logo from "assets/icons/logo.png";
import AccountMenu from "components/AccountMenu";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { TOKEN } from "shared/constants/common";
import { AUTH, HOME } from "shared/constants/routes";
import { getDataStorage } from "shared/utils";

const Header = () => {
  const isLoggedin = getDataStorage(TOKEN);

  return (
    <Navbar className="bg-header" variant="dark">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href={HOME}>
              <img width={100} src={logo} alt="logo" />
            </Nav.Link>
          </Nav>

          {isLoggedin ? (
            <AccountMenu />
          ) : (
            <Button variant="outline-primary" href={`/${AUTH}`}>
              Login
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
