const controller = require("../controllers/historicosController.js")

const express = require("express");

const router = express.Router();

router.get("/RecordsByStudentId/:id", controller.getAllRecordsByStudentId);
router.get("/RecordsByRecordId/:id", controller.getAllRecordsByRecordId);
router.get("/AllRecords", controller.getAllRecords);
router.get("/studentsGradeAverage/:id", controller.findStudentsGradeAverage);
router.get("/studentsFrequency/:id", controller.findStudentsFrequency);


router.post("/newRecord", controller.createNewRecord);
router.put("/updateAll/:id", controller.updateAll);
router.delete("/deleteRecord/:id", controller.deleteById);
router.patch("/updateAnyItem/:id", controller.updateAnyItem);

module.exports = router