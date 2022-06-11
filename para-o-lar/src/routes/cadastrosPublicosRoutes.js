const controller = require("../controllers/cadastrosPublicosController.js");


const express = require("express");

const router = express.Router();

router.get("/allRegisters", controller.findAllPublicRegisters);
router.get("/byId/:id", controller.findPublicRegistersById);
router.get("/registersByName", controller.findByName);
router.get("/registersByAge", controller.organizeByAge);
router.get("/birthdayList", controller.getBirthdayList);
router.get("/classLinkList", controller.getClassLinkList);
router.get("/phoneList", controller.getPhoneList);
router.get("/emailList", controller.getEmailList);
router.get("/adressList", controller.getAdressList);
router.get("/startingDateList", controller.getStartingDatelList);
router.get("/dayAndHourList", controller.getDateAndHourList);


module.exports = router