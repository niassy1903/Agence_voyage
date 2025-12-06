import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import CarteOffre from "../components/CarteOffre";
import { genererMessageWhatsApp } from "../utils/genererMessageWhatsApp";
import offresData from "../data/offres.json";
import "../styles/accueil.css";

export default function Accueil() {
  const [offres, setOffres] = useState([]);
  const [categorie, setCategorie] = useState("toutes");
  const [destinationRecherche, setDestinationRecherche] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [dateDepart, setDateDepart] = useState("");
  const [dateRetour, setDateRetour] = useState("");
  const [resultats, setResultats] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

 useEffect(() => {
  const storedData = localStorage.getItem("agenceVoyageData");
  if (storedData) {
    const data = JSON.parse(storedData);
    setOffres(data.offres || []);
    setResultats(data.offres || []);
  } else {
    const initialData = {
      offres: offresData,
      demandes: []
    };
    setOffres(offresData);
    setResultats(offresData);
    localStorage.setItem("agenceVoyageData", JSON.stringify(initialData));
  }
}, []);


  const appliquerFiltres = useCallback(() => {
    setPage(1);
    let filtres = [...offres];

    if (categorie !== "toutes") {
      filtres = filtres.filter((o) => o.categorie === categorie);
    }

    if (destinationRecherche) {
      filtres = filtres.filter((o) =>
        o.destination.toLowerCase().includes(destinationRecherche.toLowerCase())
      );
    }

    if (budgetMax) {
      filtres = filtres.filter((o) => o.prix <= parseInt(budgetMax));
    }

    if (dateDepart) {
      filtres = filtres.filter((o) => o.dateDepart === dateDepart);
    }

    if (dateRetour) {
      filtres = filtres.filter((o) => o.dateRetour === dateRetour);
    }

    filtres.sort((a, b) => a.prix - b.prix);
    setResultats(filtres);
  }, [offres, categorie, destinationRecherche, budgetMax, dateDepart, dateRetour]);

  useEffect(() => {
    appliquerFiltres();
  }, [appliquerFiltres]);

  const handleCategorie = (cat) => {
    setCategorie(cat);
  };

  const handleRecherche = (e) => {
    e.preventDefault();
    appliquerFiltres();
  };

  const handleWhatsApp = useCallback((offre) => {
  const message = genererMessageWhatsApp(offre);
  const lien = message; // La fonction retourne déjà l'URL complète
  window.open(lien, "_blank");
}, []);


  const handleVoirPlus = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const offresAAfficher = resultats.slice(0, page * itemsPerPage);
  const offresPromo = offres.filter((offre) => offre.promotion);

  return (
    <Container className="text-center py-5">
      <h1 className="display-4 fw-bold mb-3 text-primary">
        Bienvenue chez <span className="text-warning">AgenceVoyage</span>
      </h1>
      <p className="lead mb-5 text-muted">
        Billets d’avion, hôtels, séjours et assistance voyage. Tout en un clic !
      </p>

      {/* Barre de recherche avant les offres spéciales */}
      <Form onSubmit={handleRecherche} className="row g-3 justify-content-center mb-5 bg-light p-4 rounded shadow-sm">
        <Col md={3}>
          <Form.Control
            type="text"
            className="shadow-sm border-primary"
            placeholder="Destination (ex: Dakar, Paris)"
            value={destinationRecherche}
            onChange={(e) => setDestinationRecherche(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Form.Control
            type="date"
            className="shadow-sm border-primary"
            value={dateDepart}
            onChange={(e) => setDateDepart(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />
        </Col>
        <Col md={2}>
          <Form.Control
            type="date"
            className="shadow-sm border-primary"
            value={dateRetour}
            onChange={(e) => setDateRetour(e.target.value)}
            min={dateDepart || new Date().toISOString().split("T")[0]}
          />
        </Col>
        <Col md={2}>
          <Form.Control
            type="number"
            className="shadow-sm border-primary"
            placeholder="Budget max (FCFA)"
            value={budgetMax}
            onChange={(e) => setBudgetMax(e.target.value)}
            min="0"
          />
        </Col>
        <Col md={2}>
          <Button type="submit" variant="primary" className="w-100 shadow-sm fw-bold">
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

      {/* Section Offres Spéciales */}
      {offresPromo.length > 0 && (
        <>
          <h2 className="mb-4 text-start">
            <i className="bi bi-tag-fill me-2 text-danger"></i>
            Nos Offres Spéciales
          </h2>
          <Row className="g-4 mb-5">
            {offresPromo.map((offre) => (
              <Col key={offre.id} md={4} className="d-flex">
                <CarteOffre
                  offre={offre}
                  onClickWhatsApp={() => handleWhatsApp(offre)}
                  isPromo={true}
                />
              </Col>
            ))}
          </Row>
        </>
      )}

      {/* Affichage des offres */}
      <Row className="g-4">
        {offresAAfficher.length > 0 ? (
          offresAAfficher.map((offre) => (
            <Col key={offre.id} md={4} className="d-flex">
              <CarteOffre
                offre={offre}
                onClickWhatsApp={() => handleWhatsApp(offre)}
                isPromo={offre.promotion}
              />
            </Col>
          ))
        ) : (
          <Col xs={12}>
            <Alert variant="warning" className="text-center py-4">
              <i className="bi bi-exclamation-triangle-fill fs-3 mb-3"></i>
              <p className="mb-0">Aucune offre disponible pour cette recherche.</p>
            </Alert>
          </Col>
        )}
      </Row>

      {/* Bouton "Voir plus" */}
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
