import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import CarteOffre from "../components/CarteOffre";
import { genererMessageWhatsApp } from "../utils/genererMessageWhatsApp";
import offresData from "../data/offres.json";
import "../styles/resultats.css";

const Resultats = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [resultats, setResultats] = useState([]);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    const storedOffres = localStorage.getItem("offres");
    const offres = storedOffres ? JSON.parse(storedOffres) : offresData;

    if (state?.recherche) {
      const { destination, dateDepart, dateRetour, voyageurs, categorie, budget } = state.recherche;

      let offresFiltrees = [...offres];

      if (categorie !== "toutes") {
        offresFiltrees = offresFiltrees.filter((offre) => offre.categorie === categorie);
      }

      if (destination) {
        offresFiltrees = offresFiltrees.filter((offre) =>
          offre.destination.toLowerCase().includes(destination.toLowerCase())
        );
      }

      if (dateDepart) {
        offresFiltrees = offresFiltrees.filter((offre) => offre.dateDepart === dateDepart);
      }

      if (dateRetour) {
        offresFiltrees = offresFiltrees.filter((offre) => offre.dateRetour === dateRetour);
      }

      if (budget) {
        offresFiltrees = offresFiltrees.filter((offre) => offre.prix <= parseInt(budget));
      }

      offresFiltrees.sort((a, b) => a.prix - b.prix);
      setResultats(offresFiltrees);
    } else {
      setResultats(offres);
    }
    setChargement(false);
  }, [state]);

  const handleDetails = (id) => {
    navigate(`/offre/${id}`);
  };

  const handleWhatsApp = (offre) => {
    const message = genererMessageWhatsApp(offre);
    const lien = `https://wa.me/221761885485?text=${encodeURIComponent(message)}`;
    window.open(lien, "_blank");
  };

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
                isPromo={offre.promotion}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Resultats;
