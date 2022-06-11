const controller = require("../controllers/pacienteNutriController")

const express = require('express')

const router = express.Router()

router.get("/todos", controller.getAll)

router.get("/filtrar/:id", controller.getById)

router.get("/filtrarNome", controller.getByName)

router.post("/cadastrar", controller.createPatient)

router.put("/atualizar/:id", controller.updatePatient)

router.delete("/excluir/:id", controller.deletePatient)


module.exports = router