const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const authMiddleware = async (req, res, next) => {
    try {
        let token = req.headers['stripe_auth']
        if(token){
            let decToken = jwt.decode(token)
            req.user = await User.findById(decToken.id)
        }
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Something went wrong' })
    }
}

module.exports = authMiddleware