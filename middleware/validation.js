const { failure } = require("../util/common");

const createValidation = (req, res, next) => {
    const { title, description, price, rating, stock } = req.body;
    const errors = {};
    if (!title || title === "") {
        errors.title = "Title was not provided";
    }
    if (!price || price <= 200) {
        errors.price = "Price should be provided, and it should less than 200";
    }
    if (!stock || stock === 0) {
        errors.stock = "Stock should be provided and greater than 0";
    }

    if (Object.keys(errors).length > 0) {
        return res.status(422).send(failure("unprossible entry", errors));
    }
    next();
};

module.exports = createValidation;