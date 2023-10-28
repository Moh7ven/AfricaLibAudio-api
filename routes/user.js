const express = require("express");
const upload = require("multer")();

const router = express.Router();
const userCtrl = require("../controllers/user");
const authAdmin = require("../middleware/authAdmin");
const authUser = require("../middleware/auth");
const auth = require("../middleware/auth");

//ROUTE POUR S'INCRIRE
router.post("/signup", upload.any(), userCtrl.signup);

//ROUTE POUR SE CONNECTER
router.post("/login", upload.any(), userCtrl.login);

//ROUTE POUR RECUPÉRER LES INFORMATIONS DE L'UTILISATEUR CONNNECTER
router.get("/userinfos", authUser, userCtrl.getUserConnected);

//ROUTE POUR RECUPÉRER TOUS LES UTILSATEURS PAR L'ADMINISTATEUR
router.get("/alluser", authAdmin, userCtrl.getAllUser);

//ROUTE POUR SUPPRIMER UN UTILISATEUR PAR L'ADMINISTRATEUR
router.delete("/:id", authAdmin, userCtrl.deleteUser);

module.exports = router;