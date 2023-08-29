const ProductModel = require("../model/Product");
const { success, failure } = require("../util/common");

class Product {
    async getAll(req, res) {
        try {
            const products = await ProductModel.getAll();
            return res.status(200).send(success("Successfully received all products", products));
        } catch (error) {
            return res.status(500).send(failure("Internal server error"));
        }
    }

    async getOneById(req, res) {
        try {
            const { id } = req.params;
            console.log(id);
            const products = await ProductModel.getOneById(id);
            return res.status(200).send(success("Successfully received the prodtuct details", products));
        } catch (error) {
            return res.status(500).send(failure("Internal server error"));
        }
    }

    async deletetById(req, res) {
        try {
            const { id } = req.params;
            // console.log(id);
            const products = await ProductModel.deletetById(id);
            return res.status(200).send(success("Successfully deleted the prodtuct"));
        } catch (error) {
            return res.status(500).send(failure("Internal server error"));
        }
    }

    async create(req, res) {
        try {
            // const { id } = req.params;
            //  console.log("id geche?", id);
            //console.log(req.body);
            const newProduct = req.body;
            const products = await ProductModel.add(newProduct);
            return res.status(200).send(success("Successfully added the prodtuct", products));
        } catch (error) {
            return res.status(500).send(failure("Internal server error"));
        }
    }

}

module.exports = new Product();

