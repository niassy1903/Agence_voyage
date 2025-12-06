import React, { useState, useCallback } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/recherche.css";

const Recherche = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: "",
    dateDepart: "",
    dateRetour: "",
    voyageurs: 1,
    budget: "",
    categorie: "toutes",
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const enregistrerDemande = (formData) => {
    const storedData = JSON.parse(localStorage.getItem("agenceVoyageData")) || { offres: [], demandes: [] };

    const nouvelleDemande = {
      id: Date.now(),
      client: "Client Anonyme",
      telephone: "",
      ...formData,
      statut: "en attente",
      dateDemande: new Date().toISOString().split("T")[0],
    };

    const updatedData = {
      ...storedData,
      demandes: [...storedData.demandes, nouvelleDemande],
    };

    localStorage.setItem("agenceVoyageData", JSON.stringify(updatedData));
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      enregistrerDemande(formData);
      navigate("/resultats", { state: { recherche: formData } });
    },
    [formData, navigate]
  );

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4 fw-bold">Rechercher une offre</h2>
      <Form onSubmit={handleSubmit} className="row g-3 justify-content-center bg-light p-4 rounded shadow-sm">
        <Col xs={12} md={6} lg={3}>
          <Form.Control
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="Destination (ex: Paris)"
            required
          />
        </Col>
        <Col xs={12} md={6} lg={2}>
          <Form.Control
            type="date"
            name="dateDepart"
            value={formData.dateDepart}
            onChange={handleChange}
            required
            min={new Date().toISOString().split("T")[0]}
          />
        </Col>
        <Col xs={12} md={6} lg={2}>
          <Form.Control
            type="date"
            name="dateRetour"
            value={formData.dateRetour}
            onChange={handleChange}
            min={formData.dateDepart || new Date().toISOString().split("T")[0]}
          />
        </Col>
        <Col xs={12} md={6} lg={2}>
          <Form.Control
            type="number"
            name="voyageurs"
            value={formData.voyageurs}
            onChange={handleChange}
            min="1"
            required
          />
        </Col>
        <Col xs={12} md={6} lg={2}>
          <Form.Control
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="Budget max (FCFA)"
            min="0"
          />
        </Col>
        <Col xs={12} md={6} lg={1}>
          <Form.Select
            name="categorie"
            value={formData.categorie}
            onChange={handleChange}
          >
            <option value="toutes">Toutes</option>
            <option value="vol">Vol</option>
            <option value="hotel">Hôtel</option>
            <option value="sejour">Séjour</option>
          </Form.Select>
        </Col>
        <Col xs={12} md={6} lg={2} className="d-grid">
          <Button type="submit" variant="primary" className="w-100">
            <i className="bi bi-search me-2"></i> Rechercher
          </Button>
        </Col>
      </Form>
    </Container>
  );
};

export default Recherche;
