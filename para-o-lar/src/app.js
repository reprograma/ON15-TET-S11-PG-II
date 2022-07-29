const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const cadastrosPrivadosRoutes = require("./routes/cadastrosPrivadosRoutes.js");
const cadastrosPublicosRoutes = require("./routes/cadastrosPublicosRoutes.js");
const historicoRoutes = require("./routes/historicosRoutes.js");

app.use("/registers/private", cadastrosPrivadosRoutes);
app.use("/registers/public", cadastrosPublicosRoutes);
app.use("/records/private", historicoRoutes);

module.exports = app