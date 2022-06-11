// -> Aqui criamos as rotas

// chamar o express
const express = require("express")
const app = require("../app")
// chamar o controller
const controller = require("../controller/alunoController")
// criar a variavel para o routes
const routes = express.Router()

// rota para listar nomes dos alunos (GET)
routes.get("/todos", controller.totalAlunos)
// rota para listar por matrícula (GET)
routes.get("/matricula", controller.buscarPorMatricula)
// rota para listar alunos por nome social (GET)
routes.get("/social", controller.buscarPorNomeSocial)
// rota para listar alunos por id (GET)
routes.get("/filtrar/:id", controller.buscarPorId)
// rota para listar alunos por CPF (GET)
routes.get("/cpf", controller.buscarPorCPF)

// rota de novo cadastro dos alunos (POST)
routes.post("/cadastrar", controller.cadastrarAlunos)

// rota para atualizar o cadasro dos alunos (PUT)
routes.put("/atualizar/:id", controller.atualizarAlunos)

// rota para excluir alunos (DELETE)
routes.delete("/excluir/:id", controller.excluirAlunos)


// exportar
module.exports = routes