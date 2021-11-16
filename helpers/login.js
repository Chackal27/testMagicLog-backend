const qp = require('../connect/connect').query
const tx = require('../connect/connect').tx
const joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const CONSTANTS = require('../constanst')


function deleteData({email, password}) {
    delete email
    delete password
}

async function login(data) {
    try {
        const schema = joi.object().keys({
            email: joi.string().required().label('Correo').email(),
            password: joi.string().required().label('Contraseña')
        })
        const VALIDATION = schema.validate(data);

        if (VALIDATION.error) {
            return Promise.reject({ statusCode: 400, isJoi: true, ...VALIDATION , found:false})
        }

        const QUERY = `SELECT * FROM users WHERE email = $1`
        return qp(QUERY, [data.email]).then(user => {
            if (user.length > 0) {
                const USER = user[0]
                return bcrypt.compare(data.password, USER.password).then(async (match) => {
                    if (!match) {
                        return Promise.reject({ statusCode: 400, errorMessage: CONSTANTS.FAILURE_MATCH, found:true });
                    }

                    const jwtData = {
                        userId: USER.id,
                        email: USER.email,
                        roleId: USER.role_id
                    };

                    let token = `Bearer ${jwt.sign(jwtData, process.env.TOKEN_SECRET, { expiresIn: CONSTANTS.TIME_EXP_TOKEN })}`
                    

                    
                    deleteData(data.email, data.password)
                    return { token: token, user: user };
                }).catch(err => {

                    return Promise.reject({ statusCode: 400, errorMessage: CONSTANTS.FAILURE_MATCH,found:true });
                })
            } else {
                return Promise.reject({ statusCode: 400, errorMessage: CONSTANTS.FAILURE_MATCH, found:false });
            }
        })


    } catch (error) {
        console.log(CONSTANTS.ERROR_IN_FUNCTION + "helpers/login/login() ", error)
        return Promise.reject({ statusCode: 500, errorMessage: CONSTANTS.FAILURE_FOUND_USER });
    }

}

module.exports = {
    login: login
}