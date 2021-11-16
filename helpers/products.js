const qp = require('../connect/connect').query
const tx = require('../connect/connect').tx
const joi = require('joi');
const CONSTANTS = require('../constanst')

async function getProductsAdmin(data){
    try {
        let query = `SELECT P.*, U.email FROM products P INNER JOIN users U on U.id = P.user_id`     
        if(data.user_id != 0){
            query+= ` WHERE P.user_id = ${data.user_id}`
        }else if(data.user_id == 0){
            query+= ` ORDER BY P.user_id DESC`
        } 
        
        return qp(query, []).then(products => {
            return { products: products};
        }).catch(err => {
            console.log(CONSTANTS.ERROR_IN_FUNCTION + "helpers/products/getProductsAdmin() ", err);
            return Promise.reject({ statusCode: 500, errorMessage: CONSTANTS.ERROR_MESSAGE });
        })

    } catch (error) {
        console.log(CONSTANTS.ERROR_IN_FUNCTION + "helpers/products/getProductsAdmin() ", error);
        return Promise.reject({ statusCode: 500, errorMessage: CONSTANTS.ERROR_MESSAGE });
    }
}

async function getProductsSeller(data){
    try {
        const QUERY = `SELECT P.*, U.email FROM products P INNER JOIN users U on U.id = P.user_id WHERE P.user_id = $1`      
        
        return qp(QUERY, [data.user_id]).then(products => {
            return { products: products};
        }).catch(err => {
            console.log(CONSTANTS.ERROR_IN_FUNCTION + "helpers/products/getProductsSeller() ", err);
            return Promise.reject({ statusCode: 500, errorMessage: CONSTANTS.ERROR_MESSAGE });
        })

    } catch (error) {
        console.log(CONSTANTS.ERROR_IN_FUNCTION + "helpers/products/getProductsSeller() ", error);
        return Promise.reject({ statusCode: 500, errorMessage: CONSTANTS.ERROR_MESSAGE });
    }
}

async function createProduct(data){
    try {
        const schema = joi.object().keys({
            nombre: joi.string().required().label('Nombre'),
            sku: joi.string().required().label('SKU'),
            cantidad: joi.number().required().label('Cantidad'),
            precio: joi.number().required().label('Precio'),
            user_id: joi.number().required().label('User ID')
        })
        const VALIDATION = schema.validate(data);

        if (VALIDATION.error) {
            return Promise.reject({ statusCode: 400, isJoi: true, ...VALIDATION })
        }

        const INSERT_PRODUCT = `INSERT INTO products (nombre, sku, cantidad, precio, user_id) 
        VALUES ($1, $2, $3, $4, $5)`
        
        return qp(INSERT_PRODUCT, [data.nombre, data.sku, data.cantidad, data.precio, data.user_id]).then(create => {
            return { message: CONSTANTS.PRODUCT_CREATE };
        }).catch(err => {
            console.log(CONSTANTS.ERROR_IN_FUNCTION + "helpers/users/createProduct() ", error);
            return Promise.reject({ statusCode: 500, errorMessage: CONSTANTS.ERROR_MESSAGE });
        })

    } catch (error) {
        console.log(CONSTANTS.ERROR_IN_FUNCTION + "helpers/users/createProduct() ", error);
        return Promise.reject({ statusCode: 500, errorMessage: CONSTANTS.ERROR_MESSAGE });
    }
}



module.exports = {
    getProductsAdmin: getProductsAdmin,
    getProductsSeller: getProductsSeller,
    createProduct: createProduct
}
