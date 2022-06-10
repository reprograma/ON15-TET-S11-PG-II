//chamar o express para acessar o método Router
const express = require("express")
//chamar o controller 
const controller = require("../controller/pacienteController")
//criar uma variavel para routes
const routes = express.Router()

//criar as rotas
routes.get("/todos", controller.todosPacientes)

routes.get("/filtrar/:id", controller.buscarPorId)

routes.get("/filtrarNome", controller.buscarPorNome)
//exportar o routes 
module.exports = routes