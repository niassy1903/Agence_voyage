import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import CarteOffre from "../components/CarteOffre";
import { genererMessageWhatsApp } from "../utils/genererMessageWhatsApp";
import offresData from "../data/offres.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/resultats.css";

const Resultats = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [resultats, setResultats] = useState([]);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    if (state?.recherche) {
      const { destination, dateDepart, dateRetour, voyageurs, categorie, budget } = state.recherche;
      const offresFiltrees = offresData.filter((offre) => {
        return (
          (categorie === "toutes" || offre.categorie === categorie) &&
          (destination === "" || offre.destination.toLowerCase().includes(destination.toLowerCase())) &&
          (dateDepart === "" || offre.dateDepart === dateDepart) &&
          (budget === "" || offre.prix <= parseInt(budget))
        );
      });
      setResultats(offresFiltrees);
    } else {
      setResultats(offresData);
    }
    setChargement(false);
  }, [state]);

  const handleDetails = useCallback(
    (id) => navigate(`/offre/${id}`),
    [navigate]
  );

  const handleWhatsApp = useCallback(
    (offre) => {
      const lien = genererMessageWhatsApp(
        offre.destination,
        offre.dateDepart,
        offre.dateRetour,
        1,
        offre.prix,
        offre.categorie
      );
      window.open(lien, "_blank");
    },
    []
  );

  if (chargement) {
    return (
      <Container className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4 fw-bold">Résultats de votre recherche</h2>
      {resultats.length === 0 ? (
        <Alert variant="info" className="text-center fs-5">
          Aucune offre trouvée pour votre recherche.
        </Alert>
      ) : (
        <Row className="g-4">
          {resultats.map((offre) => (
            <Col key={offre.id} md={6} lg={4}>
              <CarteOffre
                offre={offre}
                onClickDetails={() => handleDetails(offre.id)}
                onClickWhatsApp={() => handleWhatsApp(offre)}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Resultats;
