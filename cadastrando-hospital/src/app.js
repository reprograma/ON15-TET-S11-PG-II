// chamar o express,  porque possibilita um sistema de rotas
// gerencia o http que me possibilita verbos: Get, Put,Post, Patch ,Update
// importar o express
// criar uma constante chamada app, chama a funçao express

const express = require("express")
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())


//Como fazer as rotas funcionar
//importar as rotas criando uma const
const pacientesRotas = require("./routes/pacienteRoutes")
//utilizar o metodo use para acessar a rota
app.use("/pacientes", pacientesRotas)


// exportar o modeulo app
module.exports = app