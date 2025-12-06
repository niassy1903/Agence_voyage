import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const PiedPage = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <h5 className="mb-3">
              <i className="bi bi-airplane-fill me-2"></i> AgenceVoyage
            </h5>
            <p className="mb-0">
              Votre agence de voyage de confiance pour des séjours inoubliables.
            </p>
          </Col>
          <Col md={3} className="text-center">
            <h5 className="mb-3">Liens utiles</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-white text-decoration-none">Accueil</Link>
              </li>
              <li>
                <Link to="/recherche" className="text-white text-decoration-none">Recherche</Link>
              </li>
              <li>
                <Link to="/administration" className="text-white text-decoration-none">Admin</Link>
              </li>
            </ul>
          </Col>
          <Col md={3} className="text-center text-md-end">
            <h5 className="mb-3">Contact</h5>
            <p className="mb-1">
              <i className="bi bi-whatsapp me-2"></i> +221 76 188 54 85
            </p>
            <p className="mb-0">
              <i className="bi bi-envelope me-2"></i> contact@agencevoyage.sn
            </p>
          </Col>
        </Row>
        <Row className="mt-3 pt-3 border-top border-secondary">
          <Col className="text-center">
            <p className="mb-0">&copy; 2025 AgenceVoyage. Tous droits réservés.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default PiedPage;
