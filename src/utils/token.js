const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../app/config');

const tokenChange = (user) => {
    const token = jwt.sign({
        id:user.dataValues.id,
        name: user.dataValues.username
    },PRIVATE_KEY,{
        expiresIn:60*60*24,
        algorithm: 'RS256'
    })
    return token 
}

module.exports = {
    tokenChange
}