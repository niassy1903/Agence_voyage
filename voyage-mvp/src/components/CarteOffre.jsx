import React, { useState } from "react";
import { Card, Button, Badge, Modal, Form, Toast, ToastContainer } from "react-bootstrap";

const CarteOffre = ({ offre, onClickWhatsApp, onClickDetails, isPromo = false }) => {
  const [showModal, setShowModal] = useState(false);
  const [contactData, setContactData] = useState({ name: "", phone: "", email: "" });
  const [toast, setToast] = useState({ show: false, message: "", success: true });

  const prixPromo = offre.promotion
    ? (offre.prix * (1 - offre.reduction / 100)).toFixed(0)
    : offre.prix;

  const handleOpenModal = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!contactData.name || !contactData.phone) {
      setToast({ show: true, message: "Veuillez remplir les champs obligatoires !", success: false });
      return;
    }

    try {
      const storedData = JSON.parse(localStorage.getItem("agenceVoyageData")) || { offres: [], demandes: [] };
      const nouvelleDemande = {
        id: Date.now(),
        client: contactData.name,
        telephone: contactData.phone,
        email: contactData.email,
        destination: offre.destination,
        dateDepart: offre.dateDepart,
        dateRetour: offre.dateRetour,
        voyageurs: 1,
        budget: offre.prix * 1000,
        categorie: offre.categorie,
        statut: "en attente",
        dateDemande: new Date().toISOString().split("T")[0],
        offreId: offre.id,
        offreTitre: offre.titre
      };
      const updatedData = { ...storedData, demandes: [...storedData.demandes, nouvelleDemande] };
      localStorage.setItem("agenceVoyageData", JSON.stringify(updatedData));

      setShowModal(false);
      setToast({ show: true, message: "Demande envoyée ! Nous vous contacterons bientôt.", success: true });
      setContactData({ name: "", phone: "", email: "" });
    } catch (error) {
      setToast({ show: true, message: "Erreur lors de l'enregistrement. Veuillez réessayer.", success: false });
    }
  };

  return (
    <>
      <Card className={`h-100 shadow-sm border-0 overflow-hidden ${isPromo ? "border border-danger" : ""}`}>
        <div className="position-relative">
          <Card.Img
            variant="top"
            src={offre.image}
            className="img-fluid"
            style={{ height: "200px", objectFit: "cover" }}
          />
          {offre.promotion && (
            <Badge bg="danger" className="position-absolute top-0 end-0 m-2 fs-6" style={{ zIndex: 10 }}>
              -{offre.reduction}%
            </Badge>
          )}
          <span className="position-absolute top-0 start-0 bg-warning text-dark px-2 py-1 m-2 rounded fw-bold">
            {offre.categorie === "vol" ? (
              <i className="bi bi-airplane-fill me-1"></i>
            ) : offre.categorie === "hotel" ? (
              <i className="bi bi-building me-1"></i>
            ) : (
              <i className="bi bi-globe me-1"></i>
            )}
            {offre.categorie}
          </span>
        </div>
        <Card.Body className="p-4">
          <Card.Title className="fw-bold text-primary mb-3">{offre.titre}</Card.Title>
          <Card.Text className="text-muted mb-3">{offre.description}</Card.Text>

          <div className="mb-3 d-flex justify-content-between text-muted">
            <small>
              <i className="bi bi-calendar-event me-1"></i>
              Départ: {new Date(offre.dateDepart).toLocaleDateString("fr-FR")}
            </small>
            <small>
              <i className="bi bi-calendar-check me-1"></i>
              Retour: {new Date(offre.dateRetour).toLocaleDateString("fr-FR")}
            </small>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            {offre.promotion ? (
              <div>
                <span className="text-decoration-line-through text-muted me-2">{offre.prix} 000 FCFA</span>
                <span className="fs-5 fw-bold text-danger">{prixPromo} 000 FCFA</span>
              </div>
            ) : (
              <span className="fs-5 fw-bold text-warning">{offre.prix} 000 FCFA</span>
            )}
          </div>

          <div className="d-flex gap-2">
            {onClickDetails && (
              <Button variant="outline-primary" size="sm" onClick={onClickDetails} className="w-100">
                Détails
              </Button>
            )}
            <Button variant="primary" size="sm" onClick={onClickWhatsApp} className="w-100">
              <i className="bi bi-whatsapp me-1"></i> Réserver
            </Button>
            <Button variant="success" size="sm" onClick={handleOpenModal} className="w-100">
              <i className="bi bi-person-fill me-1"></i> Contact
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Modal Contact */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Nous contacter pour cette offre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nom complet</Form.Label>
              <Form.Control type="text" name="name" value={contactData.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Téléphone (WhatsApp)</Form.Label>
              <Form.Control type="tel" name="phone" value={contactData.phone} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email (optionnel)</Form.Label>
              <Form.Control type="email" name="email" value={contactData.email} onChange={handleChange} />
            </Form.Group>
            <Button variant="success" type="submit" className="w-100">
              Envoyer
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg={toast.success ? "success" : "danger"}
          show={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
          delay={4000}
          autohide
        >
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default CarteOffre;
