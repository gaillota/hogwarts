const passport = require('passport')

const strategies = require('./strategies')

module.exports = ({ config, manager }) => {
    const { secret } = config
    const { jwt: jwtStrategy } = strategies({ secret, manager })
    
    passport.use('jwt', jwtStrategy)
}
