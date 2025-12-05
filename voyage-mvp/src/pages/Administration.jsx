import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Form, Modal, Alert } from 'react-bootstrap';
import offresData from '../data/offres.json';

const Administration = () => {
  const [offres, setOffres] = useState(offresData);
  const [showModal, setShowModal] = useState(false);
  const [currentOffre, setCurrentOffre] = useState({
    id: null,
    titre: '',
    destination: '',
    dateDepart: '',
    dateRetour: '',
    prix: '',
    places: '',
    type: 'vol',
    description: '',
    image: '',
  });
  const [mode, setMode] = useState('ajout'); // 'ajout' ou 'modification'

  useEffect(() => {
    // Charger les offres depuis le fichier JSON (simulé ici)
    setOffres(offresData);
  }, []);

  const handleShowModal = (offre = null) => {
    if (offre) {
      setCurrentOffre(offre);
      setMode('modification');
    } else {
      setCurrentOffre({
        id: offres.length + 1,
        titre: '',
        destination: '',
        dateDepart: '',
        dateRetour: '',
        prix: '',
        places: '',
        type: 'vol',
        description: '',
        image: '',
      });
      setMode('ajout');
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentOffre({ ...currentOffre, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'ajout') {
      setOffres([...offres, currentOffre]);
    } else {
      setOffres(offres.map((offre) => (offre.id === currentOffre.id ? currentOffre : offre)));
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setOffres(offres.filter((offre) => offre.id !== id));
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Administration des offres</h2>
      <Button variant="primary" onClick={() => handleShowModal()} className="mb-4">
        Ajouter une offre
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Destination</th>
            <th>Type</th>
            <th>Prix</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {offres.map((offre) => (
            <tr key={offre.id}>
              <td>{offre.id}</td>
              <td>{offre.titre}</td>
              <td>{offre.destination}</td>
              <td>{offre.type}</td>
              <td>{offre.prix} FCFA</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleShowModal(offre)}>
                  Modifier
                </Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(offre.id)}>
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal pour ajouter/modifier une offre */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{mode === 'ajout' ? 'Ajouter' : 'Modifier'} une offre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Titre</Form.Label>
              <Form.Control
                type="text"
                name="titre"
                value={currentOffre.titre}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Destination</Form.Label>
              <Form.Control
                type="text"
                name="destination"
                value={currentOffre.destination}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date de départ</Form.Label>
              <Form.Control
                type="date"
                name="dateDepart"
                value={currentOffre.dateDepart}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date de retour</Form.Label>
              <Form.Control
                type="date"
                name="dateRetour"
                value={currentOffre.dateRetour}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prix (FCFA)</Form.Label>
              <Form.Control
                type="number"
                name="prix"
                value={currentOffre.prix}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Places disponibles</Form.Label>
              <Form.Control
                type="number"
                name="places"
                value={currentOffre.places}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                name="type"
                value={currentOffre.type}
                onChange={handleChange}
              >
                <option value="vol">Vol</option>
                <option value="hotel">Hôtel</option>
                <option value="sejour">Séjour</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={currentOffre.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL de l'image</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={currentOffre.image}
                onChange={handleChange}
                placeholder="https://exemple.com/image.jpg"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {mode === 'ajout' ? 'Ajouter' : 'Modifier'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Administration;
