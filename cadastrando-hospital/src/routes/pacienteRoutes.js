// Vou chamar o express
// Pois eu consigo acessar o método chamado Router (rotas)
const express = require("express")
// Preciso chamar o controller
const controller = require("../controller/pacienteController")
// Preciso criar uma variável pra o routes
const routes = express.Router()
// Preciso criar as rotas
// Uma rota para listar todos os pacientes (GET)
routes.get("/todos", controller.todosPacientes)
// Uma rota para listar por id (GET)
routes.get
// Uma rota para listar por nome, se tiver nome social, trazer por nome social (GET)
// Uma rota para criar os pacientes (POST)
// Uma rota para atualizar o cadastro do paciente (PUT)
// Uma rota para deletar o cadastro (DELETE)
// Exportar o routes 
module.exports = routes