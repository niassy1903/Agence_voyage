import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import CarteOffre from "../components/CarteOffre";
import { genererMessageWhatsApp } from "../utils/genererMessageWhatsApp";
import offresData from "../data/offres.json";
import "../styles/accueil.css";

export default function Accueil() {
  const [offres, setOffres] = useState([]);
  const [categorie, setCategorie] = useState("toutes");
  const [resultats, setResultats] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  // Charger les offres
  useEffect(() => {
    setOffres(offresData);
    setResultats(offresData);
  }, []);

  // Filtrer par catégorie
  const handleCategorie = useCallback(
    (cat) => {
      setCategorie(cat);
      setPage(1);
      if (cat === "toutes") {
        setResultats(offres);
      } else {
        setResultats(offres.filter((o) => o.categorie === cat));
      }
    },
    [offres]
  );

  // Lien WhatsApp
  const handleWhatsApp = useCallback((offre) => {
    const message = genererMessageWhatsApp(offre);
    const lien = `https://wa.me/221761885485?text=${encodeURIComponent(
      message
    )}`;
    window.open(lien, "_blank");
  }, []);

  // Pagination
  const handleVoirPlus = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  // Offres à afficher
  const offresAAfficher = resultats.slice(0, page * itemsPerPage);

  // Gestion recherche (placeholder)
  const handleRecherche = (e) => {
    e.preventDefault();
    alert("Fonctionnalité de recherche avancée à implémenter !");
  };

  return (
    <Container className="text-center py-5">
      {/* Section Hero */}
      <h1 className="display-4 fw-bold mb-3 text-primary">
        Bienvenue chez <span className="text-warning">AgenceVoyage</span>
      </h1>
      <p className="lead mb-5 text-muted">
        Billets d’avion, hôtels, séjours et assistance voyage. Tout en un clic !
      </p>

      {/* Barre de recherche */}
      <Form
        onSubmit={handleRecherche}
        className="row g-3 justify-content-center mb-5 bg-light p-4 rounded shadow-sm"
      >
        <Col md={3}>
          <Form.Control
            type="text"
            className="shadow-sm border-primary"
            placeholder="Destination (ex: Dakar, Paris)"
          />
        </Col>
        <Col md={2}>
          <Form.Control
            type="date"
            className="shadow-sm border-primary"
            placeholder="Date de départ"
          />
        </Col>
        <Col md={2}>
          <Form.Control
            type="date"
            className="shadow-sm border-primary"
            placeholder="Date de retour"
          />
        </Col>
        <Col md={2}>
          <Form.Select className="shadow-sm border-primary">
            <option value="vol">Vol</option>
            <option value="hotel">Hôtel</option>
            <option value="sejour">Séjour</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Button
            type="submit"
            variant="primary"
            className="w-100 shadow-sm fw-bold"
          >
            <i className="bi bi-search me-2"></i> Rechercher
          </Button>
        </Col>
      </Form>

      {/* Filtres catégories */}
      <div className="mb-4 d-flex justify-content-center flex-wrap gap-2">
        {["toutes", "vol", "hotel", "sejour"].map((cat) => (
          <Button
            key={cat}
            variant={categorie === cat ? "primary" : "outline-primary"}
            onClick={() => handleCategorie(cat)}
            className="shadow-sm fw-bold"
          >
            <i
              className={`bi me-1 ${
                cat === "toutes"
                  ? "bi-stars"
                  : cat === "vol"
                  ? "bi-airplane"
                  : cat === "hotel"
                  ? "bi-building"
                  : "bi-globe"
              }`}
            ></i>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </Button>
        ))}
      </div>

      {/* Offres */}
      <Row className="g-4">
        {offresAAfficher.length > 0 ? (
          offresAAfficher.map((offre) => (
            <Col key={offre.id} md={4} className="d-flex">
              <CarteOffre
                offre={offre}
                onClickWhatsApp={() => handleWhatsApp(offre)}
              />
            </Col>
          ))
        ) : (
          <Col xs={12}>
            <Alert variant="warning" className="text-center py-4">
              <i className="bi bi-exclamation-triangle-fill fs-3 mb-3"></i>
              <p className="mb-0">Aucune offre disponible pour cette catégorie.</p>
            </Alert>
          </Col>
        )}
      </Row>

      {/* Voir plus */}
      {resultats.length > offresAAfficher.length && (
        <div className="text-center mt-5">
          <Button
            variant="outline-primary"
            onClick={handleVoirPlus}
            className="px-4 py-2 shadow-sm fw-bold"
          >
            <i className="bi bi-arrow-down-circle me-2"></i> Voir plus
          </Button>
        </div>
      )}
    </Container>
  );
}
