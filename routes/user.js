const express = require("express");
const upload = require("multer")();

const router = express.Router();
const userCtrl = require("../controllers/user");

//ROUTE POUR S'INCRIRE
router.post("/signup", upload.any(), userCtrl.signup);

//ROUTE POUR SE CONNECTER
router.post("/login", upload.any(), userCtrl.login);

module.exports = router;
