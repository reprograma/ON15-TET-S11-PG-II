const controller = require("../controllers/clientsControllers")
const express = require("express") 
const router = express.Router()

router.get("/", controller.getAll)
router.get("/list", controller.getSome)
router.get("/order/:orderId", controller.getOrders)
router.post("/add", controller.createNewClient)
router.put("/change/:id", controller.updateClient)
router.delete("/delete/:id", controller.deleteClient)
router.get("/:id", controller.getById)

module.exports = router