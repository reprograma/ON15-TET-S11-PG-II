const express = require("express")

const controller = require("../controller/atendimentoController")

const routes = express.Router()

//ROTAS
routes.get("/todos", controller.todosAtendimentos)
routes.get("/filtrar/:id", controller.filtrarPorId)
routes.get("/filtrarAltura", controller.filtrarPorAltura)
routes.get("/filtrarPeso", controller.filtrarPorPeso)
routes.get("/filtrarIndiceDeMassaCorporal", controller.filtrarPorIndiceDeMassaCorporal)
routes.get("/filtrarProblemasDeSaude", controller.filtrarPorProblemasDeSaude)
routes.get("/filtrarPrimeiraSemana", controller.filtrarPorExerciciosDaPrimeiraSemana)
routes.get("/filtrarSegundaSemana", controller.filtrarPorExerciciosDaSegundaSemana)
routes.get("/filtrarTerceiraSemana", controller.filtrarPorExerciciosDaTerceiraSemana)
routes.get("/filtrarQuartaSemana", controller.filtrarPorExerciciosDaQuartaSemana)
routes.post("/cadastrar", controller.cadastrarAtendimento)
routes.put("/alterarDados/:id", controller.alterarDadosDoAtendimento)
routes.delete("/excluir/:id", controller.excluir)

module.exports = routes