const express = require("express")
const controller = require("../controllers/abrigosController")
const router = express.Router()

router.get("/todos", controller.listarTodosAbrigos)
router.get("/buscar", controller.buscarBairro)
router.get("/buscar/id", controller.buscarId)
router.get("/ocupantes", controller.abrigosOcupantes)

router.put("/atualizar/:id", controller.atualizarAbrigo)

router.post("/cadastrar", controller.novoAbrigo)

router.delete("/deletar/:id", controller.deletarCadastro)

module.exports = router