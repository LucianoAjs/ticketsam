import { Button, Container, Nav, Navbar } from "react-bootstrap";
import AccountMenu from "shared/components/AccountMenu";
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
            <Nav.Link href={HOME}>Home</Nav.Link>
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
