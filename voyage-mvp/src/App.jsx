import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/global.css";

// Pages
import Accueil from "./pages/Accueil";
import Recherche from "./pages/Recherche";
import Resultats from "./pages/Resultats";
import DetailsOffre from "./pages/DetailsOffre";
import Administration from "./pages/Administration";

// Composants
import BarreNavigation from "./components/BarreNavigation";
import PiedPage from "./components/PiedPage";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Barre de navigation */}
        <BarreNavigation />

        {/* Contenu principal */}
        <main className="flex-grow-1 py-4">
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/recherche" element={<Recherche />} />
            <Route path="/resultats" element={<Resultats />} />
            <Route path="/offre/:id" element={<DetailsOffre />} />
            <Route path="/administration" element={<Administration />} />
          </Routes>
        </main>

        {/* Pied de page */}
        <PiedPage />
      </div>
    </Router>
  );
}

export default App;
