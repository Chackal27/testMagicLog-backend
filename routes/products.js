const express = require("express");
const ROUTER = express.Router();
const PRODUCTS = require("../helpers/products");

ROUTER.get("/", (req, res, next) => {
    PRODUCTS.getProductsSeller(req.query)
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((error) => {
            if (error.isJoi) {
                res.status(400).json({isJoi:true, error: error.error.details[0].message});
            } else if (error.statusCode) {
                res.status(error.statusCode).json({isJoi:false, error: error.errorMessage });
            } else {
                res.status(500).json({isJoi:false, error: error });
            }
        });
});

ROUTER.get("/admin", (req, res, next) => {
    PRODUCTS.getProductsAdmin(req.query)
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((error) => {
            if (error.isJoi) {
                res.status(400).json({isJoi:true, error: error.error.details[0].message});
            } else if (error.statusCode) {
                res.status(error.statusCode).json({isJoi:false, error: error.errorMessage });
            } else {
                res.status(500).json({isJoi:false, error: error });
            }
        });
});

ROUTER.post("/create", (req, res, next) => {
    PRODUCTS.createProduct(req.body)
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((error) => {
            if (error.isJoi) {
                res.status(400).json({isJoi:true, error: error.error.details[0].message});
            } else if (error.statusCode) {
                res.status(error.statusCode).json({isJoi:false, error: error.errorMessage });
            } else {
                res.status(500).json({isJoi:false, error: error });
            }
        });
});


module.exports = ROUTER;