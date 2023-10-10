const express = require("express");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/depart", (req, res, next) => {
  const data = [
    {
      id: 1,
      nom: "l'afrique en général",
      prix: 10000,
      nbrComment: 10,
    },
    {
      id: 2,
      nom: "Soukoulou",
      prix: 15000,
      nbrComment: 10,
    },
  ];
  res.status(200).json(data);
  console.log("Reponse reçue");
});

module.exports = app;
