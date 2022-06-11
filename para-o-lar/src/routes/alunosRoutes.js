const express = require("express")
const controller = require("../controllers/alunosControllers")
const routes = express.Router()

routes.get("/todos", controller.todosAlunos)
routes.get("/buscarId/:id", controller.buscarPorId)
routes.get("/buscarNome",controller.buscarPorNome)
routes.post("/cadastrar", controller.cadastrarAluno)
routes.put("/atualizar/:id", controller.alualizarAluno)
routes.delete("/excluir/:id")

module.exports = routes
