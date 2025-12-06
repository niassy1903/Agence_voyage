import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Card, Button, Badge, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { genererMessageWhatsApp } from "../utils/genererMessageWhatsApp";
import Swal from "sweetalert2";
import "../styles/details.css";

const DetailsOffre = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [offre, setOffre] = useState(null);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem("agenceVoyageData");
    if (storedData) {
      const data = JSON.parse(storedData);
      const offreTrouvee = data.offres.find((o) => o.id === parseInt(id));
      setOffre(offreTrouvee);
    } else {
      const offreTrouvee = offresData.find((o) => o.id === parseInt(id));
      setOffre(offreTrouvee);
    }
    setChargement(false);
  }, [id]);

  const handleReserver = useCallback(() => {
    if (!offre) return;
    const message = genererMessageWhatsApp(offre);
    window.open(message, "_blank");
  }, [offre]);

  const handleContact = useCallback(() => {
    if (!offre) return;

    Swal.fire({
      title: 'Nous contacter pour cette offre',
      html: `
        <form id="contactForm" class="swal2-form">
          <div class="mb-3">
            <label for="swal-name" class="form-label">Nom complet</label>
            <input type="text" id="swal-name" class="swal2-input form-control" required>
          </div>
          <div class="mb-3">
            <label for="swal-phone" class="form-label">Téléphone (WhatsApp)</label>
            <input type="tel" id="swal-phone" class="swal2-input form-control" required>
          </div>
          <div class="mb-3">
            <label for="swal-email" class="form-label">Email (optionnel)</label>
            <input type="email" id="swal-email" class="swal2-input form-control">
          </div>
        </form>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Envoyer',
      cancelButtonText: 'Annuler',
      preConfirm: () => {
        const name = document.getElementById('swal-name').value;
        const phone = document.getElementById('swal-phone').value;
        const email = document.getElementById('swal-email').value;

        if (!name || !phone) {
          Swal.showValidationMessage('Veuillez remplir les champs obligatoires');
          return false;
        }

        // Enregistrer la demande avec les coordonnées
        const storedData = JSON.parse(localStorage.getItem("agenceVoyageData")) || { offres: [], demandes: [] };

        const nouvelleDemande = {
          id: Date.now(),
          client: name,
          telephone: phone,
          email: email,
          destination: offre.destination,
          dateDepart: offre.dateDepart,
          dateRetour: offre.dateRetour,
          voyageurs: 1,
          budget: offre.prix * 1000, // Convertir en FCFA
          categorie: offre.categorie,
          statut: "en attente",
          dateDemande: new Date().toISOString().split('T')[0],
          offreId: offre.id,
          offreTitre: offre.titre
        };

        const updatedData = {
          ...storedData,
          demandes: [...storedData.demandes, nouvelleDemande]
        };

        localStorage.setItem("agenceVoyageData", JSON.stringify(updatedData));

        return true;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Demande envoyée!',
          'Nous vous contacterons bientôt pour finaliser votre réservation.',
          'success'
        );
      }
    });
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

              <div className="d-flex gap-2 mt-4">
                <Button
                  variant="success"
                  size="lg"
                  className="w-100"
                  onClick={handleReserver}
                >
                  <i className="bi bi-whatsapp me-2"></i> Réserver via WhatsApp
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-100"
                  onClick={handleContact}
                >
                  <i className="bi bi-person-fill me-2"></i> Nous contacter
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailsOffre;
