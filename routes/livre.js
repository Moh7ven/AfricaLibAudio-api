const express = require("express");
// const upload = require("multer")();  upload.any()

const router = express.Router();
const livreCtrl = require("../controllers/livre");
const auth = require("../controllers/auth");
const multer = require("../middleware/multer-config");

//ROUTE POUR AJOUTER UN LIVRE
router.post("/createlivre", auth, multer, livreCtrl.createLivre);

//ROUTE POUR RECUPÉRER TOUS LES LIVRES
router.get("/", livreCtrl.getAllLivre);

//ROUTE POUR RECUPÉRER UN LIVRE PAR SON ID
router.get("/:id", livreCtrl.getOneLivre);

//ROUTE FAIRE LA MISE À JOUR D'UN LIVRE
router.put("/:id", auth, multer, livreCtrl.updateLivre);

//ROUTE POUR SUPPRIMER UN LIVRE
router.delete("/:id", auth, livreCtrl.deleteLivre);

module.exports = router;
