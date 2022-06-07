//COMO SUBIR UM SERVIDOR
//preciso do express
//porque ele possui um sistema de rotas
//possibilita tratar exceções
//gerencia o HTTP que me possibilita usar os verbos
//verbos: GET, POST, PUT, PATCH e DELETE
//importar express
const express = require("express")
//criar uma constante chamada app. Ela chama a função express ???
const cors = require("cors")
//configurar API
//body-parser pelo app utilizando o método use e vai chamar o express.json
//importar o cors e colocar dentro de uma variável
const app = express()
//depois configurar acessando o método use pelo app, chamndo cors
app.use(cors())



//COMO FAZER AS ROTAS FUNCIONAREM
// importar as rotas criando uma constante
const pacientesRota = require("./routes/pacientesRoutes")
// preciso utilizar o método use para acessar a rota
app.use("/pacientes", pacientesRota)


//exportar o módulo app
module.exports = app