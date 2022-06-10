//chamar o express para acessar o método Router
const express = require("express")
//chamar o controller 
const controller = require("../controllers/alunoController")
//criar uma variavel para routes
const routes = express.Router()

//criar as rotas
routes.get("/todos", controller.todosAlunos)

routes.get("/filtrar/:id", controller.buscarPorId)

routes.get("/filtrarNome", controller.buscarPorNome)

routes.post("/cadastrar", controller.cadastrarAlunos)

routes.put("/atualizar/:id", controller.atualizarAlunos) 

routes.delete("/excluir/:id", controller.excluirAluno)

//exportar o routes 
module.exports = routes