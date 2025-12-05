import React, { useState, useCallback } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/recherche.css";

const Recherche = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: "",
    dateDepart: "",
    dateRetour: "",
    voyageurs: 1,
    budget: "",
    categorie: "vol",
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      navigate("/resultats", { state: { recherche: formData } });
    },
    [formData, navigate]
  );

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4 fw-bold">Rechercher une offre</h2>
      <Form onSubmit={handleSubmit} className="row g-3 justify-content-center bg-light p-4 rounded shadow-sm">
        <Col md={3}>
          <Form.Control
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="Destination"
            required
          />
        </Col>
        <Col md={2}>
          <Form.Control
            type="date"
            name="dateDepart"
            value={formData.dateDepart}
            onChange={handleChange}
            required
          />
        </Col>
        <Col md={2}>
          <Form.Control
            type="date"
            name="dateRetour"
            value={formData.dateRetour}
            onChange={handleChange}
          />
        </Col>
        <Col md={1}>
          <Form.Control
            type="number"
            name="voyageurs"
            value={formData.voyageurs}
            onChange={handleChange}
            min="1"
            required
          />
        </Col>
        <Col md={2}>
          <Form.Control
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            min="0"
            placeholder="Budget (€)"
          />
        </Col>
        <Col md={2}>
          <Form.Select
            name="categorie"
            value={formData.categorie}
            onChange={handleChange}
          >
            <option value="vol">Vol</option>
            <option value="hotel">Hôtel</option>
            <option value="sejour">Séjour</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Button type="submit" variant="primary" className="w-100">
            Rechercher
          </Button>
        </Col>
      </Form>
    </Container>
  );
};

export default Recherche;
