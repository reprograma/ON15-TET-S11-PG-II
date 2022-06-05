const express = require("express")
const controller = require("../controller/patientController")
const router = express.Router()

router.get("/all", controller.allPatients)
router.get("/search/", controller.searchByName)
router.get("/search/:id", controller.searchById)
router.put("/updatePatiente", controller.updatePatient)
router.post("/registration", controller.newPatient)
router.delete("/deletePatient/:id", controller.deletePatient)

module.exports = router