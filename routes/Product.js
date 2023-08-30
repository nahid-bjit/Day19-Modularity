const express = require("express");
const routes = express();
const ProductController = require("../controller/ProductController");
//const createValidation = require("../middleware/validation");
const validator = require("../middleware/validation")


routes.get("/", ProductController.getAll);
routes.get("/:id", ProductController.getOneById);
routes.delete("/delete/:id", ProductController.deletetById);
routes.post("/create", validator.create, ProductController.create);
// routes.post("/create", createValidation, ProductController.create);
routes.patch("/update/:id", ProductController.updateById);

module.exports = routes;