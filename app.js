const express = require('express');
const ROUTER = express.Router();
require('dotenv').config();
const APP = express();
const BODYPARSER = require('body-parser');
const cors = require('cors')
const logger = require('morgan')
const VERIFYTOKEN = require('./middleware/verify_token')

const PRODUCTS_ROUTER = require('./routes/products')
const USERS_ROUTER = require('./routes/users')
const LOGIN_ROUTER = require('./routes/login')
const MARKET_ROUTER = require('./routes/market')

const OPTIONS = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "Authorization"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: '*',
    preflightContinue: false
};

const API = "/api"

APP.use(BODYPARSER.urlencoded({ extended: false }));
APP.use(BODYPARSER.json());
APP.use(logger('dev'));


APP.use(cors(OPTIONS));
APP.options("*", cors(OPTIONS));

ROUTER.use('/login', LOGIN_ROUTER);
ROUTER.use('/users', USERS_ROUTER);
ROUTER.use('/products', VERIFYTOKEN, PRODUCTS_ROUTER);
ROUTER.use('/market', MARKET_ROUTER)

APP.use(API, ROUTER);

console.log(`Listening on port ${process.env.PORT_SERVER}`)
module.exports = APP;

