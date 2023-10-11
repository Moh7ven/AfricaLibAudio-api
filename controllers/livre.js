const Livre = require("../models/Livre");

//FONCTION POUR CREER UN LIVRE
exports.createLivre = (req, res, next) => {
  // delete req.body._id;
  console.log("Contenu de req.body :", req.body);

  const livre = new Livre({
    /* titre: req.body.titre,
    libLivre: req.body.libLivre,
    authorLivre: req.body.authorLivre,
    sommeLivre: req.body.sommeLivre,
    typeLivre: req.body.typeLivre, */

    ...req.body,
  });
  livre
    .save()
    .then(() => res.status(201).json({ message: "Livre enregistré" }))
    .catch((error) => res.status(400).json(error));
};

//FONCTION POUR RECUPÉRER TOUS LES LIVRES
exports.getAllLivre = (req, res, next) => {
  Livre.find()
    .then((Livre) => res.status(200).json(Livre))
    .catch((error) => res.status(400).json({ error }));
};

//FONCTION POUR RECUPÉRER UN LIVRE
exports.getOneLivre = (req, res, next) => {
  console.log(req.params.id);
  Livre.findOne({ _id: req.params.id })
    .then((livre) => res.status(200).json(livre))
    .catch((error) => res.status(404).json({ error }));
};

//FONCTION POUR METTRE À JOUR LES LIVRES
exports.updateLivre = (req, res, next) => {
  Livre.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() =>
      res.status(200).json(`le livre '${req.body.titre}' à été  mis à jour`)
    )
    .catch((error) => res.status(400).json({ error }));
};

//FONCTION POUR SUPPRIMER UN LIVRE
exports.deleteLivre = (req, res, next) => {
  Livre.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet Supprimé" }))
    .catch((error) => res.status(400).json({ error }));
};
