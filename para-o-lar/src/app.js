//importar o express e o cors
const express = require("express")
const cors = require("cors")

//chamar a função express
const app = express()

app.use(express.json())
app.use(cors())

//importar as rotas com uma const
const alunosRota = require("./routes/alunosRoutes")
const perfisRota = require("./routes/perfisRoutes")

//utilizar o metodo use para acessar a rota
app.use("/alunos", alunosRota)
app.use("/perfisAlunos", perfisRota)

//exportar modulo app 
module.exports = app