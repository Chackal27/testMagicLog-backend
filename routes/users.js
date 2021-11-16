const express = require("express");
const ROUTER = express.Router();
const USERS = require("../helpers/users");

ROUTER.post("/create", (req, res, next) => {
    USERS.createUser(req.body)
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((error) => {
            if (error.isJoi) {
                res.status(400).json({isJoi:true, error: error.error.details[0].message, exist:error.exist});
            } else if (error.statusCode) {
                res.status(error.statusCode).json({isJoi:false, error: error.errorMessage, exist:error.exist});
            } else {
                res.status(500).json({isJoi:false, error: error, exist:error.exist });
            }
        });
});

ROUTER.get("/", (req, res, next) => {
    USERS.getAllSellers()
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((error) => {
            if (error.isJoi) {
                res.status(400).json({isJoi:true, error: error.error.details[0].message});
            } else if (error.statusCode) {
                res.status(error.statusCode).json({isJoi:false, error: error.errorMessage});
            } else {
                res.status(500).json({isJoi:false, error: error });
            }
        });
});

module.exports = ROUTER;