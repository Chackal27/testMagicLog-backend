const qp = require('../connect/connect').query
const tx = require('../connect/connect').tx
const joi = require('joi');
const bcrypt = require('bcrypt');
const CONSTANTS = require('../constanst')

async function validateUser(email){
    try {
        const QUERY = `SELECT * FROM users WHERE email = $1`
        return qp(QUERY, [email]).then(user => {
            if(user.length > 0){
                return true
            }
            return false
        })
    } catch (error) {
        console.log(CONSTANTS.ERROR_IN_FUNCTION + "helpers/users/validateUser() ", error)
        return Promise.reject({ statusCode: 500, errorMessage: CONSTANTS.ERROR_MESSAGE });
    }
}

async function createUser(data){
    try {
        const schema = joi.object().keys({
            email: joi.string().required().label('Correo').email(),
            password: joi.string().required().label('Contraseña'),
            password_repeat: joi.string().required().label('Repetir Contraseña')
        })
        const VALIDATION = schema.validate(data);

        if (VALIDATION.error) {
            return Promise.reject({ statusCode: 400, isJoi: true, ...VALIDATION, exist:false })
        }

        const EXIST_USER = await validateUser(data.email)

        if(EXIST_USER){
            return Promise.reject({ statusCode: 400, errorMessage: CONSTANTS.USER_IF_EXIST, exist:true });
        }

        const INSERT_USER = `INSERT INTO users (email, password, role_id) 
        VALUES ($1, $2, 2)`
        
        return qp(INSERT_USER, [data.email, await bcrypt.hash(data.password,10)]).then(create => {
            return { message: CONSTANTS.USER_CREATE };
        }).catch(err => {
            console.log(CONSTANTS.ERROR_IN_FUNCTION + "helpers/users/createUser() ", error);
            return Promise.reject({ statusCode: 500, errorMessage: CONSTANTS.ERROR_MESSAGE, exist:false });
        })

    } catch (error) {
        console.log(CONSTANTS.ERROR_IN_FUNCTION + "helpers/users/createUser() ", error);
        return Promise.reject({ statusCode: 500, errorMessage: CONSTANTS.ERROR_MESSAGE, exist:false });
    }
}

async function getAllSellers(){
    try {
        const USERS = `SELECT id, email FROM users WHERE role_id=2`
        
        return qp(USERS, []).then(all => {
            return { users: all };
        }).catch(err => {
            console.log(CONSTANTS.ERROR_IN_FUNCTION + "helpers/users/getAllSellers() ", error);
            return Promise.reject({ statusCode: 500, errorMessage: CONSTANTS.ERROR_MESSAGE });
        })

    } catch (error) {
        console.log(CONSTANTS.ERROR_IN_FUNCTION + "helpers/users/getAllSellers() ", error);
        return Promise.reject({ statusCode: 500, errorMessage: CONSTANTS.ERROR_MESSAGE });
    }
}

module.exports = {
    createUser: createUser,
    getAllSellers: getAllSellers
}

