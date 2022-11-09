import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { AUTH, HOME } from "shared/constants/routes";
import useAuth from "shared/hooks/useAuth";

const Header = () => {
  const { isLoggedin, logout } = useAuth();

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
            <Nav.Link color="" href={HOME}>
              Home
            </Nav.Link>
          </Nav>

          {isLoggedin ? (
            <Button variant="outline-danger" onClick={logout}>
              Logout
            </Button>
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
