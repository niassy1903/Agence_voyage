import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const BarreNavigation = () => {
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary fs-3">
          <i className="bi bi-airplane-fill me-2"></i> AgenceVoyage
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="fw-bold text-dark">
              Accueil
            </Nav.Link>
            <Nav.Link as={Link} to="/recherche" className="fw-bold text-dark">
              Recherche
            </Nav.Link>
            <Nav.Link as={Link} to="/administration" className="fw-bold text-dark">
              Admin
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BarreNavigation;
