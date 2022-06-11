const controller = require("../controllers/drinksController.js");

const express = require("express");

const router = express.Router();

router.post("/new", controller.createNewDrink);
router.put("/updateDrink/:id", controller.updateDrink);
router.patch("/updateDrinkValue/:id", controller.updateDrinkValue);
router.patch("/addDrinkIngredient/:id", controller.addDrinkIngredient);
router.get("/search", controller.searchDrink);
router.get("/", controller.getAllDrinks);
router.delete("/remove/:id", controller.removeDrinkById);

module.exports = router