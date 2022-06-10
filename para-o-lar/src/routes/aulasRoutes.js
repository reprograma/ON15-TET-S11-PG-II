const controller = require("../controllers/aulasController.js");


const express = require("express");

const router = express.Router();

router.get("/registers/public", controller.findAllPublicRegisters);
router.get("/registers/private", controller.findAllPrivateRegisters);
router.get("/registers/:id", controller.findRegistersById);
router.get("/registersByName", controller.findByName);
router.get("/registersByAge", controller.organizeByAge);
router.get("/birthdayList", controller.getBirthdayList);
router.get("/classLinkList", controller.getClassLinkList);
router.get("/phoneList", controller.getPhoneList);
router.get("/emailList", controller.getEmailList);
router.get("/adressList", controller.getAdressList);
router.get("/startingDateList", controller.getStartingDatelList);
router.get("/dayAndHourList", controller.getDateAndHourList);
router.get("/registers/private/classPrice", controller.getClassPriceList);
router.get("/registers/private/CPFList", controller.getCPFList);

router.post("/registers/newRegister", controller.createNewRegister);

router.put("/registers/updateAll/:id", controller.updateAll);

router.delete("/registers/delete/:id", controller.deleteById);

router.patch("/registers/updateAnyItem/:id",controller.updateAnyItem);

module.exports = router