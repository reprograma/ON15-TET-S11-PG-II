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
routes.get("/filtrar/:id", controller.buscarPorId)
// uma rota para listar por nome, se tiver nome social, trazer por nome social (GET)
routes.get("/filtrarNome", controller.buscarPorNome)
// uma rota para criar os pacientes (POST)
routes.post("/cadastrar", controller.cadastrarPacientes)
// uma rota para atualizar o cadastro do paciente (PUT)
routes.put("/atualizar/:id", controller.atualizarPacientes)
// uma rota para deletar o cadastro (DELETE)
routes.delete("/excluir/:id", controller.excluirPaciente)
// exportar o routes
module.exports = routes
