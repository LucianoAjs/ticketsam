import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { AUTH } from "shared/constants/routes";

const Header = () => {
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
            <Nav.Link href={`/`}>Home</Nav.Link>
          </Nav>

          <Button variant="outline-info" href={`/${AUTH}`}>
            Login
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
