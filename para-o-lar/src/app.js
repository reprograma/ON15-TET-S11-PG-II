const express = require("express");
const app = express();
const cors = require('cors');
const { use } = require("./routes/gatosRoutes");

app.use(express.json())
app.use(cors())


const gatosRoutes = require("./routes/gatosRoutes")

app.use("/gatos", gatosRoutes)



module.exports = app
