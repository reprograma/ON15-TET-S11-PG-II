//vou chamar o express
// para acessar o metodo chamado Router(rotas)
const express = require("express")
// precisa chamar o controller
const controller = require("../controller/pacienteController")
// criar uma variavel para routes
const routes = express.Router()

//criar rotas
routes.get("/todos",controller.todosPacientes)
// uma rota para listar todos os pacientes(GET)
//rota para criar paciente (POST)
//rota para listar por id(GET)
routes.get("/filtrar/:id", controller.buscarPorId)
//rota para listar nome, se tiver nome social, trazer (GET)
routes.get("/filtrarNome", controller.buscarPorNome)
// rota para atualizar o cadastro do paciente (PUT)
//rota para deletar o cadastro(DELETE)

//exportar os routes
module.exports = routes