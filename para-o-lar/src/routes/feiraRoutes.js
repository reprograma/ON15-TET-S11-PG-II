const express = require("express");

const controller = require("../controller/feiraController");

const routes = express.Router();

routes.get("/all", controller.allBusiness);

routes.get("/filter/:id", controller.findById);

routes.get("/name", controller.findByName);

routes.get("/category", controller.findByCategory);

routes.post("/register", controller.registerBusiness);

routes.put("/update/:id", controller.updateBusiness);

routes.delete("/delete/:id", controller.deleteBusiness);

module.exports = routes