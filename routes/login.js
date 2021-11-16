const express = require("express");
const ROUTER = express.Router();
const LOGIN = require("../helpers/login");

ROUTER.post("/", (req, res, next) => {
    LOGIN.login(req.body)
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((error) => {
            if (error.isJoi) {
                res.status(400).json({isJoi:true, error: error.error.details[0].message, found:error.found});
            } else if (error.statusCode) {
                res.status(error.statusCode).json({isJoi:false, error: error.errorMessage,found:error.found });
            } else {
                res.status(500).json({isJoi:true, error: error,found:error.found });
            }
        });
});

module.exports = ROUTER;