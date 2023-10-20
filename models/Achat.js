const mongoose = require("mongoose");

const achatSchema = mongoose.Schema({
  userId: { type: String, required: [true, "Veuillez vous connectez !"] },
  operateur: { type: String, required: [true, "L'Opérateur est requis !"] },
  idArticle: { type: String, required: [true, "Le livre est requis !"] },
  somme: { type: Number, required: [true, "la somme du livre est requis"] },
  dateAchat: { type: String, required: [true, "la date est requis ! "] },
  heureAchat: { type: String, required: [true, "L'heure est requise ! "] },
});

module.exports = mongoose.model("achat", achatSchema);
