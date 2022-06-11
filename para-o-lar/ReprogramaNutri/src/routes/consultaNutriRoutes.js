const controller = require("../controllers/consultaNutriController")

const express = require('express')

const router = express.Router()

router.get("/todas", controller.getAll)

router.get("/filtro/:id", controller.getById)

router.post("/cadastrar", controller.createConsultation)

router.put("/atualizar/:id", controller.updateConsultation)

router.delete("/excluir/:id", controller.deleteConsultation)


module.exports = router