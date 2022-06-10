const express = require("express")

const controller = require("../controller/alunosController")

const routes = express.Router()

//ROTAS
routes.get("/todos", controller.todosAlunosDaAcademia)
routes.get("/filtrar/:id", controller.filtrarPorId)
routes.get("/filtrarNome", controller.filtrarPorNome)
routes.get("/filtrarIdade", controller.filtrarPorIdade)
routes.get("/filtrarEndereco", controller.filtrarPorEndereco)
routes.get("/filtrarTelefone", controller.filtrarPorTelefone)
routes.get("/filtrarIdentidade", controller.filtrarPorIdentidade)
routes.get("/filtrarEmail", controller.filtrarPorEmail)
routes.get("/filtrarPrimeiraConsulta", controller.filtrarPorPrimeiraConsulta)
routes.post("/cadastrar", controller.cadastrarAluno)
routes.put("/alterarDados/:id", controller.alterarDadosDoAluno)
routes.patch("/atualizarNome/:id", controller.atualizarNome)
routes.patch("/atualizarNomeSocial/:id", controller.atualizarNomeSocial)
routes.patch("/atualizarIdade/:id", controller.atualizarIdade)
routes.patch("/atualizarEndereco/:id", controller.atualizarEndereco)
routes.patch("/atualizarTelefone/:id", controller.atualizarTelefone)
routes.patch("/atualizarIdentidade/:id", controller.atualizarIdentidade)
routes.patch("/atualizarEmail/:id", controller.atualizarEmail)
routes.patch("/atualizarPrimeiraConsulta/:id", controller.atualizarPrimeiraConsulta)
routes.delete("/excluir/:id", controller.excluir)

module.exports = routes