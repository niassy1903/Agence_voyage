// src/components/ModalContact.jsx
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalContact = ({ show, handleClose, offre, onSubmit }) => {
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      offreId: offre.id,
      offreTitre: offre.titre,
      destination: offre.destination,
      dateDepart: offre.dateDepart,
      dateRetour: offre.dateRetour,
      categorie: offre.categorie,
      prix: offre.prix
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Nous contacter pour cette offre</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nom complet *</Form.Label>
            <Form.Control
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              placeholder="Votre nom complet"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Téléphone (WhatsApp) *</Form.Label>
            <Form.Control
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              required
              placeholder="Votre numéro de téléphone"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Votre adresse email (optionnel)"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Votre message ou questions supplémentaires"
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              <i className="bi bi-send me-2"></i> Envoyer
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalContact;
