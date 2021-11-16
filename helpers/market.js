const qp = require('../connect/connect').query
const CONSTANTS = require('../constanst')

async function getAllProducts(data){
    try {
        let query = `SELECT P.*, U.* FROM products P INNER JOIN users U on U.id = P.user_id `
        if(data.nombre != '' && data.sku != '' && data.precio1 != '' && data.precio2 != ''){
            query+= `WHERE (LOWER(P.nombre)) ILIKE '%${data.nombre}%' `
            query+= `AND (LOWER(P.sku)) ILIKE '%${data.sku}%' `
            query+= `AND P.precio BETWEEN ${data.precio1} AND ${data.precio2}`
        }else if(data.sku != ''){
            query+= `WHERE (LOWER(P.sku)) ILIKE '%${data.sku}%' `
        }else if(data.precio1 != '' && data.precio2 != ''){
            query+= `WHERE P.precio BETWEEN ${data.precio1} AND ${data.precio2}`
        }else if(data.nombre != ''){
            query+= `WHERE (LOWER(P.nombre)) ILIKE '%${data.nombre}%' `
        }
        
        return qp(query, []).then(products => {
            return { products: products};
        }).catch(err => {
            console.log(CONSTANTS.ERROR_IN_FUNCTION + "helpers/market/getAllProducts() ", err);
            return Promise.reject({ statusCode: 500, errorMessage: CONSTANTS.ERROR_MESSAGE });
        })

    } catch (error) {
        console.log(CONSTANTS.ERROR_IN_FUNCTION + "helpers/market/getAllProducts() ", error);
        return Promise.reject({ statusCode: 500, errorMessage: CONSTANTS.ERROR_MESSAGE });
    }
}

module.exports = {
    getAllProducts: getAllProducts
}
