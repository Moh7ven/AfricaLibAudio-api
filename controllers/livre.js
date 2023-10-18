const fs = require("fs");

// const auth = require("../middleware/auth");
const Livre = require("../models/Livre");
const { log } = require("console");

//FONCTION POUR CREER UN LIVRE
exports.createLivre = (req, res, next) => {
  // console.log(req.auth);
  const livreObject = req.body;
  delete livreObject._id;
  delete livreObject._adminId;
  const livre = new Livre({
    ...livreObject,
    userId: req.auth.adminId,
    image: `${req.protocol}://${req.get("host")}/assets/${
      req.files.image[0].filename
    }`,
    audio: `${req.protocol}://${req.get("host")}/assets/${
      req.files.audio[0].filename
    }`,
  });
  // console.log(livre.image);
  livre
    .save()
    .then(() => {
      res.status(201).json({ message: "Livre enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//FONCTION POUR RECUPÉRER TOUS LES LIVRES
exports.getAllLivre = (req, res, next) => {
  Livre.find()
    .then((Livre) => res.status(200).json(Livre))
    .catch((error) => res.status(400).json({ error }));
};

//FONCTION POUR RECUPÉRER UN LIVRE
exports.getOneLivre = (req, res, next) => {
  // console.log(req.params.id);
  Livre.findOne({ _id: req.params.id })
    .then((livre) => res.status(200).json(livre))
    .catch((error) => res.status(404).json({ error }));
};

//FONCTION POUR METTRE À JOUR LES LIVRES
exports.updateLivre = (req, res, next) => {
  const livreObject = req.file
    ? {
        ...JSON.parse(req.body.livre),
        image: `${req.protocol}://${req.get("host")}/assets/${
          req.file.filename
        }`,
        audio: `${req.protocol}://${req.get("host")}/assets/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete livreObject._userId;
  Livre.findOne({ _id: req.params.id })
    .then((livre) => {
      if (livre.userId != req.auth.adminId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        Livre.updateOne(
          { _id: req.params.id },
          { ...livreObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Objet modifié!" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//FONCTION POUR SUPPRIMER UN LIVRE
exports.deleteLivre = (req, res, next) => {
  // console.log(req.params.id);
  Livre.findOne({ _id: req.params.id })
    .then((livre) => {
      if (livre.userId != req.auth.adminId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        const filenameImage = livre.image.split("/assets/")[1];
        const filenameAudio = livre.audio.split("/assets/")[1];
        fs.unlink(/*`assets/${filenameImage}`,  `assets/${filenameAudio}`, */ () => {
          Livre.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Objet supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
