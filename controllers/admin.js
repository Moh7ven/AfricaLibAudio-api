const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

//FONCTION POUR ENREGISTRER UN ADMIN
exports.signUpAdmin = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const admin = new Admin({
        Username: req.body.Username,
        password: hash,
      });
      admin
        .save()
        .then(() =>
          res.status(400).json({
            message: `Utilisateur ${req.body.Username} à été bien enregistré`,
          })
        )
        .catch((error) => res.status(400).json(error));
    })
    .catch((error) => res.status(500).json({ error }));
};

//FONCTION POUR SE CONNNECTER
exports.loginAdmin = (req, res, next) => {
  console.log(req.body.Username);
  Admin.findOne({ Username: req.body.Username })
    .then((admin) => {
      if (!admin) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, admin.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            adminId: admin._id,
            token: jwt.sign({ adminId: admin._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
