const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();

const connectDB = require("./config/db");
const livreRoutes = require("./routes/livre");
const userRoutes = require("./routes/user");

connectDB();
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

// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/livre", livreRoutes);
app.use("/api/auth", userRoutes);
app.use("/assets", express.static(path.join(__dirname, "assets")));
// app.use("/audio", express.static(path.join(__dirname, "audio")));

module.exports = app;
