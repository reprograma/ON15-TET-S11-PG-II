const express = require('express')
const router = express.Router()
const controller = require('../controller/academiaController')

router.get("/",controller.todosClientes)
router.get("/buscar/:id",controller.clientePorId)
router.get('/buscarpornome/',controller.clientePorNome)
router.post("/cadastrar",controller.cadastrarCliente)
router.put("/atualizar/:id",controller.atualizarCadastro)
router.delete("/excluir/:id",controller.excluirCliente)



module.exports=router