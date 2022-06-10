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
routes.get("/filtrar/:id", controller.buscarPorId)
// Uma rota para listar por nome, se tiver nome social, trazer por nome social (GET)
routes.get("/filtrarNome", controller.buscarPorNome)
// Uma rota para criar os pacientes (POST)
routes.post("/cadastrar", controller.cadastrarPacientes)
// Uma rota para atualizar o cadastro do paciente (PUT)
routes.put("/atualizar/:id", controller.atualizarPacientes)
// Uma rota para deletar o cadastro (DELETE)
routes.delete("/excluir/:id", controller.excluirPaciente)
// Exportar o routes 
module.exports = routes