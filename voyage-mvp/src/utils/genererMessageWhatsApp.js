// Dans genererMessageWhatsApp.js
export const genererMessageWhatsApp = (offre) => {
  // Numéro de l'agence au format international sans +
  const numeroAgence = "221704611894";

  // Message pré-rempli
  const message = `
Bonjour, je souhaite réserver une offre ${offre.categorie} :
- Destination : ${offre.destination}
- Date départ : ${offre.dateDepart}
- Date retour : ${offre.dateRetour}
- Nombre de voyageurs : ${offre.voyageurs || 1}
- Prix : ${offre.prix} 000 FCFA
${offre.description ? `- Description : ${offre.description}` : ''}

Merci de me contacter.
`;

  // Encodage du message pour URL
  const messageEncode = encodeURIComponent(message.trim());

  // URL WhatsApp
  return `https://wa.me/${numeroAgence}?text=${messageEncode}`;
};
