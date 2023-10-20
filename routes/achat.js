const express = require("express");

const router = express.Router();
const achatCtrl = require("../controllers/achat");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const multer = require("../middleware/multer-config");
const { model } = require("mongoose");

//ROUTE POUR FAIRE UN ACHAT
router.post("/createachat", auth, multer, achatCtrl.createAchat);

//ROUTE POUR RECUPÉRER TOUTES LES ACHATS POUR L'ADMINISTATEUR
router.get("/", authAdmin, achatCtrl.getAllAchat);

//ROUTE POUR RECUPÉRER TOUTES LES ACHATS POUR L'USER CONNECTER
router.get("/userachat", auth, multer, achatCtrl.getUserAchat);

//ROUTE POUR RECUPÉRER UN ACHAT 
router.get("/:id", auth, achatCtrl.getOneAchat);

//ROUTE POUR SUPPRIMER UN ACHAT
router.delete("/:id", auth, achatCtrl.deleteAchat);

module.exports = router;
