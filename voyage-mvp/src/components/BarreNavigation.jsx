import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const BarreNavigation = () => {
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm sticky-top">
      <Container>
        <Navbar.Brand 
          as={Link} 
          to="/" 
          className="fw-bold fs-3 d-flex align-items-center"
        >
          <div
            style={{
              height: "65px",
              width: "65px",
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              boxShadow: "0 0 10px rgba(0,0,0,0.15)"
            }}
          >
            <img 
              src="/agence_voyage.png" 
              alt="Logo Agence Voyage" 
              style={{ height: "85%", width: "85%", objectFit: "contain" }}
            />
          </div>
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
