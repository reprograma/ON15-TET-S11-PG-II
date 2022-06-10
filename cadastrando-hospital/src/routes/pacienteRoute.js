//Chamar o express, pois consigo acessar o método chamado Router (rotas)
const express = require("express")
// Preciso chamar o controller
const controller = require("../controllers/pacienteController")
//Preciso criar uma variável para o routes
const routes = express.Router()
//Criar as rotas
//Uma rota para listar todos os pacientes (GET)
routes.get("/todos", controller.todosPacientes)
//Rota para listar por id (GET)
routes.get("/filtrar/:id", controller.buscarPorId)
//Rota para listar por nome, se tiver nome social trazer pelo nome social (GET)
routes.get("/filtrarNome", controller.buscarPorNome)
//Rota para cadastrar pacientes (POST)
routes.post("/cadastrar", controller.cadastrarPacientes)
// Rota para atualizar o cadastro do paciente (PUT)
routes.put("/atualizar/:id", controller.atualizarPacientes)
// Rota para deletar o cadastro (DELETE)
routes.delete("/excluir/:id", controller.excluirPaciente)
// Exportar o routes
module.exports = routes
