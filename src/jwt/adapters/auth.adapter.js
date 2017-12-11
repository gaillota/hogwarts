const jwt = require('jsonwebtoken')

module.exports = (secret, manager) => {
    const loginWithPassword = () => ({
        generateToken(user) {
            const payload = {
                sub: manager.getId(user)
            }
            const options = {
                expiresIn: '24h'
            }
            
            return jwt.sign(payload, secret, options)
        },
    })
    
    return {
        loginWithPassword,
    }
}
