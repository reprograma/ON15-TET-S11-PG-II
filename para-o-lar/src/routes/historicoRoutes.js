const controller = require("../controllers/historicoController.js")

const express = require("express");

const router = express.Router();

router.get("/RecordsByStudentId/private/:id", controller.getAllRecordsByStudentId);
router.get("/RecordsByRecordId/private/:id", controller.getAllRecordsByRecordId);
router.get("/AllRecords/private", controller.getAllRecords);
router.get("/studentsGradeAverage/private/:id", controller.findStudentsGradeAverage);
router.get("/studentsFrequency/private/:id", controller.findStudentsFrequency);


router.post("/newRecord/private", controller.createNewRecord);
router.put("/updateAll/private/:id", controller.updateAll);

router.delete("/deleteRecord/private/:id", controller.deleteById);

router.patch("/updateAnyItem/private/:id", controller.updateAnyItem);

module.exports = router