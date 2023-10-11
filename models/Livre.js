const mongoose = require("mongoose");

const livreSchema = mongoose.Schema({
  titre: { type: String, required: [true, "Veuillez entrer le titre"] },
  libLivre: {
    type: String,
    required: [true, "Veuillez entrer la description"],
  },
  authorLivre: {
    type: String,
    required: [true, "Veuillez entrer le nom de l'auteur"],
  },
  sommeLivre: {
    type: Number,
    required: [true, "Veuillez entrer la somme du livre"],
  },
  typeLivre: {
    type: String,
    required: [true, "Veuillez entrer le type de livre"],
  },
});

module.exports = mongoose.model("livre", livreSchema);
