const fs = require("fs");
const fsPromise = require("fs").promises;
const path = require("path");
const { success, failure } = require("../util/common");

class Product {
    async getAll() {
        return fsPromise
            .readFile(path.join(__dirname, "..", "data", "products.json"), { encoding: "utf-8" })
            .then((data) => {
                return JSON.parse(data);
            })
            .catch((error) => {
                console.log(error);
                return [];
            });
    }

    async getOneById(id) {
        return fsPromise
            .readFile(path.join(__dirname, "..", "data", "products.json"), { encoding: "utf-8" })
            .then((data) => {
                //console.log(JSON.parse(data));
                const findData = JSON.parse(data).filter((element) => {
                    return element.id === Number(id);
                });
                // console.log(findData)
                if (findData.length) {
                    console.log("findData: ", findData)
                    return { success: true, data: findData };
                } else {
                    return { success: false };
                }
            })
            .catch((e) => {
                return { success: false };

            }
            )
    }

    // async add(product) {
    //     return fsPromise
    //         .readFile(path.join(__dirname, "..", "data", "products.json"), { encoding: "utf-8" })
    //         .then((data) => {
    //             const jsonData = JSON.parse(data);
    //             const newProduct = product;
    //             newProduct.id = jsonData[jsonData.length - 1].id + 1;
    //             jsonData.push(newProduct);
    //             return fsPromise
    //                 .writeFile(path.join(__dirname, "..", "data", "products.json"), JSON.stringify(jsonData))
    //                 .then(() => {
    //                     return { success: true };
    //                 })
    //                 .catch((err) => {
    //                     return { success: false, errors: "Could not add to file" };
    //                 });
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             return { success: false };
    //         });
    // }

    async add(product) {
        return fsPromise
            .readFile(path.join(__dirname, "..", "data", "products.json"), { encoding: "utf-8" })
            .then((data) => {
                const jsonData = JSON.parse(data);
                const newProduct = product;
                newProduct.id = jsonData[jsonData.length - 1].id + 1;
                jsonData.push(newProduct);
                return fsPromise
                    .writeFile(path.join(__dirname, "..", "data", "products.json"), JSON.stringify(jsonData))
                    .then(() => {
                        return { success: true };
                    })
                    .catch((err) => {
                        return { success: false, errors: "Could not add to file" };
                    });
            })
            .catch((error) => {
                console.log(error);
                return { success: false };
            });
    }

    async updateById(id, product) {
        const { title, description, price, rating, stock } = product;
        const errors = {};

        if (title && title === "") {
            errors.title = "Title was not provided";
        }
        if (description && description.length <= 10) {
            errors.description = "Description should be at least 15 characters long";
        }
        if (price && price <= 100) {
            errors.price = "Price should be at least 100";
        }
        if (rating && (rating > 5 || rating < 0)) {
            errors.rating = "Rating should be between 0 and 5";
        }
        if (stock && stock === 0) {
            errors.stock = "Stock should be greater than 0";
        }

        if (Object.keys(errors).length > 0) {
            return { success: false, errors: errors };
        }

        const filePath = path.join(__dirname, "..", "data", "products.json");

        try {
            const data = await fsPromise.readFile(filePath, { encoding: "utf-8" });
            const jsonData = JSON.parse(data);

            const updatedData = jsonData.map((element) => {
                if (element.id === Number(id)) {
                    return { ...element, ...product };
                }
                return element;
            });

            const hasChanges = JSON.stringify(jsonData) !== JSON.stringify(updatedData);

            if (hasChanges) {
                await fsPromise.writeFile(filePath, JSON.stringify(updatedData));
                return { success: true, message: "Successfully updated the product" };
            } else {
                return { success: false, message: "Product not found" };
            }
        } catch (error) {
            console.log(error);
            return { success: false, message: "Internal server error" };
        }
    }

    // async deletetById(id) {
    //     console.log("geche?")
    //     console.log("id geche?", id)
    //     return fsPromise
    //         .readFile(path.join(__dirname, "..", "data", "products.json"), { encoding: "utf-8" })
    //         .then((data) => {
    //             // console.log("data paichi", data)
    //             const findData = JSON.parse(data).filter((element) => element.id !== Number(id));
    //             console.log("find data paiche")
    //             console.log("kichu ekta", findData)
    //             if (findData) {
    //                 return fsPromise
    //                     .writeFile(path.join(__dirname, "..", "data", "products.json"), JSON.stringify(findData))
    //                     .then((data) => {
    //                         return { success: true, data: findData };
    //                     })
    //                     .catch((error) => {
    //                         return { success: false };
    //                     });
    //             } else {
    //                 return { success: false };
    //             }
    //         });
    // }

    async deletetById(id) {
        console.log("geche?");
        console.log("id geche?", id);

        const filePath = path.join(__dirname, "..", "data", "products.json");

        try {
            const data = await fsPromise.readFile(filePath, { encoding: "utf-8" });
            const parsedData = JSON.parse(data);

            const updatedData = parsedData.filter((element) => element.id !== Number(id));

            if (updatedData.length !== parsedData.length) {
                await fsPromise.writeFile(filePath, JSON.stringify(updatedData));

                return { success: true, message: "Successfully deleted the product" };
            } else {
                return { success: false, message: "Product not found" };
            }
        } catch (error) {
            console.log(error);
            return { success: false, message: "Internal server error" };
        }
    }


}

module.exports = new Product();