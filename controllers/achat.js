const fs = require("fs");

const auth = require("../middleware/auth");
const Achat = require("../models/Achat");
const Livre = require("../models/Livre");

//FONCTION POUR FAIRE UN ACHAT
exports.createAchat = (req, res, next) => {
  const achatObject = req.body;
  delete achatObject._id;
  delete achatObject._userId;
  let today = new Date();

  const achat = new Achat({
    ...achatObject,
    userId: req.auth.userId,
    dateAchat: `${today.getDate()}/${
      today.getMonth() + 1
    }/${today.getFullYear()}`,
    heureAchat: `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`,
  });

  achat
    .save()
    .then(() => {
      res.status(201).json({ message: "Achat éffectué" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//FONCTION POUR RECUPERER TOUS LES ACHATS POUR L'ADMINISTATEUR
exports.getAllAchat = (req, res, next) => {
  Achat.find()
    .then((achat) => res.status(200).json(achat))
    .catch((error) => res.status(400).json({ error }));
};

//FONCTION POUR RECUPÉRER TOUS LES ACHATS DE L'USER CONNECTER
exports.getUserAchat = (req, res, next) => {
  Achat.find({ userId: req.auth.userId })
    .then((achats) => {
      const idsDesLivres = achats.map((achat) => achat.idArticle);

      Livre.find({ _id: { $in: idsDesLivres } })
        .then((livres) => res.status(200).json(livres))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

//FONCTION POUR RECUPERER UN ACHAT
exports.getOneAchat = (req, res, next) => {
  Achat.findOne({ _id: req.params.id })
    .then((achat) => res.status(200).json(achat))
    .catch((error) => res.status(404).json({ error }));
};

//FONCTION POUR SUPPRIMER UN ACHAT
exports.deleteAchat = (req, res, next) => {
  Achat.findOne({ _id: req.params.id })
    .then((achat) => {
      if (achat.userId != req.auth.userId) {
        res.status(401).json({ message: "Vous n'êtes pas autorisé" });
      } else {
        Achat.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Achat supprimé" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
