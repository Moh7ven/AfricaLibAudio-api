const express = require("express");
const upload = require("multer")();

const router = express.Router();
const adminCtrl = require("../controllers/admin");

//ROUTE POUR ENREGISTRER UN ADMIN
router.post("/signupadmin", upload.any(), adminCtrl.signUpAdmin);

//ROUTE POUR SE CONNECTER ADMIN
router.post("/loginadmin", upload.any(), adminCtrl.loginAdmin);

module.exports = router;
