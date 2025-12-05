import React from "react";
import { Card, Button } from "react-bootstrap";

const CarteOffre = ({ offre, onClickWhatsApp }) => {
  return (
    <Card className="h-100 shadow-sm border-0 overflow-hidden">
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={offre.image}
          className="img-fluid"
          style={{ height: "200px", objectFit: "cover" }}
        />
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
        <Card.Title className="fw-bold text-primary">{offre.titre}</Card.Title>
        <Card.Text className="text-muted mb-3">{offre.description}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="text-warning mb-0">{offre.prix}</h4>
          <Button
            variant="outline-primary"
            onClick={onClickWhatsApp}
            className="fw-bold"
          >
            <i className="bi bi-whatsapp me-1"></i> Réserver
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CarteOffre;
