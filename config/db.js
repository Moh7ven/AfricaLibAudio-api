const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://moh7ven:Mohamed2001@africalibaudio.binoyuh.mongodb.net/?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Connexion à MongoDB reussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée"));
};

module.exports = connectDB;
