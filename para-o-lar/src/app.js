const express = require("express")
const app = express()
const cors = require("cors")
const routes = require("./routes/alunosRouter")



app.use(cors()),
app.use(express.json())
app.use("/alunos", routes)


module.exports = app 