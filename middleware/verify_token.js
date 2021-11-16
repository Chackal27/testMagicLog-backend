const jwt = require('jsonwebtoken')
const CONSTANTS = require('../constanst')

const verifyToken = (req, res, next) => {
    const TOKEN = req.header('Authorization')
    
    if (!TOKEN) return res.status(401).json({ 
            isJoi:false, 
            error: CONSTANTS.AUTH_USER
        })
    try {
        let split = TOKEN.split(' ')
        const verified = jwt.verify(split[1], process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch (error) {
        res.status(400).json({
            isJoi:false, 
            error: CONSTANTS.TOKEN_INVALID
        })
    }
}

module.exports = verifyToken;
