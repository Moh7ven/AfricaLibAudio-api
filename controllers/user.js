const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

//FONCTION POUR S'INCRIRE
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.passwordUser, 10)
    .then((hash) => {
      const user = new User({
        nomUser: req.body.nomUser,
        prenomUser: req.body.prenomUser,
        emailUser: req.body.emailUser,
        passwordUser: hash,
      });
      user
        .save()
        .then(() =>
          res.status(400).json({
            message: `Utilisateur ${req.body.nomUser} à été bien enregistré`,
          })
        )
        .catch((error) => res.status(400).json(error));
    })
    .catch((error) => res.status(500).json({ error }));
};

//FONCTION POUR SE CONNNECTER
exports.login = (req, res, next) => {
  User.findOne({ emailUser: req.body.emailUser })
    .then((user) => {
      if (user === null) {
        res
          .status(401)
          .json({ message: "Utilisateur existant ou mot de passe incorrect" });
      } else {
        bcrypt
          .compare(req.body.passwordUser, user.passwordUser)
          .then((valid) => {
            if (!valid) {
              res.status(200).json({
                message: "Utilisateur existant ou mot de passe incorrect",
              });
            } else {
              res.status(200).json({
                userId: user._Id,
                token: jwt.sign({ userId: user._Id }, "RANDOM_TOKEN_SECRET", {
                  expiresIn: "24h",
                }),
              });
            }
          })
          .catch();
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
