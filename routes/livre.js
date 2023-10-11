const express = require("express");
const upload = require("multer")();

const router = express.Router();
const livreCtrl = require("../controllers/livre");

//ROUTE POUR AJOUTER UN LIVRE
router.post("/createlivre", upload.any(), livreCtrl.createLivre);

//ROUTE POUR RECUPÉRER TOUS LES LIVRES
router.get("/", livreCtrl.getAllLivre);

//ROUTE POUR RECUPÉRER UN LIVRE PAR SON ID
router.get("/:id", livreCtrl.getOneLivre);

//ROUTE FAIRE LA MISE À JOUR D'UN LIVRE
router.put("/:id", upload.any(), livreCtrl.updateLivre);

//ROUTE POUR SUPPRIMER UN LIVRE
router.delete("/:id", livreCtrl.deleteLivre);

module.exports = router;
