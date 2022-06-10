const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const aulasRoutes = require("./routes/aulasRoutes.js");
const historicoRoutes = require("./routes/historicoRoutes.js");

app.use("/classes", aulasRoutes);
app.use("/records", historicoRoutes);

module.exports = app