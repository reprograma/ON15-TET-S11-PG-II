// -> COMO SUBIR O SERVIDOR 

// importar o express
const express = require("express")
// importar o cors, e colocar dentro de uma variavel
const cors = require("cors")
// criar uma constante chamada app, ela chama a função express, fazendo ele funcionar
const app = express()

// -> configurar API 

// body-parser, pelo app, utilizando o metodo use, e vai chamar o express.json
app.use(express.json())
// depois configurar acessando o metodo use pelo app, chamando o cors
app.use(cors())
// exportar o modulo app
module.exports = app

//-> COMO FAZER AS ROTAS FUNCIONAREM

// importar as rotas, feitas no routes
const alunosRota = require("./routes/alunoRoutes")
// utilizar o metodo use para acessar a rota
app.use("/alunos", alunosRota)


// exportar o modulo app
module.exports = app