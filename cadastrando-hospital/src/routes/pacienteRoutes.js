// vou chamar o express novamente
//porque eu consigo acessar o método chamado Router (rotas)
const express = require("express")
// preciso chamar o controler
const controller = require("..//controller/pacienteController")
// preciso criar uma variavel para uma routers (rotas - pq será mais de uma rota)
const routes = express.Router()
// preciso criar as rotas
// uma rota para listar todos os paciente (GET)
routes.get("/todos", controller.todosPacientes)
// uma rota para listar por id (GET)
routes.get("/filtrar/:id, controller.buscarPorId")
// uma rota para listar por nome, se tiver nome social, trazer por nome social (GET)
routes.get("/filtrarNome", controller.buscarPorNome)
// uma rota para criar pacientes (POST)
// uma rota para atualizar o cadsatro do paciente (PUT)
// uma rota para deletar o cadastro (DELETE)
// exportar o routes
module.exports = routes