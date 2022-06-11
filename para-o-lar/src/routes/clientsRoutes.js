const controller = require("../controllers/clientsContollers")
const express = require("express") 
const router = express.Router()

router.get("/", controller.getAll)
router.get("/list", controller.getSome)
router.get("/:id", controller.getById)
router.get("/order/:id", controller.getOrders)
router.post("/add", controller.createNewClient)
router.put("/change/:id", controller.updateClient)
router.delete("/delete/:id", controller.deleteClient)

module.exports = router