
const mongoose = require("mongoose");
const Product = require("../models/product");

exports.get_all_products = (req, res, next) => {
    Product
    .find()
    .select("name price _id")
    .exec()
    .then(docs => {
        const respose = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    id: doc._id,
                    request : {
                        type: "GET",
                        url: "http://localhost:3000/products/" + doc._id
                    }
                }
            })
        };
        if(docs.length >= 0) {
            res.status(200).json(respose);
        } else {
            res.status(404).json({message: "No entries found"});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
};

exports.get_product = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .select("name price _id")
    .exec()
    .then(doc => {
        if(doc) {
            res.status(200).json({
                data: doc,
                request: {
                    type: "GET",
                    url: "http://localhost/products/" + doc._id
                }
            });
        } else {
            res.status(404).json({message: "No valid entry found for provided ID"});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
};

exports.create_product = (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
    });

    product
    .save()
    .then(result => {
        res.status(201).json({
            message: "Create products successfully",
            data: {
                name: result.name,
                price: result.price,
                id: result._id,
                request: {
                    type: "GET",
                    url: "http://localhost:3000/products/" + result._id
                }
            }
        });
    })
    .catch(err => {
        res.status(422).json({error: err});
    });
};

exports.update_product = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};

    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Product
    .update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Product updated",
            request: {
                type: "GET",
                url: "http://localhost:3000/products/" + id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
};

exports.delete_product = (req, res, next) => {
    const id = req.params.productId;

    Product.remove({ _id: id })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Product deleted",
            request: {
                type: "POST",
                url: "http://localhost:3000/products",
                body: {
                    name: "String", 
                    price: "Number"
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
};