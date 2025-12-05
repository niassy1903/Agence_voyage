export const genererMessageWhatsApp = (destination, dateDepart, dateRetour, voyageurs, prix, categorie) => {
  // Numéro de l'agence au format international sans +
  const numeroAgence = "221785843130"; 

  // Message pré-rempli
  const message = `
Bonjour, je souhaite réserver une offre ${categorie} :
- Destination : ${destination}
- Date départ : ${dateDepart}
- Date retour : ${dateRetour}
- Nombre de voyageurs : ${voyageurs}
- Prix : ${prix} FCFA
Merci de me contacter.
`;

  // Encodage du message pour URL
  const messageEncode = encodeURIComponent(message.trim());

  // URL WhatsApp
  return `https://wa.me/${numeroAgence}?text=${messageEncode}`;
};
