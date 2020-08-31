
const jwt = require('jsonwebtoken')
const User = require('../model/user')

const auth = async (res, req, next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer','')
        console.log(token)

        // const decoded = jwt.verify(token, 'thisismysecret')
        // const user = await user.findOne({_id: decoded._id, 'tokens.token': token})

        // if(!user){
        //     throw new Error()
        // }

        // req.user = user
        // next()
    }
    catch(e){
        res.send('error')
    }
}

module.exports = auth