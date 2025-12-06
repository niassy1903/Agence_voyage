import React, { useState, useEffect } from "react";
import { Container, Tabs, Tab, Table, Button, Modal, Form, Row, Col, Badge, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import "../styles/admin.css";

const Administration = () => {
  const [offres, setOffres] = useState([]);
  const [demandes, setDemandes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentOffre, setCurrentOffre] = useState({
    titre: "",
    destination: "",
    dateDepart: "",
    dateRetour: "",
    prix: "",
    places: "",
    categorie: "vol",
    description: "",
    image: "",
    promotion: false,
    reduction: 0,
  });
  const [mode, setMode] = useState("ajout");
  const [activeTab, setActiveTab] = useState("offres");
  const [filterCategorie, setFilterCategorie] = useState("");
  const [filterDestination, setFilterDestination] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("agenceVoyageData");
    if (storedData) {
      const data = JSON.parse(storedData);
      setOffres(data.offres || []);
      setDemandes(data.demandes || []);
    } else {
      const initialData = {
        offres: [
          {
            id: 1,
            titre: "Vol Dakar → Paris",
            description: "Vol direct avec Air Sénégal, repas inclus.",
            destination: "Paris",
            dateDepart: "2025-12-15",
            dateRetour: "2025-12-25",
            categorie: "vol",
            prix: 450,
            image: "/assets/vol_paris.jpg",
            promotion: true,
            reduction: 15,
          },
          {
            id: 2,
            titre: "Vol Dakar → Londres",
            description: "Vol avec escale, option flexible.",
            destination: "Londres",
            dateDepart: "2025-12-20",
            dateRetour: "2026-01-05",
            categorie: "vol",
            prix: 480,
            image: "/assets/vol_londres.jpg",
          },
          // ... autres offres
        ],
        demandes: [],
      };
      setOffres(initialData.offres);
      setDemandes(initialData.demandes);
      localStorage.setItem("agenceVoyageData", JSON.stringify(initialData));
    }
  }, []);

  const handleShowModal = (offre = null) => {
    if (offre) {
      setCurrentOffre(offre);
      setMode("modification");
    } else {
      setCurrentOffre({
        titre: "",
        destination: "",
        dateDepart: "",
        dateRetour: "",
        prix: "",
        places: "",
        categorie: "vol",
        description: "",
        image: "",
        promotion: false,
        reduction: 0,
      });
      setMode("ajout");
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentOffre({
      ...currentOffre,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentOffre({ ...currentOffre, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedOffres;
    if (mode === "ajout") {
      updatedOffres = [...offres, { ...currentOffre, id: Date.now() }];
      Swal.fire({
        icon: "success",
        title: "Offre ajoutée",
        text: `L'offre "${currentOffre.titre}" a été ajoutée avec succès.`,
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      updatedOffres = offres.map((offre) =>
        offre.id === currentOffre.id ? currentOffre : offre
      );
      Swal.fire({
        icon: "success",
        title: "Offre modifiée",
        text: `L'offre "${currentOffre.titre}" a été modifiée avec succès.`,
        timer: 2000,
        showConfirmButton: false,
      });
    }
    setOffres(updatedOffres);
    const storedData = JSON.parse(localStorage.getItem("agenceVoyageData")) || { offres: [], demandes: [] };
    localStorage.setItem("agenceVoyageData", JSON.stringify({ ...storedData, offres: updatedOffres }));
    handleCloseModal();
  };

  const handleDelete = (id) => {
    const offreASupprimer = offres.find((offre) => offre.id === id);
    Swal.fire({
      title: `Supprimer "${offreASupprimer.titre}" ?`,
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedOffres = offres.filter((offre) => offre.id !== id);
        setOffres(updatedOffres);
        const storedData = JSON.parse(localStorage.getItem("agenceVoyageData")) || { offres: [], demandes: [] };
        localStorage.setItem("agenceVoyageData", JSON.stringify({ ...storedData, offres: updatedOffres }));
        Swal.fire({
          icon: "success",
          title: "Supprimée",
          text: `L'offre "${offreASupprimer.titre}" a été supprimée.`,
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleStatutChange = (id, statut) => {
    const updatedDemandes = demandes.map((demande) =>
      demande.id === id ? { ...demande, statut } : demande
    );
    setDemandes(updatedDemandes);
    const storedData = JSON.parse(localStorage.getItem("agenceVoyageData")) || { offres: [], demandes: [] };
    localStorage.setItem("agenceVoyageData", JSON.stringify({ ...storedData, demandes: updatedDemandes }));
  };

  const handleDeleteDemande = (id) => {
    const demandeASupprimer = demandes.find((demande) => demande.id === id);
    Swal.fire({
      title: `Supprimer la demande de ${demandeASupprimer.client} ?`,
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedDemandes = demandes.filter((demande) => demande.id !== id);
        setDemandes(updatedDemandes);
        const storedData = JSON.parse(localStorage.getItem("agenceVoyageData")) || { offres: [], demandes: [] };
        localStorage.setItem("agenceVoyageData", JSON.stringify({ ...storedData, demandes: updatedDemandes }));
        Swal.fire({
          icon: "success",
          title: "Supprimée",
          text: `La demande a été supprimée.`,
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  const filteredOffres = offres.filter((offre) => {
    return (
      (filterCategorie ? offre.categorie === filterCategorie : true) &&
      (filterDestination
        ? offre.destination.toLowerCase().includes(filterDestination.toLowerCase())
        : true)
    );
  });

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Administration</h2>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
      >
        <Tab eventKey="offres" title="Gestion des Offres">
          <Row className="mb-3 align-items-end">
            <Col xs={12} md={4} className="mb-3 mb-md-0">
              <Form.Select
                value={filterCategorie}
                onChange={(e) => setFilterCategorie(e.target.value)}
                className="w-100"
              >
                <option value="">Filtrer par type</option>
                <option value="vol">Vol</option>
                <option value="hotel">Hôtel</option>
                <option value="sejour">Séjour</option>
              </Form.Select>
            </Col>
            <Col xs={12} md={4} className="mb-3 mb-md-0">
              <Form.Control
                type="text"
                placeholder="Filtrer par destination"
                value={filterDestination}
                onChange={(e) => setFilterDestination(e.target.value)}
                className="w-100"
              />
            </Col>
            <Col xs={12} md={4} className="text-md-end mb-3 mb-md-0">
              <Button variant="primary" onClick={() => handleShowModal()} className="w-100">
                <i className="bi bi-plus-circle me-2"></i> Ajouter une offre
              </Button>
            </Col>
          </Row>

          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Destination</th>
                  <th>Type</th>
                  <th>Prix</th>
                  <th>Promo</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOffres.length > 0 ? (
                  filteredOffres.map((offre) => (
                    <tr key={offre.id}>
                      <td>{offre.titre}</td>
                      <td>{offre.destination}</td>
                      <td>{offre.categorie}</td>
                      <td>{offre.prix} 000 FCFA</td>
                      <td>
                        {offre.promotion ? (
                          <Badge bg="danger">-{offre.reduction}%</Badge>
                        ) : (
                          <Badge bg="secondary">Non</Badge>
                        )}
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <Button
                            variant="outline-warning"
                            size="sm"
                            onClick={() => handleShowModal(offre)}
                            title="Modifier"
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(offre.id)}
                            title="Supprimer"
                          >
                            <FaTrash />
                          </Button>
                          <Button
                            variant="outline-info"
                            size="sm"
                            onClick={() =>
                              Swal.fire({
                                title: offre.titre,
                                html: `
                                  <div class="text-start">
                                    <p><b>Destination:</b> ${offre.destination}</p>
                                    <p><b>Type:</b> ${offre.categorie}</p>
                                    <p><b>Prix:</b> ${offre.prix} 000 FCFA</p>
                                    ${
                                      offre.promotion
                                        ? `<p><b>Promo:</b> -${offre.reduction}%</p>`
                                        : ""
                                    }
                                    <p><b>Description:</b> ${offre.description}</p>
                                    ${
                                      offre.image
                                        ? `<img src="${offre.image}" class="img-fluid mt-2" style="max-height:200px;object-fit:cover;" />`
                                        : ""
                                    }
                                  </div>
                                `,
                                width: "90%",
                              })
                            }
                            title="Voir détails"
                          >
                            <FaEye />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      <Alert variant="info" className="mb-0">
                        Aucune offre trouvée.
                      </Alert>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Tab>

        <Tab eventKey="demandes" title="Demandes Entrantes">
            <div className="table-responsive">
                <Table striped bordered hover className="align-middle">
                <thead className="table-dark">
                    <tr>
                    <th>Client</th>
                    <th>Téléphone</th>
                    <th>Destination</th>
                    <th>Dates</th>
                    <th>Voyageurs</th>
                    <th>Budget</th>
                    <th>Catégorie</th>
                    <th className="text-center">Statut</th>
                    <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {demandes.length > 0 ? (
                    demandes.map((demande) => (
                        <tr key={demande.id}>
                        <td>{demande.client || "Client anonyme"}</td>
                        <td>{demande.telephone || "Non fourni"}</td>
                        <td>{demande.destination}</td>
                        <td>
                            {new Date(demande.dateDepart).toLocaleDateString('fr-FR')} → {new Date(demande.dateRetour).toLocaleDateString('fr-FR')}
                        </td>
                        <td>{demande.voyageurs}</td>
                        <td>{demande.budget ? demande.budget.toLocaleString() : "Non spécifié"} FCFA</td>
                        <td>{demande.categorie}</td>
                        <td className="text-center">
                            <Badge
                            bg={
                                demande.statut === "en attente" ? "secondary" :
                                demande.statut === "en cours" ? "warning" :
                                demande.statut === "terminé" ? "success" :
                                "danger"
                            }
                            className="text-dark px-2 py-1"
                            >
                            {demande.statut.charAt(0).toUpperCase() + demande.statut.slice(1)}
                            </Badge>
                        </td>
                        <td className="text-center">
                            <div className="d-flex justify-content-center gap-2">
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDeleteDemande(demande.id)}
                                title="Supprimer"
                            >
                                <FaTrash />
                            </Button>
                            </div>
                        </td>
                        </tr>
                    ))
                    ) : (
                    <tr>
                        <td colSpan="9" className="text-center">
                        <Alert variant="info" className="mb-0">
                            Aucune demande en attente.
                        </Alert>
                        </td>
                    </tr>
                    )}
                </tbody>
                </Table>
            </div>
            </Tab>

      </Tabs>

      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {mode === "ajout" ? (
              <>
                <i className="bi bi-plus-circle me-2"></i>
                Ajouter une offre
              </>
            ) : (
              <>
                <i className="bi bi-pencil-square me-2"></i>
                Modifier une offre
              </>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Titre</Form.Label>
                  <Form.Control
                    type="text"
                    name="titre"
                    value={currentOffre.titre}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Destination</Form.Label>
                  <Form.Control
                    type="text"
                    name="destination"
                    value={currentOffre.destination}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Date de départ</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateDepart"
                    value={currentOffre.dateDepart}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split("T")[0]}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Date de retour</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateRetour"
                    value={currentOffre.dateRetour}
                    onChange={handleChange}
                    required
                    min={currentOffre.dateDepart || new Date().toISOString().split("T")[0]}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Prix (en milliers de FCFA)</Form.Label>
                  <Form.Control
                    type="number"
                    name="prix"
                    value={currentOffre.prix}
                    onChange={handleChange}
                    required
                    min="0"
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Places disponibles</Form.Label>
                  <Form.Control
                    type="number"
                    name="places"
                    value={currentOffre.places}
                    onChange={handleChange}
                    required
                    min="1"
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Catégorie</Form.Label>
                  <Form.Select
                    name="categorie"
                    value={currentOffre.categorie}
                    onChange={handleChange}
                    required
                  >
                    <option value="vol">Vol</option>
                    <option value="hotel">Hôtel</option>
                    <option value="sejour">Séjour</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={currentOffre.description}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Check
                    type="switch"
                    id="promotion-switch"
                    name="promotion"
                    label="Offre en promotion"
                    checked={currentOffre.promotion}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              {currentOffre.promotion && (
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label>Réduction (%)</Form.Label>
                    <Form.Control
                      type="number"
                      name="reduction"
                      value={currentOffre.reduction}
                      onChange={handleChange}
                      min="0"
                      max="100"
                    />
                  </Form.Group>
                </Col>
              )}
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Image (upload)</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  {currentOffre.image && (
                    <div className="mt-2">
                      <img
                        src={currentOffre.image}
                        alt="preview"
                        className="img-fluid"
                        style={{ maxHeight: "200px", objectFit: "cover" }}
                      />
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col xs={12} className="d-flex justify-content-end mt-3">
                <Button variant="primary" type="submit" className="px-4">
                  {mode === "ajout" ? "Ajouter" : "Modifier"}
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Administration;
