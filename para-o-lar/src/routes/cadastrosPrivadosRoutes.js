const controller = require("../controllers/cadastrosPrivadosController.js");

 
const express = require("express");

const router = express.Router();

router.get("/allRegisters", controller.findAllPrivateRegisters);
router.get("/byId/:id", controller.findPrivateRegistersById);
router.get("/registersByName", controller.findByName);
router.get("/classPrice", controller.getClassPriceList);
router.get("/CPFList", controller.getCPFList);

router.post("/newRegister", controller.createNewRegister);
router.put("/updateAll/:id", controller.updateAll);
router.delete("/delete/:id", controller.deleteById);
router.patch("/updateAnyItem/:id",controller.updateAnyItem);

module.exports = router