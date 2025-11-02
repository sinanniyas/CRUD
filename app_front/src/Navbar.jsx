import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function Navbarr() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary p-4">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Users</Nav.Link>
            <Nav.Link as={Link} to="/books">Books</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarr;