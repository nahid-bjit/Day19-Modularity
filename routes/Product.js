const express = require("express");
const routes = express();
const ProductController = require("../controller/ProductController");
const createValidation = require("../middleware/validation");

routes.get("/", ProductController.getAll);
routes.get("/:id", ProductController.getOneById);
routes.delete("/delete/:id", ProductController.deletetById);
routes.post("/create", createValidation, ProductController.create);


module.exports = routes;