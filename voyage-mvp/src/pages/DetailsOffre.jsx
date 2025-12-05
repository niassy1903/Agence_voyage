import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Card, Button, Badge, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { genererMessageWhatsApp } from "../utils/genererMessageWhatsApp";
import offresData from "../data/offres.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/details.css";

const DetailsOffre = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [offre, setOffre] = useState(null);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    const offreTrouvee = offresData.find((o) => o.id === parseInt(id));
    setOffre(offreTrouvee);
    setChargement(false);
  }, [id]);

  const handleReserver = useCallback(() => {
    if (!offre) return;
    const whatsappURL = genererMessageWhatsApp(
      offre.destination,
      offre.dateDepart,
      offre.dateRetour,
      1,
      offre.prix,
      offre.categorie
    );
    window.open(whatsappURL, "_blank");
  }, [offre]);

  if (chargement) {
    return (
      <Container className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </Container>
    );
  }

  if (!offre) {
    return (
      <Container className="text-center py-5">
        <Alert variant="danger">Offre non trouvée.</Alert>
        <Button variant="primary" onClick={() => navigate("/")}>
          Retour à l'accueil
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={8} className="mx-auto">
          <Card className="shadow-sm">
            <Card.Img
              variant="top"
              src={offre.image || "https://via.placeholder.com/600x400"}
              alt={offre.titre}
              className="img-fluid"
              style={{ height: "400px", objectFit: "cover" }}
            />
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Card.Title className="fw-bold fs-3">{offre.titre}</Card.Title>
                <div>
                  <Badge bg="primary" className="me-2 fs-6">
                    {offre.categorie.charAt(0).toUpperCase() + offre.categorie.slice(1)}
                  </Badge>
                  <Badge bg="success" className="fs-6">
                    {offre.destination}
                  </Badge>
                </div>
              </div>
              <Card.Text className="mb-4">
                <strong>Description :</strong> {offre.description}
              </Card.Text>
              <Card.Text className="mb-3">
                <strong>Date de départ :</strong> {offre.dateDepart}<br />
                <strong>Date de retour :</strong> {offre.dateRetour}<br />
                <strong>Prix :</strong> {offre.prix.toLocaleString()} FCFA<br />
                {offre.places && <><strong>Places disponibles :</strong> {offre.places}</>}
              </Card.Text>
              <Button
                variant="success"
                size="lg"
                className="w-100 mt-3"
                onClick={handleReserver}
              >
                Réserver via WhatsApp
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailsOffre;
