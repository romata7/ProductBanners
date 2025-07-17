// src/components/Navbar.jsx
import { Container, Nav, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './MainNavbar.css'

const MainNavbar = () => {
  return (
    <BootstrapNavbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <BootstrapNavbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
          {/* <img
            src="/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
            alt=""
          /> */}
          Control Interno Imprenta
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />

        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={NavLink}
              to="/"
              end
              className={({ isActive }) => isActive ? 'active fw-bold' : ''}
            >
              Inicio
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/registrar"
              className={({ isActive }) => isActive ? 'active fw-bold' : ''}
            >
              Registrar
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/registros"
              className={({ isActive }) => isActive ? 'active fw-bold' : ''}
            >
              Registros
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default MainNavbar;