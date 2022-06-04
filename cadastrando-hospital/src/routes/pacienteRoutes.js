// vou chamar o express
// pois eu consigo acessar o metodo chamado Router (rotas)
const express = require("express")
// preciso chamar o controller
const controller = require("../controller/pacienteController")
// preciso criar uma variavel pra o routes
const routes = express.Router()
// preciso criar as rotas
// uma rota para listar todos os pacientes (GET)
routes.get("/todos", controller.todosPacientes)
// uma rota para listar por id (GET)
// uma rota para listar por nome, se tiver nome social, trazer por nome social (GET)
// uma rota para criar os pacientes (POST)
// uma rota para atualizar o cadastro do paciente (PUT)
// uma rota para deletar o cadastro (DELETE)
// exportar o routes
module.exports = routes
