const express = require("express")
const controller = require("../controllers/desabrigadosController.js")
const router = express.Router()

router.get("/todos", controller.listarTodos)
router.get("/buscar/nome", controller.buscarNome)
router.get("/buscar/bairro", controller.buscarBairro)
router.get("/buscar/:id", controller.buscarId)

router.put("/atualizar/:id", controller.atualizarCadastro)

router.post("/cadastrar", controller.novoCadastro)

router.delete("/deletar/:id", controller.deletarCadastro)

module.exports = router