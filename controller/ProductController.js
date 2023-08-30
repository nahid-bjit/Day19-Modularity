const { validationResult } = require("express-validator");
const ProductModel = require("../model/Product");
const { success, failure } = require("../util/common");
const { insertInLog } = require("../server/logFile")


class Product {
    async getAll(req, res) {
        try {
            const products = await ProductModel.getAll();
            let logFileResult = await insertInLog("FETCH_ONE_PRODUCT");
            return res.status(200).send(success("Successfully received all products", products));
        } catch (error) {
            return res.status(500).send(failure("Internal server error"));
        }
    }

    async getOneById(req, res) {
        try {
            const { id } = req.params;
            console.log(id);
            const result = await ProductModel.getOneById(id);
            console.log("kichu ekta: ", result)

            if (result.success) {
                return res.status(200).send(success("Successfully received the prodtuct details", result.data));
            }
            else {
                return res.status(400).send(failure("No data found"));
            }
        } catch (error) {
            return res.status(500).send(failure("Internal server error"));
        }
    }

    async deletetById(req, res) {
        try {
            //console.log("request body: ", req.body)
            const { id } = req.params;
            //console.log(id);
            const result = await ProductModel.deletetById(id);
            // console.log("findData ki pathaiche?: ", result)
            if (result.success) {
                return res.status(200).send(success("Successfully deleted the prodtuct"));
            }
            else {
                return res.status(400).send(failure("Data not found"));
            }
        } catch (error) {
            return res.status(500).send(failure("Internal server error"));
        }
    }

    // async create(req, res) {
    //     try {
    //         // const { id } = req.params;
    //         //  console.log("id geche?", id);
    //         //console.log(req.body);
    //         const newProduct = req.body;
    //         const products = await ProductModel.add(newProduct);

    //         return res.status(200).send(success("Successfully added the prodtuct", products));
    //     } catch (error) {
    //         return res.status(500).send(failure("Internal server error"));
    //     }
    // }

    async create(req, res) {
        // console.log("request body", req.body)
        try {
            const validation = validationResult(req).array();
            console.log(validation);
            if (validation.length === 0) {
                const product = req.body;
                // console.log("prodcut asche?", product)
                const result = await ProductModel.add(product);
                if (result.success) {
                    return res.status(200).send(success("Successfully added the product", product.data));
                } else {
                    return res.status(200).send(failure("Failed to add the product"));
                }
            } else {
                return res.status(422).send(failure("Invalid inputs provided", validation));
            }
        } catch (error) {
            // console.log("error kita? ", error)
            return res.status(500).send(failure("Internal server error"));

        }
    }

    async updateById(req, res) {
        try {
            const { id } = req.params;
            const updateProduct = req.body;
            const result = await ProductModel.updateById(id, updateProduct);

            if (result.success) {
                return res.status(200).send(success("Successfully updated the product"));
            } else {
                return res.status(400).send(failure(result.message));
            }
        } catch (error) {
            return res.status(500).send(failure("Internal server error"));
        }
    }




}

module.exports = new Product();

